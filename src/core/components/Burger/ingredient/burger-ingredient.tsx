import { IngredientType } from "lib/helpers/ingredients";
import classes from "./ingredient.module.css";

interface Props {
  type: IngredientType;
}

const BurgerIngredient = (props: Props) => {
  let ingredient = null;

  switch (props.type) {
    case IngredientType.BREAD_BOTTOM:
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case IngredientType.BREAD_TOP:
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case IngredientType.MEAT:
      ingredient = <div className={classes.Meat}></div>;
      break;
    case IngredientType.CHEESE:
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case IngredientType.SALAD:
      ingredient = <div className={classes.Salad}></div>;
      break;
    case IngredientType.BACON:
      ingredient = <div className={classes.Bacon}></div>;
      break;
    default:
      ingredient = null;
  }

  return ingredient;
};

export default BurgerIngredient;
