import { Box, Grid } from "@chakra-ui/react";
import Burger from "core/components/Burger/burger";
import { IngredientType } from "lib/helpers/ingredients";

const ingredients = {
  [IngredientType.BACON]: 2,
  [IngredientType.CHEESE]: 2,
  [IngredientType.SALAD]: 2,
  [IngredientType.MEAT]: 2
};

const Dashboard = () => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <Burger ingredients={ingredients} />
      </Grid>
    </Box>
  );
};

export default Dashboard;
