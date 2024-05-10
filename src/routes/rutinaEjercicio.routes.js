import { Router } from 'express'
import { getRutinas, getIdEjerciciosRutina, getIdRutinaEjercicios, addRutinaEjercicio, deleteRutinaEjercicio } from '../controllers/rutinaEjercicio.controller.js'

const router = Router()

router.get('/rutinas/all', getRutinas)
router.get('/rutinas/rutina/:id', getIdEjerciciosRutina)
router.get('/rutinas/ejercicio/:id', getIdRutinaEjercicios)
router.post('/rutinas/ejercicio', addRutinaEjercicio)
router.delete('/rutinas/ejercicio', deleteRutinaEjercicio)


export default router