// services/TurnoService.js
import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';
import TurnoModel from '../models/turnoRutinarioModel.js';
import AprendizModel from '../models/apprenticeModel.js';
import UnidadModel from '../models/unitModel.js';
import TurnoEspecialModel from '../models/turnoEspecialModel.js';
import FichaModel from '../models/fichasModel.js';
import ProgramaModel from '../models/programaModel.js';
import AreaModel from '../models/areaModel.js';
import UserModel from '../models/userModel.js';
import { getParametro } from './ParametroService.js';
import { generarReporteExcel } from '../helpers/reporteGenerator.js';

const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve('logs', 'errores.log');
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, logMessage);
};

// ==================== CRUD Operations ====================
export const getAllTurnos = async () => {
  try {
    return await TurnoModel.findAll({
      include: [
        { 
          model: AprendizModel,
          attributes: ['Id_Aprendiz', 'Nom_Aprendiz', 'Ape_Aprendiz'],
          include: [{
            model: UserModel,
            attributes: ['Est_User'],
            where: { Est_User: 'ACTIVO' }
          }]
        },
        { 
          model: UnidadModel,
          attributes: ['Id_Unidad', 'Nom_Unidad'],
          where: { Est_Unidad: 'ACTIVO' }
        },
        {
          model: TurnoEspecialModel,
          attributes: ['Fec_Inicio', 'Fec_Fin', 'Hor_Inicio', 'Hor_Fin'],
          required: false
        }
      ],
      order: [['Fec_Inicio_Turno', 'DESC']]
    });
  } catch (error) {
    logErrorToFile('getAllTurnos', error);
    throw { status: 500, message: `Error al obtener turnos: ${error.message}` };
  }
};

export const getTurnoById = async (id) => {
  try {
    if (!id || isNaN(Number(id))) throw new Error('ID inválido');
    
    const turno = await TurnoModel.findByPk(id, {
      include: [
        {
          model: AprendizModel,
          include: [{
            model: FichaModel,
            include: [{
              model: ProgramaModel,
              include: [AreaModel]
            }]
          }]
        },
        UnidadModel,
        TurnoEspecialModel
      ]
    });

    if (!turno) throw new Error('Turno no encontrado');
    return turno;
  } catch (error) {
    logErrorToFile('getTurnoById', error);
    throw { status: 404, message: `Error al obtener turno: ${error.message}` };
  }
};

export const createTurno = async (data) => {
  let transaction;
  try {
    transaction = await db.transaction();
    
    // Validación base
    //validar que el objeto no vengan vacios
    if (!data || typeof data !== 'object') throw new Error('Datos inválidos');

    // Destructuración de datos
    const { Tip_Turno, Id_Turno_Especial, Id_Aprendiz, Id_Unidad } = data;

    //validar si el aprendiz esta activpo
    // Validar relaciones principales
    const [aprendiz, unidad] = await Promise.all([
      AprendizModel.findByPk(Id_Aprendiz, {
        include: [{ model: UserModel, where: { Est_User: 'ACTIVO' } }],
        transaction
      }),
      UnidadModel.findByPk(Id_Unidad, { 
        where: { Est_Unidad: 'ACTIVO' },
        transaction 
      })
    ]);

    if (!aprendiz) throw new Error('Aprendiz no encontrado o inactivo');
    if (!unidad) throw new Error('Unidad no encontrada o inactiva');

    // Lógica para turnos especiales
    let datosCompletos = { ...data };
    if (Tip_Turno === 'Especial') {
      if (!Id_Turno_Especial) throw new Error('Turno especial requiere Id_Turno_Especial');
      
      const turnoEspecial = await TurnoEspecialModel.findByPk(Id_Turno_Especial, { transaction });
      if (!turnoEspecial) throw new Error('Turno especial no encontrado');

      datosCompletos = {
        ...datosCompletos,
        Fec_Inicio_Turno: turnoEspecial.Fec_Inicio,
        Fec_Fin_Turno: turnoEspecial.Fec_Fin,
        Hor_Inicio_Turno: turnoEspecial.Hor_Inicio,
        Hor_Fin_Turno: turnoEspecial.Hor_Fin
      };
    }

    // Validar conflictos de horario
    const turnosExistentes = await TurnoModel.count({
      where: {
        Id_Aprendiz,
        [Op.or]: [
          {
            Fec_Inicio_Turno: { [Op.lte]: datosCompletos.Fec_Fin_Turno },
            Fec_Fin_Turno: { [Op.gte]: datosCompletos.Fec_Inicio_Turno }
          }
        ]
      },
      transaction
    });

    if (turnosExistentes > 0) {
      throw new Error('El aprendiz ya tiene un turno asignado en este horario');
    }

    const nuevoTurno = await TurnoModel.create(datosCompletos, { transaction });
    await transaction.commit();
    
    return nuevoTurno;
  } catch (error) {
    if (transaction) await transaction.rollback();
    logErrorToFile('createTurno', error);
    throw { status: 400, message: `Error al crear turno: ${error.message}` };
  }
};


