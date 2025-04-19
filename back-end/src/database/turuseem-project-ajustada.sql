CREATE TABLE Areas (
  Id_Area INT PRIMARY KEY,
  Nom_Area VARCHAR(100)
);

CREATE TABLE Departamentos (
  Id_Departamento INT PRIMARY KEY,
  Nom_Departamento VARCHAR(100)
);

CREATE TABLE Programas (
  Id_Programa INT PRIMARY KEY,
  Nom_Programa VARCHAR(100),
  Tip_Programa ENUM('TECNICO', 'TECNOLOGO') NOT NULL,
  Est_Programa ENUM('ACTIVO', 'INACTIVO') NOT NULL
);

CREATE TABLE Users (
  Id_User INT PRIMARY KEY,
  Tipo_Usuario ENUM('Talento Humano', 'Usuario Normal') NOT NULL,
  Nom_User VARCHAR(100) NOT NULL,
  Ape_User VARCHAR(100),
  Genero_User ENUM('Masculino','Femenino'),
  Email_User VARCHAR(100) NOT NULL,
  Tel_User VARCHAR(15),
  Password_User VARCHAR(255),
  token VARCHAR(255),
  confirmado BOOLEAN,
  Est_User ENUM('ACTIVO','INACTIVO') NOT NULL
);

CREATE TABLE Funcionarios (
  Id_Funcionario INT PRIMARY KEY,
  Nom_Funcionario VARCHAR(100),
  Ape_Funcionario VARCHAR(100),
  Genero ENUM('Masculino','Femenino') NOT NULL,
  Tel_Funcionario VARCHAR(15) NOT NULL CHECK (CHAR_LENGTH(Tel_Funcionario) BETWEEN 7 AND 15),
  Est_Funcionario ENUM('Activo','Inactivo') NOT NULL,
  Cor_Funcionarios VARCHAR(100),
  Cargo_Funcionario ENUM('Planta','Contratista') NOT NULL
);

CREATE TABLE Unidades (
  Id_Unidad INT PRIMARY KEY,
  Nom_Unidad VARCHAR(100),
  Hora_Apertura TIME,
  Hora_Cierre TIME,
  Est_Unidad ENUM('ACTIVO','INACTIVO') NOT NULL,
  Id_Area INT,
  FOREIGN KEY (Id_Area) REFERENCES Areas(Id_Area)
);

CREATE TABLE Fichas (
  Id_Ficha INT PRIMARY KEY,
  Fec_Inicio_Etapa_lectiva DATE,
  Fec_Fin_Etapa_lectiva DATE,
  Fec_Inicio_Etapa_practica DATE,
  Fec_Fin_Etapa_practica DATE,
  Can_Aprendices INT,
  Est_Fichas ENUM('ACTIVO','INACTIVO') NOT NULL,
  Id_Programa INT,
  FOREIGN KEY (Id_Programa) REFERENCES Programas(Id_Programa)
);

CREATE TABLE Municipios (
  Id_Municipio INT PRIMARY KEY,
  Nom_Municipio VARCHAR(100),
  Id_Departamento INT,
  FOREIGN KEY (Id_Departamento) REFERENCES Departamentos(Id_Departamento)
);

CREATE TABLE Asistencias (
  Id_Asistencia INT PRIMARY KEY,
  Fec_Asistencia DATE,
  Mot_Asistencia VARCHAR(255),
  Ind_Asistencia ENUM('SI','NO') NOT NULL
  Id_Inasistencia INT
);

CREATE TABLE Inasistencias (
  Id_Inasistencia INT PRIMARY KEY,
  Fec_Inasistencia DATE,
  Mot_Inasistencia VARCHAR(255),
  Tip_Inasistencia ENUM('Justificada','No Justificada') NOT NULL,
  Fec_Justificacion DATE,
  Obs_Inasistencia VARCHAR(255),
  Est_Inasistencia ENUM('ACTIVO','INACTIVO') NOT NULL
);

