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
 *         id:
 *           type: string
 *           description: The ID of the movie
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
 *         id: "6"
 *         title: "Pulp Fiction"
 *         description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
 *         releaseDate: "1994-10-14"
 *         genre: ["Crime", "Drama"]
 */
