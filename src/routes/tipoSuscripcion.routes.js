import { Router } from 'express'
import { getSuscripcion, createSuscripcion, updateSuscripcion, deleteSuscripcion, getSuscripcionById } from '../controllers/tipoSuscripcion.controller.js'

const router = Router()

router.get('/suscripcion', getSuscripcion)
router.get('/suscripcion/:id', getSuscripcionById)
router.post('/suscripcion', createSuscripcion)
router.put('/suscripcion', updateSuscripcion)
router.delete('/suscripcion/:id', deleteSuscripcion)

export default router