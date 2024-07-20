import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger Demo Project',
            version: '1.0.0'
        },
    },
    apis: [`${path.join(__dirname, '../routes/*')}`]
}

export default swaggerJSDoc(options)

// import swaggerAutogen from "swagger-autogen"

// swaggerAutogen()(
//     './src/swagger_output.json',
//     [
//         './src/routes/index.ts',
//     ],
//     {
//         info: {
//             version: 'v1.0.0',
//             title: 'Swagger Demo Project',
//             description: 'Implementation of Swagger with TypeScript'
//         },
//         tags: [
//             {
//               name: 'Auth',
//               description: 'Auth API endpoints',
//             },
//             {
//               name: 'Users',
//               description: 'Users API endpoints',
//             },
//             {
//               name: 'Matchs',
//               description: 'Matchs API endpoints',
//             },
//             {
//               name: 'Tournaments',
//               description: 'Tournaments API endpoints',
//             },
//         ],
//         host: 'localhost:5000',
//         schemes: ['http'],
//         components: {
//             securitySchemes: {
//                 bearerAuth: {
//                     type: 'http',
//                     scheme: 'bearer',
//                 }
//             }
//         },
//         apis: ['./src/routes/index.ts', './src/routes/*.route.ts', './src/models/*.ts'],
//     }
// )
