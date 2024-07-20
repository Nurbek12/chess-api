import express from 'express'
import routes from './routes'
import { PORT } from './config/keys'
import swaggerSpec from './config/swagger'
import swaggerUi from 'swagger-ui-express'
import { connect_to_db } from './config/db'
// import swaggerOutput from './swagger_output.json'

const app = express()

app
    .use(express.json())
    .use(express.urlencoded({ extended: false }))

    .use(routes)
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    .listen(PORT, () => {
        console.log('Server started...')
        connect_to_db()
    })

export default app