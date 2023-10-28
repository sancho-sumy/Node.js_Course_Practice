/**
 * @openapi
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       required:
 *        - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the genre
 *       example:
 *         name: "Comedy"
 *     CreateGenreResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Movie ID
 *         name:
 *           type: string
 *           description: The name of the genre
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
 *         _id: "65353e4a74e2f96bb5a1b247"
 *         name: "Comedy"
 *         createdAt: "2023-10-26T15:31:39.921Z"
 *         updatedAt: "2023-10-26T15:31:39.921Z"
 *         __v: 0
 *     DeleteGenreResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Creation confirmation message
 *       example:
 *         message: "Genre deleted."
 */
