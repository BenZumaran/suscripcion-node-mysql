import { pool } from '../db.js'

export const getSuscripcion = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from tipo_suscripcion');
        res.json({
            rows
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }

}

export const getSuscripcionById = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from tipo_suscripcion where id_tipo_suscripcion = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Tipo de suscripción not found.'
        })
        return res.json(rows[0])

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }

}

export const createSuscripcion = async (req, res) => {
    try {
        const { nombre_tipo_suscripcion: nombre,
            descripcion_tipo_suscripcion: descripcion,
            duracion_tipo_suscripcion: duracion,
            precio_tipo_suscripcion: precio } = req.body;
        const [rows] = await pool.query('insert into tipo_suscripcion (nombre_tipo_suscripcion, descripcion_tipo_suscripcion, duracion_tipo_suscripcion, precio_tipo_suscripcion) values (?, ?, ?, ?)',
            [nombre, descripcion, duracion, precio])
        res.send("Se insertó el Tipo de Suscripción: \nid: " + rows.insertId + "\nNombre: " + nombre)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const updateSuscripcion = async (req, res) => {
    try {
        const { id_tipo_suscripcion: id,
            nombre_tipo_suscripcion: nombre,
            descripcion_tipo_suscripcion: descripcion,
            duracion_tipo_suscripcion: duracion,
            precio_tipo_suscripcion: precio } = req.body;
        const [rows] = await pool.query('update tipo_suscripcion set nombre_tipo_suscripcion = ?, descripcion_tipo_suscripcion = ?, duracion_tipo_suscripcion = ?, precio_tipo_suscripcion = ? where id_tipo_suscripcion = ?',
            [nombre, descripcion, duracion, precio, id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Tipo de suscripción not found.'
        })
        res.send("Se actualizó " + rows.affectedRows + " Tipo de Suscripción")
        console.log(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const deleteSuscripcion = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await pool.query('delete from tipo_suscripcion where id_tipo_suscripcion = ?',
            [id])
        if (rows.affectedRows <= 0) return res.status(404).json({
            message: 'Tipo de suscripción not found.'
        })
        res.send("Se eliminó " + rows.affectedRows + " Tipo de Suscripción con id: " + id)
        console.log(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}