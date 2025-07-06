import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { EmotionState } from "./emotion.reducer";



export const Selectemotion = (state: AppState) => state.emotion;
export const selectEmotion = createSelector(
    Selectemotion,
    (state: EmotionState) => state.emotions
);