import { body, param } from 'express-validator';
import GenreModel from '../models/genres.model';

export const createGenreValidator = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Please specify a genre name')
        .custom(value => {
            return GenreModel.findOne({ title: value }).then(title => {
                if (title) {
                    return Promise.reject('Such genre is already exists!');
                }
            });
        }),
];

export const updateGenreValidator = [
    param('genreId').isMongoId().withMessage('Please specify a correct genre ID'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Please specify a genre name')
        .custom(value => {
            return GenreModel.findOne({ title: value }).then(title => {
                if (title) {
                    return Promise.reject('Such genre is already exists!');
                }
            });
        }),
];

export const genreIdValidator = [param('genreId').isMongoId().withMessage('Please specify a correct genre ID')];
