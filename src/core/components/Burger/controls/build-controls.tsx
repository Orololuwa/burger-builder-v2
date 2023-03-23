import classes from "./build-controls.module.css";
import BuildControl from "./build-control/build-control";
import { IObject } from "models/base";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

interface Props {
  price: number;
  ingredientAdded: (type: string) => void;
  ingredientRemoved: (type: string) => void;
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
