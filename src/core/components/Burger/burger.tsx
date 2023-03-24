import { IngredientType } from "lib/helpers/ingredient";
import { IObject } from "models/base";
import BurgerIngredient from "./ingredient/burger-ingredient";
import classes from "./burger.module.css";

interface Props {
  ingredients: IObject;
}

const Burger = (props: Props) => {
  let transformedIngredients: any = Object.keys(props.ingredients)
    .map((ingredient: string) => {
      return [...Array(props.ingredients[ingredient])].map((_, i) => {
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
