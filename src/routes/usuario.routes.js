import { Router } from 'express'
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuario.controller.js'

const router = Router()

router.get('/usuario', getUsuarios)
router.get('/usuario/:id', getUsuarioById)
router.post('/usuario', createUsuario)
router.put('/usuario', updateUsuario)
router.delete('/usuario/:id', deleteUsuario)

export default router