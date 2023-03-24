import classes from "./build-controls.module.css";
import BuildControl from "./build-control/build-control";
import { IObject } from "models/base";
import { IngredientType } from "lib/helpers/ingredient";

const controls = [
  { label: "Salad", type: IngredientType.SALAD },
  { label: "Bacon", type: IngredientType.BACON },
  { label: "Cheese", type: IngredientType.CHEESE },
  { label: "Meat", type: IngredientType.MEAT }
];

interface Props {
  price: number;
  ingredientAdded: (type: IngredientType) => void;
  ingredientRemoved: (type: IngredientType) => void;
  disabled: IObject;
  purchasable: boolean;
  ordered: () => void;
}

const BuildControls = (props: Props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      ORDER NOW!
    </button>
  </div>
);

export default BuildControls;
