import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Stack,
  Text,
  DrawerHeader,
  Icon,
  RadioGroup,
  Radio,
  Box,
  useToast,
  useColorModeValue,
  Center
} from "@chakra-ui/react";
import { useIngredients } from "core/hooks/use-ingredients";
import { useAppDispatch, useAppSelector } from "core/hooks/use-redux";
import { Add, ArrowLeft, Minus, Trash } from "iconsax-react";
import { IngredientType } from "lib/helpers/ingredient";
import { formatter } from "lib/utils";
import { BaseModalProps, IObjectGeneric } from "models/base";
import { useEffect, useState } from "react";
import addressService from "services/address.service";
import orderService from "services/orders.service";
import { getAllAddress } from "store/action-creators/address.actions";
import { ICreateOrder } from "./create-order.dto";

interface Props extends BaseModalProps {}

enum IDrawerState {
  CHECKOUT = "checkout",
  DELIVERY_ADDRESS = "delivery-address",
  NEW_ADDRESS = "new-address"
}

const initialAddressState = {
  city: "",
  country: "",
  houseNumber: "",
  state: "",
  street: "",
  zipCode: ""
};

const OrderSummary = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const addresses = useAppSelector((state) => state.address.allAddress);
  const {
    formattedIngredients,
    ingredientAdded,
    ingredientRemoved,
    setActivePack,
    duplicatePack,
    deletePack,
    IsDeletable,
    getTotalPrice,
    resetOrder
  } = useIngredients();

  useEffect(() => {
    dispatch(getAllAddress());
  }, []);

  // loading State
  const [loading, setLoading] = useState(false);

  // Radio State
  const [radioValue, setRadioValue] = useState("0");

  useEffect(() => {
    setRadioValue(
      addresses.data
        .find((address) => address.primaryAddress === true)
        ?.id.toString() as string
    );
  }, [addresses.data.length]);

  // Address State

  const [addressState, setAddressState] = useState(initialAddressState);

  const onAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAddressState((prevState) => ({ ...prevState, [name]: value }));
  };

  const createAddressHandler = async () => {
    try {
      setLoading(true);
      const res = await addressService.createAddress({
        ...addressState,
        zipCode: +addressState.zipCode
      });
      toast({
        position: "top",
        status: "success",
        description: res.data.message
      });
      await dispatch(getAllAddress());
      setLoading(false);
      setAddressState(initialAddressState);
      onCloseState();
    } catch (error) {
      toast({
        position: "top",
        status: "error",
        description: (error as any)?.response?.data?.message || "Error"
      });
      setLoading(false);
    }
  };

  // Pack functions
  const addToPack = (packNumber: number) => {
    setActivePack(packNumber);
    onCloseState();
  };

  const deletePackHandler = (packNumber: number) => {
    deletePack(packNumber);
  };

  // Drawer Component State
  const [drawerState, setDrawerState] = useState<IDrawerState>(
    IDrawerState.CHECKOUT
  );

  // Checkout
  const checkoutHandler = async () => {
    setLoading(true);
    try {
      const CreateOrderBody: ICreateOrder = {
        price: getTotalPrice(),
        addressId: +radioValue,
        ingredients: formattedIngredients
          .map((ingredients, index) => [
            ...Object.values(ingredients)
              .filter((ingredient) => ingredient.count)
              .map((ingredient) => ({
                packNumber: index + 1,
                menuItemId: ingredient.id,
                pricePurchased: +ingredient.price * ingredient.count,
                quantity: ingredient.count
              }))
          ])
          .reduce((arr, el) => {
            return arr.concat(el);
          }, [])
      };

      const res = await orderService.createOrder(CreateOrderBody);
      toast({
        position: "top",
        status: "success",
        description: res.data.message
      });
      setLoading(false);
      onCloseState();
      resetOrder();
    } catch (error) {
      toast({
        position: "top",
        status: "error",
        description: (error as any)?.response?.data?.message || "Error"
      });
      setLoading(false);
    }
  };

  const drawerComponents: IObjectGeneric<JSX.Element> = {
    [IDrawerState.CHECKOUT]: (
      <DrawerBody>
        <Grid
          pb="16"
          gridTemplateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(1, 1fr)"
          ]}
          gridGap={"5"}
        >
          <Stack bg="primary.500" rounded="lg" spacing={"4"}>
            {formattedIngredients.map((ingredients, index) => (
              <Stack key={index} spacing="3">
                <Flex justifyContent={"space-between"}>
                  <Heading fontSize={"md"}>Pack {index + 1}</Heading>
                  <Center
                    bg="#E53E3E12"
                    boxSize={"8"}
                    rounded="full"
                    cursor={IsDeletable ? "pointer" : "not-allowed"}
                    onClick={() => deletePackHandler(index)}
                  >
                    <Icon as={Trash} boxSize="5" color={"red.500"} />
                  </Center>
                </Flex>
                {Object.keys(ingredients)
                  .filter(
                    (ingredient) =>
                      ingredients[ingredient].count > 0 &&
                      ingredient !== IngredientType.BREAD_TOP &&
                      ingredient !== IngredientType.BREAD_BOTTOM
                  )
                  .map((ingredient, idx) => (
                    <Flex
                      alignItems={"center"}
                      justifyContent="space-between"
                      key={idx}
                    >
                      <Stack spacing="1">
                        <Text fontWeight={"sm"} textTransform="capitalize">
                          {`${ingredient.replace("-", " ")}`}
                        </Text>
                        <Text fontSize="xs" fontWeight={"light"}>
                          &#x20A6;
                          {`${formatter.format(
                            parseFloat(ingredients[ingredient].price) *
                              ingredients[ingredient].count
                          )}`}
                        </Text>
                      </Stack>
                      <Flex
                        alignItems="center"
                        gap="2"
                        background={useColorModeValue("gray.200", "gray.600")}
                        px="2"
                        py="1"
                        rounded={"2xl"}
                        fontSize="xs"
                      >
                        <Icon
                          as={Minus}
                          boxSize="4"
                          cursor="pointer"
                          onClick={() =>
                            ingredientRemoved(
                              ingredient as IngredientType,
                              index,
                              {
                                callBack: onCloseState
                              }
                            )
                          }
                        />
                        <Box>{ingredients[ingredient].count}</Box>
                        <Icon
                          as={Add}
                          boxSize="4"
                          cursor="pointer"
                          onClick={() =>
                            ingredientAdded(ingredient as IngredientType, index)
                          }
                        />
                      </Flex>
                    </Flex>
                  ))}
                <Flex
                  alignItems={"center"}
                  justifyContent="space-between"
                  py="2"
                >
                  <Flex
                    alignItems="center"
                    gap="1"
                    borderColor={"gray.400"}
                    borderWidth="thin"
                    px="3"
                    py="1"
                    rounded={"3xl"}
                    cursor="pointer"
                    onClick={() => addToPack(index)}
                  >
                    <Icon as={Add} boxSize="3" />
                    <Text fontSize={"xs"}>Add to pack</Text>
                  </Flex>
                  <Flex
                    alignItems="center"
                    gap="2"
                    borderColor={"gray.400"}
                    borderWidth="thin"
                    px="4"
                    py="2"
                    rounded={"xl"}
                    borderStyle="dashed"
                    cursor="pointer"
                    onClick={() => duplicatePack(index)}
                  >
                    <Text fontSize={"xs"}>Duplicate pack</Text>
                  </Flex>
                </Flex>
              </Stack>
            ))}
          </Stack>

          <Divider w="100%" />

          {addresses.data.length
            ? addresses.data
                .filter((address) => address.id === +radioValue)
                .map((address) => (
                  <Flex direction={"column"} key={address.id}>
                    <Text fontWeight={"medium"} textTransform="capitalize">
                      {`${address.houseNumber} ${address.street}, ${address.city} ${address.zipCode}. ${address.state}`}
                    </Text>
                  </Flex>
                ))
            : null}

          <Text
            fontWeight={"normal"}
            fontSize="sm"
            textTransform="capitalize"
            cursor={"pointer"}
            color={"orange.400"}
            _hover={{
              color(theme) {
                return theme.colors.orange[300];
              }
            }}
            onClick={() => setDrawerState(IDrawerState.DELIVERY_ADDRESS)}
          >
            Change address
          </Text>

          <Divider w="100%" />

          <Stack spacing={"2"} pb="10">
            <Flex alignItems={"center"} justifyContent="space-between">
              <Text fontWeight={"medium"} textTransform="capitalize">
                Sub Total
              </Text>
              <Heading as={"h4"} fontSize="lg" fontWeight={"normal"}>
                &#x20A6;
                {`${formatter.format(getTotalPrice())}`}
              </Heading>
            </Flex>
            <Flex alignItems={"center"} justifyContent="space-between">
              <Text fontWeight={"medium"} textTransform="capitalize">
                Delivery Fee
              </Text>
              <Heading as={"h4"} fontSize="lg" fontWeight={"normal"}>
                &#x20A6;
                {`${formatter.format(500)}`}
              </Heading>
            </Flex>
            <Flex alignItems={"center"} justifyContent="space-between">
              <Text fontWeight={"medium"} textTransform="capitalize">
                Total
              </Text>
              <Heading as={"h4"} fontSize="lg" fontWeight={"bold"}>
                &#x20A6;
                {`${formatter.format(getTotalPrice() + 500)}`}
              </Heading>
            </Flex>
          </Stack>
        </Grid>
        <Box
          pos={"fixed"}
          w="full"
          h="16"
          bottom="0"
          left="0"
          px="6"
          py="2"
          zIndex={"sticky"}
          background={"chakra-subtle-bg"}
        >
          <Button
            size={"md"}
            colorScheme="orange"
            px="6"
            w={"full"}
            onClick={checkoutHandler}
            isLoading={loading}
          >
            Checkout
          </Button>
        </Box>
      </DrawerBody>
    ),

    [IDrawerState.DELIVERY_ADDRESS]: (
      <DrawerBody pos={"relative"} pt="10">
        <Text
          py="2"
          pos={"fixed"}
          w="full"
          h="10"
          top="14"
          left="0"
          px="6"
          zIndex={"sticky"}
          background={"chakra-subtle-bg"}
          fontWeight={"normal"}
          fontSize="sm"
          textTransform="capitalize"
          cursor={"pointer"}
          color={"orange.400"}
          _hover={{
            color(theme) {
              return theme.colors.orange[300];
            }
          }}
          onClick={() => setDrawerState(IDrawerState.NEW_ADDRESS)}
        >
          + new address
        </Text>
        <RadioGroup
          colorScheme={"orange"}
          onChange={setRadioValue}
          value={radioValue}
        >
          <Stack>
            {addresses.data.length
              ? addresses.data.map((address) => (
                  <Box key={address.id}>
                    <Radio
                      fontWeight={"medium"}
                      textTransform="capitalize"
                      key={address.id}
                      value={address.id.toString()}
                      py="4"
                    >
                      {`${address.houseNumber} ${address.street}, ${address.city} ${address.zipCode}. ${address.state}`}
                    </Radio>
                    <Divider w="100%" />
                  </Box>
                ))
              : null}
          </Stack>
        </RadioGroup>
      </DrawerBody>
    ),

    [IDrawerState.NEW_ADDRESS]: (
      <DrawerBody>
        <form>
          <Stack spacing={"2"} py="2">
            <FormControl>
              <FormLabel>House, Suite or Flat</FormLabel>
              <Input
                type="text"
                value={addressState.houseNumber}
                onChange={onAddressChange}
                name="houseNumber"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Street</FormLabel>
              <Input
                type="text"
                value={addressState.street}
                onChange={onAddressChange}
                name="street"
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                value={addressState.city}
                onChange={onAddressChange}
                name="city"
              />
            </FormControl>
            <FormControl>
              <FormLabel>State</FormLabel>
              <Input
                type="text"
                value={addressState.state}
                onChange={onAddressChange}
                name="state"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                type="text"
                value={addressState.country}
                onChange={onAddressChange}
                name="country"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Zip Code</FormLabel>
              <Input
                type="text"
                value={addressState.zipCode}
                onChange={onAddressChange}
                name="zipCode"
              />
            </FormControl>
            <Box py="10">
              <Button
                size={"md"}
                colorScheme="orange"
                px="6"
                w={"full"}
                onClick={createAddressHandler}
                isLoading={loading}
              >
                Add Address
              </Button>
            </Box>
          </Stack>
        </form>
      </DrawerBody>
    )
  };

  const onCloseState = () => {
    drawerState === IDrawerState.CHECKOUT
      ? onClose()
      : drawerState === IDrawerState.DELIVERY_ADDRESS
      ? setDrawerState(IDrawerState.CHECKOUT)
      : drawerState === IDrawerState.NEW_ADDRESS
      ? setDrawerState(IDrawerState.CHECKOUT)
      : null;
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md" trapFocus={false}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader display={"inline-flex"} alignItems="center" gap={"4"}>
          <Icon
            as={ArrowLeft}
            boxSize="6"
            cursor={"pointer"}
            onClick={onCloseState}
          />
          <Heading fontSize={"xl"} textTransform="capitalize">
            {drawerState.replace("-", " ")}
          </Heading>
        </DrawerHeader>
        {drawerComponents[drawerState]}
      </DrawerContent>
    </Drawer>
  );
};

export default OrderSummary;
