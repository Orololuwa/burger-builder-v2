import { IngredientType } from "lib/helpers/ingredient";
import { IObjectGeneric } from "models/base";
import BurgerIngredient from "./ingredient/burger-ingredient";
import classes from "./burger.module.css";
import { IIngredientObject } from "models/ingredient";

interface Props {
  ingredients: IObjectGeneric<IIngredientObject>;
}

const Burger = (props: Props) => {
  let transformedIngredients: any = Object.keys(props.ingredients)
    .filter((ingredient: string) => {
      return (
        ingredient !== IngredientType.BREAD_TOP &&
        ingredient !== IngredientType.BREAD_BOTTOM
      );
    })
    .map((ingredient: string) => {
      return [...Array(props.ingredients[ingredient].count)].map((_, i) => {
        return (
          <BurgerIngredient
            key={ingredient + i}
            type={ingredient as unknown as IngredientType}
          />
        );
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Start Adding Ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={IngredientType.BREAD_TOP} />
      {transformedIngredients}
      <BurgerIngredient type={IngredientType.BREAD_BOTTOM} />
    </div>
  );
};

export default Burger;
