import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Content = (): JSX.Element => {
  return (
    <Box
      as={"main"}
      overflowX="auto"
      scrollBehavior={"smooth"}
      h={"calc(100vh - 4rem)"}
    >
      <Outlet />
    </Box>
  );
};

export default Content;
