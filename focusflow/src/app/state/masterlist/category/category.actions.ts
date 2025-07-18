import { createAction, props } from "@ngrx/store";
import { category } from "../../../models/data.models";

export const LoadCategories = createAction(
    '[backend] load categories',
);

export const LoadCategoriesSuccess = createAction(
    '[backend] load categories success',
    props<{categories: category[]}>()
);

export const LoadCategoriesFailure = createAction(
    '[backend] loading categories failure',
    props<{error:string}>()
);

export const AddCategory = createAction(
    '[backend] add a new category',
    props<{category: category}>()
)

export const AddCategorySuccess = createAction(
    '[backend] add category success',
    props<{category: category}>()
)

export const AddCategoryFailure = createAction(
    '[backend] add category failure',
    props<{error:string}>()
)

//delete single Category actions

export const DeleteCategory = createAction(
    '[backend] delete category',
    props<{category: category}>()
);

export const DeleteCategorySuccess = createAction(
    '[backend] delete category success',
    props<{category: category}>()
);

export const DeleteCategoryFailure = createAction(
    '[backend] delete category failure',
    props<{error: string}>()
);
//edit single Category actions

export const EditCategory = createAction(
    '[backend] edit category',
    props<{category: category}>()
);

export const EditCategorySuccess = createAction(
    '[backend] edit category success',
    props<{category: category}>()
);

export const EditCategoryFailure = createAction(
    '[backend] edit category failure',
    props<{error: string}>()
);

