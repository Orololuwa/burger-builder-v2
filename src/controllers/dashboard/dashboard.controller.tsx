import { Box, Grid, useDisclosure } from "@chakra-ui/react";
import Burger from "core/components/burger/burger";
import BuildControls from "core/components/burger/controls/build-controls";
import OrderSummary from "core/components/orders/order-summary";
import { useIngredients } from "core/hooks/use-ingredients";
import { IngredientType } from "lib/helpers/ingredient";
import { IObject } from "models/base";
import { useEffect } from "react";

const Dashboard = () => {
  const {
    currIngredientIndex,
    dispatchAllIngredients,
    formattedIngredients,
    ingredientAdded,
    ingredientRemoved
  } = useIngredients();

  useEffect(() => {
    dispatchAllIngredients();
  }, []);

  const ingredients = formattedIngredients[currIngredientIndex];

  const disabledInfo: IObject = {
    ...ingredients
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key].count <= 0;
  }

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
      <OrderSummary isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Dashboard;
