import { pool } from '../db.js'

export const getSuscripcionUsuario = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from suscripcion_usuario');
        res.json({
            rows
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}
export const getSuscripcionUsuarioByIdUsuario = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from suscripcion_usuario where id_usuario = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Suscripción con usuario ' + req.params.id + '  not found.'
        })
        return res.json(rows[0])

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }

}
export const getSuscripcionUsuarioByIdSuscripcion = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from suscripcion_usuario where id_tipo_suscripcion = ? ', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Suscripciones con id: ' + req.params.id + '  not found.'
        });
        res.json({
            rows
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }

}
export const createSuscripcionUsuario = async (req, res) => {
    try {
        const { id_usuario: idUsuario,
            id_tipo_suscripcion: idTipoSuscripcion,
        } = req.body;
        const [rws] = await pool.query('select * from tipo_suscripcion where id_tipo_suscripcion = ?', [idTipoSuscripcion])
        if (rws.length <= 0) return res.status(404).json({
            message: 'Suscripcion con id: ' + req.params.id + '  not found.'
        });
        const [row] = await pool.query('select * from suscripcion_usuario where id_usuario = ?', [idUsuario])
        if (row.length > 0) return res.status(422).json({
            message: 'Id Usuario already has a suscription, try to update or delete.'
        })
        console.log(rws[0].id_tipo_suscripcion, "existe.");
        let date = new Date(Date.now());
        let startDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        let duration = rws[0].duracion_tipo_suscripcion;
        let durationDays = Math.ceil(duration * 30);
        let endDate;
        if ((durationDays % 30) + date.getDate() > 30) endDate = date.getFullYear() + "-" + (date.getMonth() + 2 + Math.floor(duration)) + "-" + ((durationDays % 30) - date.getDate());
        else endDate = date.getFullYear() + "-" + (date.getMonth() + 1 + Math.floor(duration)) + "-" + ((durationDays % 30) + date.getDate());
        const [rows] = await pool.query('insert into suscripcion_usuario (id_usuario, id_tipo_suscripcion, fecha_inicio_suscripcion, fecha_fin_suscripcion, estado_suscripcion) values (?, ?, ?, ?, ?)', [idUsuario, idTipoSuscripcion, startDate, endDate, 1]);
        res.send("Se insertó " + rows.affectedRows + " suscripción para el usuario con id: " + idUsuario)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.' + error
        })
    }
}
export const updateSuscripcionUsuario = async (req, res) => {
    try {
        const { id_usuario: idUsuario,
            id_tipo_suscripcion: idTipoSuscripcion,
        } = req.body;
        const [rws] = await pool.query('select * from tipo_suscripcion where id_tipo_suscripcion = ?', [idTipoSuscripcion])
        if (rws.length <= 0) return res.status(404).json({
            message: 'Suscripcion con id: ' + req.params.id + '  not found.'
        });
        console.log(rws[0].id_tipo_suscripcion, "existe.");
        let date = new Date(Date.now());
        let startDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        let duration = rws[0].duracion_tipo_suscripcion;
        let durationDays = Math.ceil(duration * 30);
        let endDate;
        if ((durationDays % 30) + date.getDate() > 30) endDate = date.getFullYear() + "-" + (date.getMonth() + 2 + Math.floor(duration)) + "-" + ((durationDays % 30) - date.getDate());
        else endDate = date.getFullYear() + "-" + (date.getMonth() + 1 + Math.floor(duration)) + "-" + ((durationDays % 30) + date.getDate());
        const [rows] = await pool.query('update suscripcion_usuario set id_tipo_suscripcion = ?, fecha_inicio_suscripcion = ?, fecha_fin_suscripcion = ?, estado_suscripcion = ? where id_usuario = ?', [idTipoSuscripcion, startDate, endDate, 1, idUsuario]);
        res.send("Se actualizó " + rows.affectedRows + " suscripción con el id de usuario: " + idUsuario)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }


}
export const deleteSuscripcionUsuario = async (req, res) => {
    try {
        let id = req.params.id
        const [rows] = await pool.query('delete from suscripcion_usuario where id_usuario = ?', [id]);
        if (rows.affectedRows <= 0) return res.status(404).json({
            message: 'Suscripcion con id usuario: ' + req.params.id + '  not found.'
        });
        res.send("Se eliminó " + rows.affectedRows + " Tipo de Suscripción con id: " + id)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.' + error.body
        })
    }
}