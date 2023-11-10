import { body, param } from 'express-validator';
import MovieModel from '../models/movies.model';

export const movieValidator = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Please specify a movie title')
        .custom(value => {
            return MovieModel.findOne({ title: value }).then(title => {
                if (title) {
                    return Promise.reject('Such movie is already exists!');
                }
            });
        }),
    body('description').trim().isLength({ min: 5 }).withMessage('Min length is 5 characters'),
    body('releaseDate').trim().toDate(),
    body('genre').isArray({ min: 1 }).withMessage('Please specify at least one genre'),
];

export const movieIdValidator = [param('movieId').isMongoId().withMessage('Please specify a correct movie ID')];
