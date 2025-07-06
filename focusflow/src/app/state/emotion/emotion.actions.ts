import { createAction, props } from "@ngrx/store";
import { emotion } from "../../models/data.models";

//load list of emotions
export const LoadEmotions = createAction(
    '[backend] load emotions'
);

export const LoadEmotionsSuccess = createAction(
    '[backend] load emotions success',
    props<{emotions: emotion[]}>()
);

export const LoadEmotionsFailure = createAction(
    '[backend] loading emotions failure',
    props<{error:string}>()
);
