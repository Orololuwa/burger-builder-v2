import {
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";

export const LoadingText = () => <div>loading...</div>;

export const LoadingTable = ({
  pageSize,
  headers
}: {
  pageSize: number;
  headers: string[];
}) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead textColor={"gray.900"}>
          <Tr>
            {headers.map((el, idx) => (
              <Th
                key={idx}
                textTransform="capitalize"
                color="gray.900"
                fontSize={"md"}
                py="4"
                pl="0"
              >
                {el}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {Array.from(Array(pageSize).keys()).map((el) => (
            <Tr key={el}>
              {headers.map((el) => (
                <Td key={el} pl="0">
                  <Skeleton width="100%" height="30px" />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
