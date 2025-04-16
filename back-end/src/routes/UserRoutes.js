// src/routes/userRoutes.js
import { Router } from 'express';
import {
  findAllUsers,
  findUserById,
  createNewUser,
  updateExistingUser,
  deleteUserById,
  authenticateUser
} from '../controller/userController.js';

const router = Router();

// Rutas públicas
router.post('/auth', authenticateUser);

// Rutas protegidas (requieren autenticación)
router.get('/', findAllUsers);
router.get('/:id', findUserById);
router.post('/', createNewUser);
router.put('/:id', updateExistingUser);
router.delete('/:id', deleteUserById);

export default router;