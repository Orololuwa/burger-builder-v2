import { useAppDispatch, useAppSelector } from "core/hooks/use-redux";
import { IngredientType } from "lib/helpers/ingredient";
import { useMemo } from "react";
import { getAllIngredients } from "store/action-creators/ingredient.action";
import { ingredientActions } from "store/reducers/ingredient.reducers";

export const useIngredients = () => {
  const ingredients = useAppSelector(
    (state) => state.ingredient.allIngredients
  );
  const activePack = useAppSelector((state) => state.ingredient.activePack);
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

  const setActivePack = (packNumber: number) => {
    dispatch(ingredientActions.setActivePack(packNumber));
  };

  const duplicatePack = (packNumber: number) => {
    dispatch(ingredientActions.duplicatePack(packNumber));
  };

  const deletePack = (packNumber: number) => {
    dispatch(ingredientActions.deletePack(packNumber));
  };

  const IsDeletable = useMemo(() => {
    return formattedIngredients.length > 1;
  }, [formattedIngredients.length]);

  return {
    dispatchAllIngredients,
    ingredients: ingredients.data,
    ingredientAdded,
    ingredientRemoved,
    formattedIngredients,
    activePack,
    setActivePack,
    duplicatePack,
    deletePack,
    IsDeletable
  };
};
