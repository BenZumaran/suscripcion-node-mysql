import { pool } from '../db.js'


export const getPing = async (req, res) => {
    const [result] = await pool.query('select 1 + 1  as Result')
    res.json(result)
}
