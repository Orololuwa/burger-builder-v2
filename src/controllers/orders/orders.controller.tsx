import PaginationWrapper from "core/components/pagination-wrapper/PaginationWrapper";
import { usePagination } from "@ajna/pagination";
import { useOrders } from "core/hooks/use-orders";
import { useEffect } from "react";
import { LoadingTable } from "core/components/loading";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
  Text,
  Box,
  Flex,
  useColorModeValue
} from "@chakra-ui/react";
import {
  formatDateToUsersLocale,
  formatter,
  formatTimeToUsersLocale
} from "lib/utils";
import { OrderPurchase } from "core/components/orders/order-purchase";

const headers = ["Order Id", "Price", "Address", "Item", "Date Created"];

const Orders = () => {
  const { allOrders, getOrders } = useOrders();

  const { pagination: paginationData } = allOrders;

  const {
    currentPage,
    setCurrentPage,
    pagesCount,
    pages,
    isDisabled,
    offset,
    pageSize
  } = usePagination({
    initialState: { currentPage: 1, pageSize: paginationData.pageSize },
    total: paginationData.total,
    limits: {
      inner: 2,
      outer: 1
    }
  });

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
    setTimeout(() => {
      window.scrollTo({ top: 10, behavior: "smooth" });
    }, 500);
  };

  useEffect(() => {
    getOrders({
      page: currentPage,
      perpage: pageSize
    });
  }, [currentPage]);

  return (
    <Box maxW={"3xl"} px={["4", "4", "8"]} py={["4", "4", "8"]}>
      {!!allOrders.data.length && !allOrders.loading ? (
        <Table variant="simple">
          <Thead textColor={"gray.900"}>
            <Tr>
              {headers.map((el, idx) => (
                <Th
                  key={idx}
                  textTransform="capitalize"
                  color={useColorModeValue("gray.900", "gray.400")}
                  fontSize={"md"}
                  py="4"
                  whiteSpace={"nowrap"}
                >
                  {el}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {allOrders.data.map((el) => (
              <Tr key={el.id}>
                <Td>#{el?.id || ""}</Td>
                <Td whiteSpace={"nowrap"}>
                  &#x20A6;
                  {` ${formatter.format(el?.price || 0)}`}
                </Td>
                <Td>
                  <Flex direction={"column"}>
                    <Text
                      fontWeight={"medium"}
                      textTransform="capitalize"
                      whiteSpace={"nowrap"}
                    >
                      {el?.address
                        ? `${el?.address?.houseNumber} ${el?.address?.street}, ${el?.address?.city} ${el?.address?.zipCode}. ${el?.address?.state}`
                        : ""}
                    </Text>
                  </Flex>
                </Td>
                <Td>
                  {el.menuItemPurchase && el.menuItemPurchase.length ? (
                    <OrderPurchase menuItemPurchase={el.menuItemPurchase} />
                  ) : null}
                </Td>
                <Td>
                  <Stack>
                    <Text color={"gray.500"} fontSize="sm">
                      {formatDateToUsersLocale(el.createdAt)}
                    </Text>
                    <Text color={"gray.500"} fontSize="sm">
                      {formatTimeToUsersLocale(el.createdAt)}
                    </Text>
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : null}
      {!allOrders.data.length && !allOrders.loading ? (
        <div>No Data...</div>
      ) : null}
      {allOrders.loading ? (
        <LoadingTable headers={headers} pageSize={10} />
      ) : null}
      <PaginationWrapper
        pages={pages}
        offset={offset}
        isDisabled={isDisabled}
        pagesCount={pagesCount}
        currentPage={currentPage}
        size={paginationData.pageSize}
        handlePageChange={handlePageChange}
        totalDataCount={paginationData.total}
      />
    </Box>
  );
};

export default Orders;