export const updateTurno = async (id, data) => {
  let transaction;
  try {
    transaction = await db.transaction();
    
    if (!id || isNaN(Number(id))) throw new Error('ID inválido');
    
    const turno = await TurnoModel.findByPk(id, { transaction });
    if (!turno) throw new Error('Turno no encontrado');

    // Validación cambio tipo de turno
    if (data.Tip_Turno && data.Tip_Turno !== turno.Tip_Turno) {
      if (data.Tip_Turno === 'Especial' && !data.Id_Turno_Especial) {
        throw new Error('Se requiere Id_Turno_Especial para turnos especiales');
      }
    }

    // Actualización segura
    const turnoActualizado = await turno.update(data, { transaction });
    await transaction.commit();
    
    return turnoActualizado;
  } catch (error) {
    if (transaction) await transaction.rollback();
    logErrorToFile('updateTurno', error);
    throw { status: 400, message: `Error al actualizar turno: ${error.message}` };
  }
};

export const deleteTurno = async (id) => {
  let transaction;
  try {
    transaction = await db.transaction();
    
    if (!id || isNaN(Number(id))) throw new Error('ID inválido');
    
    const turno = await TurnoModel.findByPk(id, { transaction });
    if (!turno) throw new Error('Turno no encontrado');

    await turno.destroy({ transaction });
    await transaction.commit();
    
    return { message: 'Turno eliminado correctamente' };
  } catch (error) {
    if (transaction) await transaction.rollback();
    logErrorToFile('deleteTurno', error);
    throw { status: 400, message: `Error al eliminar turno: ${error.message}` };
  }
};

