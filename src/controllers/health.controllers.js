export async function getStatusHandler(req, res, next) {
	try {
		res.status(200).json({ message: 'App is up and running', result: 'OK' });
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500;
		}
		next(error);
	}
}
