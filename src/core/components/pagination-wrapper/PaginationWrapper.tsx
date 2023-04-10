import {
  Pagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
  PaginationSeparator
} from "@ajna/pagination";
import { HStack, Icon } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

const PaginationWrapper = ({
  p,
  pages,
  jumpSize,
  isDisabled,
  pagesCount,
  currentPage,
  handlePageChange
}: any) => {
  return (
    <>
      <HStack
        p={p ?? "10px 20px"}
        justifyContent="space-between"
        borderRadius="0px 0px 16px 16px"
      >
        <HStack>
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            isDisabled={isDisabled}
            onPageChange={handlePageChange}
          >
            <PaginationContainer
              p={4}
              w="full"
              align="center"
              justify="space-between"
            >
              <PaginationPrevious
                mr="8px"
                boxSize="32px"
                _focus={{ shadow: "0 0 0 3px var(--focusColor)" }}
                _active={{ bg: "transparent" }}
                _hover={{
                  bg: "transparent"
                }}
                bg="transparent"
                border={"2px"}
                size={"sm"}
              >
                <Icon as={ChevronLeftIcon} w={5} h={5} />
              </PaginationPrevious>

              <PaginationPageGroup
                isInline
                align="center"
                separator={
                  <PaginationSeparator
                    border="1px solid #DFE3E8"
                    color="brand.grayScale"
                    bg="transparent"
                    fontSize="sm"
                    boxSize="32px"
                    jumpSize={jumpSize ?? 4}
                    _active={{ bg: "transparent" }}
                    _hover={{
                      bg: "transparent"
                    }}
                    _focus={{
                      borderColor: "transparent",
                      shadow: "0 0 0 3px var(--focusColor)"
                    }}
                  />
                }
              >
                {pages.map((page: any) => (
                  <PaginationPage
                    boxSize="32px"
                    bg="transparent"
                    border="2px"
                    key={`pagination_page_${page}`}
                    page={page}
                    fontSize="sm"
                    color="brand.grayScale"
                    _active={{ bg: "orange.500", color: "white" }}
                    _hover={{
                      borderColor: "orange.500",
                      bg: "orange.500",
                      color: "white"
                    }}
                    _focus={{
                      borderColor: "orange.500",
                      background: "orange.500",
                      shadow: "0 0 0 3px var(--focusColor)"
                    }}
                    _current={{
                      borderColor: "orange.500",
                      bg: "orange.500",
                      fontSize: "sm",
                      boxSize: "32px",
                      color: "#fff",
                      _hover: {
                        borderColor: "#DFE3E8",
                        bg: "transparent",
                        color: "black"
                      }
                    }}
                  />
                ))}
              </PaginationPageGroup>

              <PaginationNext
                size={"sm"}
                ml="8px"
                boxSize={"32px"}
                _active={{ bg: "transparent" }}
                _focus={{ shadow: "0 0 0 3px var(--focusColor)" }}
                _hover={{
                  bg: "transparent"
                }}
                bg="transparent"
                border={"2px"}
                p="0"
              >
                <Icon as={ChevronRightIcon} w={5} h={5} />
              </PaginationNext>
            </PaginationContainer>
          </Pagination>
        </HStack>
      </HStack>
    </>
  );
};

export default PaginationWrapper;
