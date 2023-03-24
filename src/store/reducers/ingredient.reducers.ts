import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient, IIngredientState } from "models/ingredient";

const initialState: IIngredientState = {
  allIngredients: {
    loading: false,
    data: [],
    error: ""
  }
};

export const IngredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    getAllIngredientsBegin: (state) => {
      state.allIngredients.loading = true;
      state.allIngredients.error = "";
    },
    getAllIngredientsSuccess: (state, action: PayloadAction<IIngredient[]>) => {
      state.allIngredients.loading = false;
      (state.allIngredients.error = ""),
        (state.allIngredients.data = action.payload);
    },
    getAllIngredientsError: (state, action: PayloadAction<string>) => {
      state.allIngredients.loading = false;
      state.allIngredients.error = action.payload;
    }
  }
});

export const ingredientActions = IngredientSlice.actions;

export default IngredientSlice.reducer;
