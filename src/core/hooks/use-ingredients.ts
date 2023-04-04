import { useAppDispatch, useAppSelector } from "core/hooks/use-redux";
import { IngredientType } from "lib/helpers/ingredient";
import { getAllIngredients } from "store/action-creators/ingredient.action";
import { ingredientActions } from "store/reducers/ingredient.reducers";

export const useIngredients = () => {
  const ingredients = useAppSelector(
    (state) => state.ingredient.allIngredients
  );
  const currIngredientIndex = useAppSelector(
    (state) => state.ingredient.currIngredientIndex
  );
  const formattedIngredients = useAppSelector(
    (state) => state.ingredient.formattedIngredients
  );
  const dispatch = useAppDispatch();

  const dispatchAllIngredients = () => {
    dispatch(getAllIngredients());
  };

  const ingredientAdded = (name: IngredientType, index: number) => {
    dispatch(ingredientActions.increaseIngredientCount({ name, index }));
  };

  const ingredientRemoved = (name: IngredientType, index: number) => {
    dispatch(ingredientActions.decreaseIngredientCount({ name, index }));
  };

  return {
    dispatchAllIngredients,
    ingredients: ingredients.data,
    ingredientAdded,
    ingredientRemoved,
    formattedIngredients,
    currIngredientIndex
  };
};
