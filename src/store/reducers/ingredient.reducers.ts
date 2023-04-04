import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientType } from "lib/helpers/ingredient";
import { IIngredient, IIngredientState } from "models/ingredient";

const initialState: IIngredientState = {
  allIngredients: {
    loading: false,
    data: [],
    error: ""
  },
  formattedIngredients: [{}],
  currIngredientIndex: 0
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
      state.allIngredients.error = "";
      state.allIngredients.data = action.payload;
      state.formattedIngredients = [
        action.payload.reduce((accumulator: any, curr) => {
          accumulator[curr.name] = {
            count:
              curr.name === IngredientType.BREAD_TOP ||
              curr.name === IngredientType.BREAD_BOTTOM
                ? 1
                : 0,
            price: curr.price,
            visible: !(
              curr.name === IngredientType.BREAD_TOP ||
              curr.name === IngredientType.BREAD_BOTTOM
            )
          };

          return accumulator;
        }, {})
      ];
    },
    getAllIngredientsError: (state, action: PayloadAction<string>) => {
      state.allIngredients.loading = false;
      state.allIngredients.error = action.payload;
    },
    increaseIngredientCount: (
      state,
      action: PayloadAction<{ name: IngredientType; index: number }>
    ) => {
      const { name, index } = action.payload;
      const currValue = state.formattedIngredients[index][name];
      state.formattedIngredients[index][name] = {
        ...currValue,
        count: currValue.count + 1
      };
    },
    decreaseIngredientCount: (
      state,
      action: PayloadAction<{ name: IngredientType; index: number }>
    ) => {
      const { name, index } = action.payload;
      const currValue = state.formattedIngredients[index][name];
      state.formattedIngredients[index][name] = {
        ...currValue,
        count: currValue.count < 0 ? 0 : currValue.count - 1
      };
    }
  }
});

export const ingredientActions = IngredientSlice.actions;

export default IngredientSlice.reducer;