// ==================== Asignación Automática de Rutinarios ====================
export const assignarTurnosAutomaticos = async () => {
  let transaction;
  try {
    transaction = await db.transaction();
    
    // 1. Configuración inicial
    const festivos = JSON.parse(await getParametro('FESTIVOS_CO_2025'));
    const maxPorFicha = Number(await getParametro('MAX_APRENDICES_POR_FICHA')) || 5;
    const fechaActual = new Date();
    
    // 2. Obtener aprendices activos con relaciones completas
    const aprendicesActivos = await AprendizModel.findAll({
      attributes: ['Id_Aprendiz', 'Nom_Aprendiz', 'Ape_Aprendiz', 'Id_Ficha'],
      include: [
        {
          model: FichaModel,
          attributes: ['Id_Ficha'],
          where: { Est_Fichas: 'ACTIVO' },
          include: [{
            model: ProgramaModel,
            attributes: ['Id_Programa', 'Nom_Programa', 'Id_Area'],
            include: [{
              model: AreaModel,
              attributes: ['Id_Area', 'Nom_Area'],
              include: [{
                model: UnidadModel,
                attributes: ['Id_Unidad', 'Nom_Unidad'],
                where: { Est_Unidad: 'ACTIVO' }
              }]
            }]
          }]
        },
        {
          model: UserModel,
          attributes: [],
          where: { Est_User: 'ACTIVO' }
        }
      ],
      transaction
    });

    // 3. Generar fechas válidas
    const fechasTurnos = generarDiasLaborables(fechaActual, festivos);
    const reporteData = [];

    // 4. Procesar por fecha y aprendiz
    for (const fecha of fechasTurnos) {
      for (const aprendiz of aprendicesActivos) {
        try {
          // Verificar límites por ficha
          const conteoDiario = await TurnoModel.count({
            where: {
              //validadr aprendices por ficha y traer la cantidad
              Id_Aprendiz: aprendiz.Id_Aprendiz,
              Fec_Inicio_Turno: { [Op.between]: [fecha, fecha] }
            },
            transaction
          });

          if (conteoDiario >= maxPorFicha) continue;

          // Obtener histórico de unidades
          const ultimasUnidades = await TurnoModel.findAll({
            attributes: ['Id_Unidad'],
            where: { Id_Aprendiz: aprendiz.Id_Aprendiz },
            order: [['Fec_Inicio_Turno', 'DESC']],
            limit: 2,
            transaction
          });

          // Filtrar unidades permitidas
          const unidadesPermitidas = await obtenerUnidadesPermitidas(
            aprendiz.Ficha.Programa.Area,
            transaction
          );

          // Selección inteligente de unidad
          const unidadAsignada = seleccionarUnidadInteligente(
            unidadesPermitidas,
            ultimasUnidades.map(u => u.Id_Unidad)
          );

          // Crear registro de turno
          const nuevoTurno = await TurnoModel.create({
            Fec_Inicio_Turno: fecha,
            Fec_Fin_Turno: fecha,
            Hor_Inicio_Turno: '07:00',
            Hor_Fin_Turno: '09:00',
            Tip_Turno: 'Rutinario',
            Id_Aprendiz: aprendiz.Id_Aprendiz,
            Id_Unidad: unidadAsignada.Id_Unidad,
            Id_Asistencia: 1
          }, { transaction });

          // Preparar datos para reporte
          reporteData.push({
            fecha: fecha.toISOString().split('T')[0],
            aprendiz: `${aprendiz.Nom_Aprendiz} ${aprendiz.Ape_Aprendiz}`,
            ficha: aprendiz.Ficha.Id_Ficha,
            programa: aprendiz.Ficha.Programa.Nom_Programa,
            unidad: unidadAsignada.Nom_Unidad,
            horario: '07:00 - 09:00'
          });

        } catch (error) {
          console.error(`Error procesando aprendiz ${aprendiz.Id_Aprendiz}: ${error.message}`);
        }
      }
    }

    // 5. Generar reporte y finalizar
    if (reporteData.length > 0) {
      await generarReporteExcel(reporteData, 'Reporte_Asignacion_Automatica.xlsx');
    }

    await transaction.commit();
    return {
      success: true,
      totalAsignados: reporteData.length,
      message: `Se asignaron ${reporteData.length} turnos rutinarios`
    };

  } catch (error) {
    if (transaction) await transaction.rollback();
    logErrorToFile('assignarTurnosAutomaticos', error);
    throw { status: 500, message: error.message };
  }
};




// ==================== Helpers Optimizados ====================
const seleccionarUnidadInteligente = (unidadesDisponibles, unidadesHistorial) => {
  // Priorizar unidades no usadas en últimos 2 turnos
  const unidadesFiltradas = unidadesDisponibles.filter(
    u => !unidadesHistorial.includes(u.Id_Unidad)
  );

  // Balancear carga entre unidades
  return unidadesFiltradas.length > 0 
    ? unidadesFiltradas[Math.floor(Math.random() * unidadesFiltradas.length)]
    : unidadesDisponibles[Math.floor(Math.random() * unidadesDisponibles.length)];
};

const generarDiasLaborables = (fechaBase, festivos) => {
  const dias = [];
  const fecha = new Date(fechaBase);
  
  // Ajustar al próximo lunes
  fecha.setDate(fecha.getDate() + ((1 - fecha.getDay() + 7) % 7));

  for (let i = 0; i < 5; i++) {
    const dia = new Date(fecha);
    dia.setDate(dia.getDate() + i);
    
    const formatoDia = dia.toISOString().split('T')[0];
    if (!festivos.includes(formatoDia)) {
      dias.push(dia);
    }
  }
  return dias;
};