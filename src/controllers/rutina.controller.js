import { pool } from '../db.js'

export const getRutina = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from rutinas');
        res.json({
            rows
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }

}

export const getRutinaId = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from rutinas where idRutina = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Rutina not found.'
        })
        return res.json(rows[0])

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }

}

export const createRutina = async (req, res) => {
    try {
        const { nombre,
            programa,
            series,
            repeticiones } = req.body;
        const [rows] = await pool.query('insert into rutinas (nombre, programa, series, repeticiones) values (?, ?, ?, ?)',
            [nombre, programa, series, repeticiones])
        res.send("Se insertó el repeticiones: \nid: " + rows.insertId + "\nNombre: " + nombre)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const updateRutina = async (req, res) => {
    try {
        const { idRutina,
            nombre,
            programa,
            series,
            repeticiones } = req.body;
        const [rows] = await pool.query('update rutinas set nombre = ?, programa = ?, series = ?, repeticiones = ? where idRutina = ?',
            [nombre, programa, series, repeticiones, idRutina])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Usuario not found.'
        })
        res.send("Se actualizó " + rows.affectedRows + " rutina")
        console.log(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const deleteRutina = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await pool.query('delete from rutinas where idRutina = ?',
            [id])
        if (rows.affectedRows <= 0) return res.status(404).json({
            message: 'Rutina not found.'
        })
        res.send("Se eliminó " + rows.affectedRows + " rutina con id: " + id)
        console.log(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}