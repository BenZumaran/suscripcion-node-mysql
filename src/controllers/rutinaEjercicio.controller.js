import { pool } from '../db.js'

export const getRutinas = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from rutejercicio');
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }

}

export const getIdRutinaEjercicios = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from rutejercicio where idRutina = ?', [req.params.id]);
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }

}

export const getIdEjerciciosRutina = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from rutejercicio where idEjercicio = ?', [req.params.id]);
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }

}

export const addRutinaEjercicio = async (req, res) => {
    try {
        const { idRutina,
            idEjercicio } = req.body;
        const [rows] = await pool.query('insert into rutejercicio (idRutina, idEjercicio) values (?, ?)',
            [idRutina, idEjercicio])
        res.send("Se insertó " + rows.insertId + "row")
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const deleteRutinaEjercicio = async (req, res) => {
    try {
        const { idRutina,
            idEjercicio } = req.body;
        const [rows] = await pool.query('delete from rutejercicio where idRutina = ? and idEjercicio = ?',
            [idRutina, idEjercicio])
        if (rows.affectedRows <= 0) return res.status(404).json({
            message: 'Rutina not found.'
        })
        res.send("Se eliminó " + rows.affectedRows + " ejercicio")
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}