import { pool } from '../db.js'

export const listaTipoSuscripcion = async () => {
    let tipoSuscripciones = [];
    const [rows] = await pool.query('SELECT * FROM tipo_suscripcion');
    return rows;

} 