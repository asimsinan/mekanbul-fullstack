const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./app_api/routes/index']

swaggerAutogen(outputFile, endpointsFiles)