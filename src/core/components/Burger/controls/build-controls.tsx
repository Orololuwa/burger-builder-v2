import classes from "./build-controls.module.css";
import BuildControl from "./build-control/build-control";
import { IObject } from "models/base";
import { IngredientType } from "lib/helpers/ingredient";
import { formatter } from "lib/utils";
import { useIngredients } from "core/hooks/use-ingredients";

const controls = [
  { label: "Meat", type: IngredientType.MEAT },
  { label: "Bacon", type: IngredientType.BACON },
  { label: "Cheese", type: IngredientType.CHEESE },
  { label: "Salad", type: IngredientType.SALAD }
];

interface Props {
  price: number;
  ingredientAdded: (type: IngredientType, index: number) => void;
  ingredientRemoved: (type: IngredientType, index: number) => void;
  disabled: IObject;
  purchasable: boolean;
  ordered: () => void;
}

const BuildControls = (props: Props) => {
  const { activePack } = useIngredients();

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price:{" "}
        <strong>
          &#x20A6;
          {formatter.format(parseFloat(props.price.toFixed(2)))}
        </strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type, activePack)}
          removed={() => props.ingredientRemoved(ctrl.type, activePack)}
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
};

export default BuildControls;
