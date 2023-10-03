import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import logger from './logger.utils.js';

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Node.js_Course_Practice',
			version: '0.1.0',
			description: 'This is an application made with Express.js and documented with Swagger'
		},
		components: {
			responses: {
				400: {
					description: 'Missing API key - include it in the Authorization header',
					contents: 'application/json'
				},
				401: {
					description: 'Unauthorized - incorrect API key or incorrect format',
					contents: 'application/json'
				},
				404: {
					description: 'Not found - the item was not found',
					contents: 'application/json'
				}
			},
			securitySchemes: {
				ApiKeyAuth: {
					type: 'apiKey',
					in: 'header',
					name: 'Authorization'
				}
			}
		},
		security: [
			{
				ApiKeyAuth: []
			}
		]
	},
	apis: ['./src/routes/*.js', './src/schemas/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	app.get('/api-docs.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});

	logger.info(`Docs available at http://localhost:${port}/api-docs`);
}

export default swaggerDocs;
