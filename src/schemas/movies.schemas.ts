/**
 * @openapi
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - releaseDate
 *        - genre
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the movie
 *         description:
 *           type: string
 *           description: The description of the movie
 *         releaseDate:
 *           type: date
 *           description: Movie release date
 *         genre:
 *           type: array
 *           items:
 *            type: string
 *           description: The genre of the movie
 *       example:
 *         title: "Pulp Fiction"
 *         description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
 *         releaseDate: "1994-10-14"
 *         genre: ["65353e4a74e2f96bb5a1b247", "653541674ecd2541c9eeb007"]
 *     CreateMovieResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Movie ID
 *         title:
 *           type: string
 *           description: The title of the movie
 *         description:
 *           type: string
 *           description: The description of the movie
 *         releaseDate:
 *           type: date
 *           description: Movie release date
 *         genre:
 *           type: array
 *           items:
 *            type: string
 *           description: The genre of the movie
 *         createdAt:
 *           type: date
 *           description: Creation date
 *         updatedAt:
 *           type: date
 *           description: Last update date
 *         __v:
 *           type: number
 *           description: Version
 *       example:
 *         _id: "653a865b6dc69842f95f48ad"
 *         title: "Pulp Fiction"
 *         description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
 *         releaseDate: "1994-10-14"
 *         genre: ["65353e4a74e2f96bb5a1b247", "653541674ecd2541c9eeb007"]
 *         createdAt: "2023-10-26T15:31:39.921Z"
 *         updatedAt: "2023-10-26T15:31:39.921Z"
 *         __v: 0
 *     DeleteMovieResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Creation confirmation message
 *       example:
 *         message: "Movie deleted."
 */
