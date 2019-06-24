import * as mongoose from "mongoose";
import { Schema, Model, Document } from "mongoose";

export interface IExercise extends Document {
    workoutPlan: string;
    title: string;
    description?: string;
    sets: number;
    reps: number;
    restTime: number;
}

const ExerciseSchema: Schema<IExercise> = new Schema({
    workoutPlan: {
        type: Schema.Types.ObjectId,
        ref: "WorkoutPlan"
    },
    title: {
        type: String,
        required: "Exercise title is required"
    },
    description: {
        type: String
    },
    sets: {
        type: Number,
        required: "Amount of sets is required"
    },
    reps: {
        type: Number,
        required: "Amount of repeats is required"
    },
    restTime: {
        type: Number,
        required: "Rest time in seconds required"
    }
});

const Exercise: Model<IExercise> = mongoose.model<IExercise>("Exercise", ExerciseSchema);

export default Exercise;
