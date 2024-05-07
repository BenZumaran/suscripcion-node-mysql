import { Router } from 'express'
import {
    getSuscripcionUsuario,
    getSuscripcionUsuarioByIdUsuario,
    getSuscripcionUsuarioByIdSuscripcion,
    createSuscripcionUsuario,
    updateSuscripcionUsuario,
    deleteSuscripcionUsuario
} from '../controllers/suscripcionUsuario.controller.js'

const router = Router()

router.get('/suscripcion-usuario', getSuscripcionUsuario)
router.get('/suscripcion-usuario/usuario/:id', getSuscripcionUsuarioByIdUsuario)
router.get('/suscripcion-usuario/suscripcion/:id', getSuscripcionUsuarioByIdSuscripcion)
router.post('/suscripcion-usuario', createSuscripcionUsuario)
router.put('/suscripcion-usuario', updateSuscripcionUsuario)
router.delete('/suscripcion-usuario/:id', deleteSuscripcionUsuario)

export default router