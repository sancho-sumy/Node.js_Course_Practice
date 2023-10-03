const mockedMovies = [
  {
    "Title": "The Shawshank Redemption",
    "Description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    "ReleaseDate": "1994-09-23",
    "Genre": ["Drama", "Crime"]
  },
  {
    "Title": "Inception",
    "Description": "A thief who enters the dreams of others to steal their secrets finds himself in a complex heist that involves planting an idea into a CEO's mind.",
    "ReleaseDate": "2010-07-16",
    "Genre": ["Science Fiction", "Action"]
  },
  {
    "Title": "The Godfather",
    "Description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    "ReleaseDate": "1972-03-24",
    "Genre": ["Drama", "Crime"]
  },
  {
    "Title": "Forrest Gump",
    "Description": "The life story of Forrest Gump, a man with low intelligence, who inadvertently influences many historical events in the United States.",
    "ReleaseDate": "1994-07-06",
    "Genre": ["Drama", "Comedy"]
  },
  {
    "Title": "Avatar",
    "Description": "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    "ReleaseDate": "2009-12-18",
    "Genre": ["Science Fiction", "Action"]
  }
]
;

export async function getMoviesHandler(req, res, next) {
  try {
    res.status(200).json({message: 'Fetched movies successfully', result: mockedMovies});
  } catch (error) {
      if (!error.statusCode) {
          error.statusCode = 500;
      }
      next(error);
  }
}