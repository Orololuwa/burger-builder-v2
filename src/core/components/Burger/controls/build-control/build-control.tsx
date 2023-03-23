import classes from "./build-control.module.css";

interface Props {
  label: string;
  removed: () => void;
  added: () => void;
  disabled: boolean;
}

const BuildControl = (props: Props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled}
    >
      Less
    </button>
    <button className={classes.More} onClick={props.added}>
      More
    </button>
  </div>
);

export default BuildControl;
