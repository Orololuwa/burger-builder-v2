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
  activePack: 0
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
            visible: !(
              curr.name === IngredientType.BREAD_TOP ||
              curr.name === IngredientType.BREAD_BOTTOM
            ),
            ...curr
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
    },
    setActivePack: (state, action: PayloadAction<number>) => {
      state.activePack = action.payload;
    },
    duplicatePack: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const duplicatedState = [...state.formattedIngredients];
      const duplicateFrom = { ...duplicatedState[index] };
      duplicatedState.push(duplicateFrom);
      state.formattedIngredients = duplicatedState;
    },
    deletePack: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const duplicatedState = [...state.formattedIngredients];
      if (index > -1) duplicatedState.splice(index, 1);
      state.activePack = 0;
      if (state.formattedIngredients.length > 1) {
        state.formattedIngredients = duplicatedState;
      }
    },
    resetOrder: (state) => {
      state.formattedIngredients = [{}];
      state.activePack = 0;
    }
  }
});

export const ingredientActions = IngredientSlice.actions;

export default IngredientSlice.reducer;
