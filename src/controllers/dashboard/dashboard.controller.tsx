import { Box, Grid } from "@chakra-ui/react";
import Burger from "core/components/burger/burger";
import BuildControls from "core/components/burger/controls/build-controls";
import { IngredientType } from "lib/helpers/ingredients";
import { IObject } from "models/base";

const ingredients = {
  [IngredientType.BACON]: 2,
  [IngredientType.CHEESE]: 2,
  [IngredientType.SALAD]: 2,
  [IngredientType.MEAT]: 2
};

const Dashboard = () => {
  const disabledInfo: IObject = {
    ...ingredients
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

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
          ingredientAdded={() => {}}
          ingredientRemoved={() => {}}
          disabled={disabledInfo}
          purchasable={true}
          ordered={() => {}}
          price={500}
        />
      </Grid>
    </Box>
  );
};

export default Dashboard;
