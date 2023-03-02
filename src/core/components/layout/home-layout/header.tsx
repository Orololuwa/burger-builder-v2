import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link as ChakraLink,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Icon
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { ColorModeSwitcher } from "core/components/color-mode-switcher";
import { Link, useNavigate } from "react-router-dom";
import { appRoutes } from "core/routes/routes";
import { Logout } from "iconsax-react";
import { useLogout } from "core/hooks/use-logout";

const Links = [
  {
    name: "Dashboard",
    to: appRoutes.DASHBOARD
  },
  {
    name: "Orders",
    to: appRoutes.ORDERS
  },
  {
    name: "Users",
    to: appRoutes.USERS
  }
];

const NavLink = ({ children, to }: { children: ReactNode; to: string }) => (
  <ChakraLink
    as={Link}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700")
    }}
    to={to}
  >
    {children}
  </ChakraLink>
);

export default function HeaderNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const { logoutHandler } = useLogout();

  return (
    <Box bg={useColorModeValue("orange.200", "orange.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box cursor={"pointer"} onClick={() => navigate(appRoutes.HOME)}>
            Logo
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                src={
                  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                }
              />
            </MenuButton>
            <MenuList>
              <MenuItem color={"red.500"} onClick={logoutHandler}>
                <Text pr={"2"}>Logout</Text>
                <Icon as={Logout} boxSize="5" />
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