CREATE TABLE Turnos_Especiales (
  Id_Turno_Especial INT PRIMARY KEY,
  Fec_Inicio_Turno_Especial DATE,
  Fec_Fin_Turno_Especial DATE,
  Hor_Inicio_Turno_Especial TIME,
  Hor_Fin_Turno_Especial TIME,
  Obs_Turno_Especial VARCHAR(255),
  Id_Funcionario INT,
  Id_Ficha INT,
  Id_Unidad INT,
  FOREIGN KEY (Id_Funcionario) REFERENCES Funcionarios(Id_Funcionario),
  FOREIGN KEY (Id_Ficha) REFERENCES Fichas(Id_Ficha),
  FOREIGN KEY (Id_Unidad) REFERENCES Unidades(Id_Unidad)
);

CREATE TABLE Aprendices (
  Id_Aprendiz INT PRIMARY KEY,
  Nom_Aprendiz VARCHAR(100),
  Ape_Aprendiz VARCHAR(100),
  Id_Ficha INT,
  Fec_Nacimiento DATE,
  Id_Municipio INT,
  Dir_Residencia VARCHAR(200),
  Edad_Aprendiz INT,
  Hijos_Aprendiz ENUM('Si','No') NOT NULL,
  Nom_Eps VARCHAR(100),
  Tel_Acudiente VARCHAR(20),
  Gen_Aprendiz ENUM('Masculino','Femenino') NOT NULL,
  Email_Aprendiz VARCHAR(100) NOT NULL,
  Email_Institucional_Aprendiz VARCHAR(100),
  Tel_Aprendiz VARCHAR(20),
  Patrocinio ENUM('Si','No') NOT NULL,
  Nom_Empresa VARCHAR(150),
  Centro_Convivencia ENUM('Si','No') NOT NULL,
  Fot_Aprendiz VARCHAR(255),
  FOREIGN KEY (Id_Ficha) REFERENCES Fichas(Id_Ficha),
  FOREIGN KEY (Id_Municipio) REFERENCES Municipios(Id_Municipio)
);

CREATE TABLE Turnos (
  Id_Turno INT PRIMARY KEY AUTO_INCREMENT,
  Fec_Inicio_Turno DATE,
  Fec_Fin_Turno DATE,
  Hor_Inicio_Turno TIME,
  Hor_Fin_Turno TIME,
  Obs_Turno VARCHAR(255),
  Id_Asistencia INT,
  Tip_Turno ENUM('Especial','Rutinario'),
  Id_Turno_Especial INT,
  Id_Aprendiz INT,
  Id_Unidad INT,
  FOREIGN KEY (Id_Asistencia) REFERENCES Asistencias(Id_Asistencia),
  FOREIGN KEY (Id_Aprendiz) REFERENCES Aprendices(Id_Aprendiz),
  FOREIGN KEY (Id_Unidad) REFERENCES Unidades(Id_Unidad)
);

CREATE TABLE Memorandos (
  Id_Memorando INT PRIMARY KEY,
  Fec_Memorando DATE,
  Tot_Memorando INT,
  Mot_Memorando ENUM('Evacion de centro','Comportamiento indebido','inasistencia a turno','inasistencia a centro') NOT NULL,
  Est_Memorando ENUM('ACTIVO','INACTIVO') NOT NULL,
  Id_Turno INT,
  FOREIGN KEY (Id_Turno) REFERENCES Turnos(Id_Turno)
);

CREATE TABLE Parametros (
  Id_Parametro INT PRIMARY KEY AUTO_INCREMENT,
  Id_User INT NOT NULL,
  Nom_Parametro VARCHAR(100) NOT NULL,
  Val_Parametro VARCHAR(255) NOT NULL,
  Des_Parametro TEXT,
  Tip_Parametro ENUM('TIEMPO', 'TEXTO', 'NUMERO', 'BOOLEAN', 'ENUM') NOT NULL,
  Est_Parametro ENUM('ACTIVO', 'INACTIVO') DEFAULT 'ACTIVO',
  Fecha_Creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  Fecha_Actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (Id_User) REFERENCES Users(Id_User)
);

CREATE TABLE Areas_A_Areas (
  Id_Area_A_Area INT PRIMARY KEY AUTO_INCREMENT,
  Id_Area INT NOT NULL,
  Area_Asignada ENUM('AGRICOLA', 'AGROINDUSTRIA', 'GESTION AMBIENTAL', 'GESTION ADMINISTRATIVA', 'MECANIZACION', 'PECUARIA') NOT NULL,
  FOREIGN KEY (Id_Area) REFERENCES Areas(Id_Area)
);
