import { Box, Grid, useDisclosure } from "@chakra-ui/react";
import Burger from "core/components/burger/burger";
import BuildControls from "core/components/burger/controls/build-controls";
import OrderSummary from "core/components/orders/order-summary";
import { useIngredients } from "core/hooks/use-ingredients";
import { IngredientType } from "lib/helpers/ingredient";
import { IObject, IObjectGeneric } from "models/base";
import { IIngredientObject } from "models/ingredient";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { dispatchAllIngredients, ingredients: data } = useIngredients();
  useEffect(() => {
    dispatchAllIngredients();
  }, []);

  const initialIngredientsState = data.reduce((accumulator: any, curr) => {
    accumulator[curr.name] = {
      count:
        curr.name === IngredientType.BREAD_TOP ||
        curr.name === IngredientType.BREAD_BOTTOM
          ? 1
          : 0,
      price: curr.price,
      visible: !(
        curr.name === IngredientType.BREAD_TOP ||
        curr.name === IngredientType.BREAD_BOTTOM
      )
    };

    return accumulator;
  }, {});

  const [ingredients, setIngredients] = useState<
    IObjectGeneric<IIngredientObject>
  >(initialIngredientsState);

  const disabledInfo: IObject = {
    ...ingredients
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key].count <= 0;
  }

  const ingredientAdded = (type: IngredientType) => {
    setIngredients((prevState) => {
      const currValue = prevState[type];
      return {
        ...prevState,
        [type]: { ...currValue, count: currValue.count + 1 }
      };
    });
  };

  const ingredientRemoved = (type: IngredientType) => {
    setIngredients((prevState) => {
      const currValue = prevState[type];
      return {
        ...prevState,
        [type]: {
          ...currValue,
          count: currValue.count < 0 ? 0 : currValue.count - 1
        }
      };
    });
  };

  const getPrice = () => {
    return Object.values(ingredients).reduce(
      (acc: number, curr) => acc + curr.count * parseFloat(curr.price),
      0
    );
  };

  const purchasable = () => {
    return (
      getPrice() >
      parseFloat(ingredients[IngredientType.BREAD_TOP]?.price) +
        parseFloat(ingredients[IngredientType.BREAD_BOTTOM]?.price)
    );
  };

  useEffect(() => {
    setIngredients(initialIngredientsState);
  }, [data.length]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid
        minH="calc(100vh - 4rem)"
        p={3}
        gridTemplateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)"
        ]}
        gridGap={"5"}
      >
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={ingredientAdded}
          ingredientRemoved={ingredientRemoved}
          disabled={disabledInfo}
          purchasable={purchasable()}
          ordered={onOpen}
          price={getPrice()}
        />
      </Grid>
      <OrderSummary
        isOpen={isOpen}
        onClose={onClose}
        ingredients={ingredients}
      />
    </Box>
  );
};

export default Dashboard;
