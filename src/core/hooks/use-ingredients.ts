import { useAppDispatch, useAppSelector } from "core/hooks/use-redux";
import { getAllIngredients } from "store/action-creators/ingredient.action";

export const useIngredients = () => {
  const ingredients = useAppSelector(
    (state) => state.ingredient.allIngredients
  );
  const dispatch = useAppDispatch();

  const dispatchAllIngredients = () => {
    dispatch(getAllIngredients());
  };

  return { dispatchAllIngredients, ingredients: ingredients.data };
};
