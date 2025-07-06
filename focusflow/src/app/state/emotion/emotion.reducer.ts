import { createReducer, on } from "@ngrx/store";
import { emotion } from "../../models/data.models";
import { LoadEmotions, LoadEmotionsFailure, LoadEmotionsSuccess } from "./emotion.actions";

export interface EmotionState {
    emotions: emotion[];
    error: string;
    status: "pending" | "loading" | "error" | "success";
};

export const initialEmotionState: EmotionState = {
    emotions: [],
    error: "",
    status: "pending",
};

export const EmotionReducer = createReducer(
    initialEmotionState,
    on(LoadEmotions, (state) => ({
        ...state,
        status: "loading" as "loading"
    })),
    on(LoadEmotionsSuccess, (state, { emotions }) => ({
        ...state,
        emotions: emotions,
        status: "success" as "success"
    })),
    on(LoadEmotionsFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: "error" as "error"
    }))
)