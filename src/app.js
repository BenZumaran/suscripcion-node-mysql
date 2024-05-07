import express from 'express'
import suscripcionRoutes from './routes/tipoSuscripcion.routes.js'
import suscripcionUsuarioRoutes from './routes/suscripcionUsuario.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()

app.use(express.json())


app.use(indexRoutes)
app.use('/api', suscripcionRoutes)
app.use('/api', suscripcionUsuarioRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

export default app