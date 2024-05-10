import { pool } from '../db.js'

export const getEjercicio = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from ejercicio');
        res.json({
            rows
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }

}

export const getEjercicioId = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from ejercicio where idEjercicio = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Ejercicio not found.'
        })
        return res.json(rows[0])

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }

}

export const createEjercicio = async (req, res) => {
    try {
        const { tipo,
            nombre,
            musculo,
            dificultad,
            instruccion } = req.body;
        const [rows] = await pool.query('insert into ejercicio (tipo, nombre, musculo, dificultad, instruccion) values (?, ?, ?, ?, ?)',
            [tipo, nombre, musculo, dificultad, instruccion])
        res.send("Se insertó el Ejercicio: \nid: " + rows.insertId + "\nNombre: " + nombre)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const updateEjercicio = async (req, res) => {
    try {
        const { idEjercicio,
            tipo,
            nombre,
            musculo,
            dificultad,
            instruccion } = req.body;
        const [rows] = await pool.query('update ejercicio set tipo=?, nombre=?, musculo=?, dificultad=?, instruccion=? where idEjercicio=?',
            [tipo, nombre, musculo, dificultad, instruccion, idEjercicio])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Usuario not found.'
        })
        res.send("Se actualizó " + rows.affectedRows + " ejercicios")
        console.log(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const deleteEjercicio = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await pool.query('delete from ejercicio where idEjercicio = ?',
            [id])
        if (rows.affectedRows <= 0) return res.status(404).json({
            message: 'Usuario not found.'
        })
        res.send("Se eliminó " + rows.affectedRows + " ejercicio con id: " + id)
        console.log(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}