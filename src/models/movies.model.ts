import mongoose, { Document, Schema } from 'mongoose';
import { Movie } from '../interfaces';

export interface MovieDocument extends Movie, Document {
    createdAt: Date;
    updatedAt: Date;
}

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        releaseDate: {
            type: Date,
            required: true,
        },
        genre: [{ type: Schema.Types.ObjectId, ref: 'Genre', required: true }],
    },
    { timestamps: true },
);

const MovieModel = mongoose.model<MovieDocument>('Movie', movieSchema);

export default MovieModel;
