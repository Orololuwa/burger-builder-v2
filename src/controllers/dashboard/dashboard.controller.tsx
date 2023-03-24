import { Box, Grid } from "@chakra-ui/react";
import Burger from "core/components/burger/burger";
import BuildControls from "core/components/burger/controls/build-controls";
import { IngredientType } from "lib/helpers/ingredients";
import { IObject } from "models/base";
import { useState } from "react";

const initialIngredientsState = {
  [IngredientType.BACON]: 0,
  [IngredientType.CHEESE]: 0,
  [IngredientType.SALAD]: 0,
  [IngredientType.MEAT]: 0
};

const Dashboard = () => {
  const [ingredients, setIngredients] = useState(initialIngredientsState);

  const disabledInfo: IObject = {
    ...ingredients
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  const ingredientAdded = (type: IngredientType) => {
    setIngredients((prevState) => {
      const updatedCount: number = (prevState as IObject)[type] + 1;
      return { ...prevState, [type]: updatedCount };
    });
  };

  const ingredientRemoved = (type: IngredientType) => {
    setIngredients((prevState) => {
      const updatedCount: number = (prevState as IObject)[type] - 1;

      return { ...prevState, [type]: updatedCount < 0 ? 0 : updatedCount };
    });
  };

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
          purchasable={true}
          ordered={() => {}}
          price={500}
        />
      </Grid>
    </Box>
  );
};

export default Dashboard;
