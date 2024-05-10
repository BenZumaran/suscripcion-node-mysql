import { pool } from '../db.js'

export const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from usuario');
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }

}

export const getUsuarioById = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from usuario where idUsuario = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Usuario not found.'
        })
        return res.json(rows[0])

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }

}

export const createUsuario = async (req, res) => {
    try {
        const { nombre,
            email,
            clave,
            fechaRegistro,
            tipo } = req.body;
        const [rows] = await pool.query('insert into usuario (nombre, email, clave, fechaRegistro, tipo) values (?, ?, ?, ?, ?)',
            [nombre, email, clave, fechaRegistro, tipo])
        res.send("Se insertó el Usuario: \nid: " + rows.insertId + "\nNombre: " + nombre)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const updateUsuario = async (req, res) => {
    try {
        const { idUsuario,
            nombre,
            email,
            clave,
            tipo } = req.body;
        const [rows] = await pool.query('update usuario set nombre = ?, email = ?, clave = ?, tipo = ? where idUsuario = ?',
            [nombre, email, clave, tipo, idUsuario])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Usuario not found.'
        })
        res.send("Se actualizó " + rows.affectedRows + " Tipo de Suscripción")
        console.log(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const deleteUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await pool.query('delete from usuario where idUsuario = ?',
            [id])
        if (rows.affectedRows <= 0) return res.status(404).json({
            message: 'Usuario not found.'
        })
        res.send("Se eliminó " + rows.affectedRows + " Tipo de Suscripción con id: " + id)
        console.log(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}