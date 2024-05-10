import { Router } from 'express'
import { getRutina, getRutinaId, createRutina, updateRutina, deleteRutina } from '../controllers/rutina.controller.js'

const router = Router()

router.get('/rutina', getRutina)
router.get('/rutina/:id', getRutinaId)
router.post('/rutina', createRutina)
router.put('/rutina', updateRutina)
router.delete('/rutina/:id', deleteRutina)


export default router