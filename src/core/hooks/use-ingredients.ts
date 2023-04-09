import { useAppDispatch, useAppSelector } from "core/hooks/use-redux";
import { IngredientType } from "lib/helpers/ingredient";
import { IObjectGeneric } from "models/base";
import { IIngredientObject } from "models/ingredient";
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

  const getPrice = (ingredient: IObjectGeneric<IIngredientObject>) => {
    return Object.values(ingredient).reduce(
      (acc: number, curr) => acc + curr.count * parseFloat(curr.price),
      0
    );
  };

  const getTotalPrice = () => {
    return formattedIngredients.reduce(
      (acc, ingredient) => acc + getPrice(ingredient),
      0
    );
  };

  const ingredientAdded = (name: IngredientType, index: number) => {
    dispatch(ingredientActions.increaseIngredientCount({ name, index }));
  };

  const ingredientRemoved = (
    name: IngredientType,
    index: number,
    options?: Partial<{ callBack: () => void }>
  ) => {
    dispatch(ingredientActions.decreaseIngredientCount({ name, index }));
    const ingredient = formattedIngredients[index];
    if (
      formattedIngredients.length > 1 &&
      getPrice(ingredient) ===
        parseFloat(ingredient[name].price) +
          parseFloat(ingredient[IngredientType.BREAD_TOP].price) +
          parseFloat(ingredient[IngredientType.BREAD_BOTTOM].price)
    ) {
      deletePack(index);
    }
    if (
      formattedIngredients.length === 1 &&
      getPrice(ingredient) ===
        parseFloat(ingredient[name].price) +
          parseFloat(ingredient[IngredientType.BREAD_TOP].price) +
          parseFloat(ingredient[IngredientType.BREAD_BOTTOM].price)
    ) {
      if (options && options.callBack) {
        options.callBack();
      }
    }
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

  const resetOrder = () => {
    dispatch(ingredientActions.resetOrder());
    dispatch(getAllIngredients());
  };

  return {
    dispatchAllIngredients,
    ingredients: ingredients.data,
    getTotalPrice,
    ingredientAdded,
    ingredientRemoved,
    formattedIngredients,
    activePack,
    setActivePack,
    duplicatePack,
    deletePack,
    IsDeletable,
    resetOrder
  };
};
