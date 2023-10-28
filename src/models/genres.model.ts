import mongoose, { Document } from 'mongoose';
import { Genre } from '../interfaces';

export interface GenreDocument extends Genre, Document {
    createdAt: Date;
    updatedAt: Date;
}

const genreSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const GenreModel = mongoose.model<GenreDocument>('Genre', genreSchema);

export default GenreModel;
