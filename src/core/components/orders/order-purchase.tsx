import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { formatter } from "lib/utils";
import { IObjectGeneric } from "models/base";
import { MenuItemPurchase } from "models/orders";

export const OrderPurchase = ({
  menuItemPurchase
}: {
  menuItemPurchase: MenuItemPurchase[];
}) => {
  const getItemPurchaseObject = menuItemPurchase.reduce(
    (acc: IObjectGeneric<MenuItemPurchase[]>, curr) => {
      const { packNumber, ...rest } = curr;
      const currObjArr: MenuItemPurchase[] = [];
      if (packNumber in acc) {
        currObjArr.push(...acc[packNumber]);
      }
      currObjArr.push({ ...rest, packNumber });
      acc[packNumber] = currObjArr;
      return acc;
    },
    {}
  );

  return (
    <Stack spacing="3" whiteSpace={"nowrap"}>
      {Object.keys(getItemPurchaseObject).map((item) => {
        return (
          <Flex
            key={item}
            gap="2"
            alignItems={"flex-start"}
            justifyContent="stretch"
          >
            <Text>{`Pack ${item}:`}</Text>
            {getItemPurchaseObject[item].map((el) => (
              <Flex
                key={el.id}
                gap="1"
                border={"1px"}
                borderColor={useColorModeValue("gray.700", "gray.200")}
                py="1"
                px="2"
                bg="transparent"
              >
                <Stack spacing={"0"}>
                  <Text>{el.menuItem?.name}</Text>
                  <Text fontSize={"sm"}>
                    &#x20A6;
                    {`${formatter.format(Number(el?.pricePurchased) || 0)}`}
                  </Text>
                </Stack>
                <Text>({el.quantity})</Text>
              </Flex>
            ))}
          </Flex>
        );
      })}
    </Stack>
  );
};
