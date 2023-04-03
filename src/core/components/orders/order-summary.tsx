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
  Select,
  Stack,
  Text,
  DrawerHeader,
  Icon,
  RadioGroup,
  Radio,
  Box,
  useToast
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "core/hooks/use-redux";
import { ArrowLeft } from "iconsax-react";
import { formatter } from "lib/utils";
import { BaseModalProps, IObjectGeneric } from "models/base";
import { IIngredientObject } from "models/ingredient";
import { useEffect, useState } from "react";
import addressService from "services/address.service";
import { getAllAddress } from "store/action-creators/address.actions";

interface Props extends BaseModalProps {
  ingredients: IObjectGeneric<IIngredientObject>;
}

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

const OrderSummary = ({ isOpen, onClose, ingredients }: Props) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const profile = useAppSelector((state) => state.auth.profile);
  const addresses = useAppSelector((state) => state.address.allAddress);

  const getTotalPrice = () => {
    return Object.values(ingredients).reduce(
      (acc: number, curr) => acc + curr.count * parseFloat(curr.price),
      0
    );
  };

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

  // Drawer Component State
  const [drawerState, setDrawerState] = useState<IDrawerState>(
    IDrawerState.CHECKOUT
  );

  const drawerComponents: any = {
    [IDrawerState.CHECKOUT]: (
      <DrawerBody>
        <Grid
          p={3}
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
          <Stack bg="primary.500" rounded="lg" spacing={"4"} py="4">
            <Heading textTransform={"capitalize"} py="2" fontSize={"lg"}>
              Summary
            </Heading>
            <Divider w="100%" mx="5%" />
            {Object.keys(ingredients)
              .filter((ingredient) => ingredients[ingredient].count > 0)
              .map((ingredient, idx) => (
                <Flex
                  alignItems={"center"}
                  justifyContent="space-between"
                  key={idx}
                >
                  <Text fontWeight={"medium"} textTransform="capitalize">
                    {`${ingredient.replace("-", " ")} (${
                      ingredients[ingredient].count
                    })`}
                  </Text>
                  <Heading as={"h4"} fontSize="lg" fontWeight={"bold"}>
                    &#x20A6;
                    {`${formatter.format(
                      parseFloat(ingredients[ingredient].price) *
                        ingredients[ingredient].count
                    )}`}
                  </Heading>
                </Flex>
              ))}

            <Divider w="100%" mx="5%" />

            <Flex alignItems={"center"} justifyContent="space-between" pb="4">
              <Text fontWeight={"medium"} textTransform="capitalize">
                Total
              </Text>
              <Heading as={"h4"} fontSize="lg" fontWeight={"bold"}>
                &#x20A6;
                {`${formatter.format(getTotalPrice())}`}
              </Heading>
            </Flex>
          </Stack>
          <Stack bg="primary.500" rounded="lg" spacing={"4"} py="4">
            <Heading textTransform={"capitalize"} py="2" fontSize={"lg"}>
              Delivery Details
            </Heading>
            <Flex direction={"column-reverse"}>
              <Text fontWeight={"medium"} textTransform="capitalize">
                {profile?.data?.name}
              </Text>
              <Heading as={"h4"} fontSize="md" fontWeight={"semibold"}>
                Name
              </Heading>
            </Flex>
            <Flex direction={"column-reverse"}>
              <Text fontWeight={"medium"} textTransform="capitalize">
                {profile?.data?.phone}
              </Text>
              <Heading as={"h4"} fontSize="md" fontWeight={"semibold"}>
                Phone
              </Heading>
            </Flex>
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

          <FormControl>
            <FormLabel>Delivery Method</FormLabel>
            <Select>
              <option value={"standard"}>Standard</option>
              <option value={"express"}>Express</option>
            </Select>
          </FormControl>
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
          <Button size={"md"} colorScheme="orange" px="6" w={"full"}>
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
    <Drawer isOpen={isOpen} onClose={onClose} size="md">
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
