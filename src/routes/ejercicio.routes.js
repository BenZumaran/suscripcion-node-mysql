import { Router } from 'express'
import { getEjercicio, getEjercicioId, createEjercicio, updateEjercicio, deleteEjercicio, getEjercicioMusculo } from '../controllers/ejercicio.controller.js'

const router = Router()

router.get('/ejercicio', getEjercicio)
router.get('/ejercicio/:id', getEjercicioId)
router.get('/ejercicio/musculo/:musculo', getEjercicioMusculo)
router.post('/ejercicio', createEjercicio)
router.put('/ejercicio', updateEjercicio)
router.delete('/ejercicio/:id', deleteEjercicio)

export default router