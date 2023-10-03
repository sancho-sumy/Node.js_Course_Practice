const mockedMovies = [
	{
		id: '1',
		title: 'The Shawshank Redemption',
		description:
			'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
		releaseDate: '1994-09-23',
		genre: ['Drama', 'Crime']
	},
	{
		id: '2',
		title: 'Inception',
		description:
			"A thief who enters the dreams of others to steal their secrets finds himself in a complex heist that involves planting an idea into a CEO's mind.",
		releaseDate: '2010-07-16',
		genre: ['Science Fiction', 'Action']
	},
	{
		id: '3',
		title: 'The Godfather',
		description:
			'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
		releaseDate: '1972-03-24',
		genre: ['Drama', 'Crime']
	},
	{
		id: '4',
		title: 'Forrest Gump',
		description:
			'The life story of Forrest Gump, a man with low intelligence, who inadvertently influences many historical events in the United States.',
		releaseDate: '1994-07-06',
		genre: ['Drama', 'Comedy']
	},
	{
		id: '5',
		title: 'Avatar',
		description:
			'A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
		releaseDate: '2009-12-18',
		genre: ['Science Fiction', 'Action']
	}
];

export async function getMoviesHandler(req, res, next) {
	try {
		res.status(200).json({ message: 'Fetched movies successfully', result: mockedMovies });
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500;
		}
		next(error);
	}
}