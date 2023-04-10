import PaginationWrapper from "core/components/pagination-wrapper/PaginationWrapper";
import { usePagination } from "@ajna/pagination";
import { useOrders } from "core/hooks/use-orders";
import { useEffect } from "react";

const Orders = () => {
  const { allOrders, getOrders } = useOrders();

  const { pagination: paginationData } = allOrders;

  const { currentPage, setCurrentPage, pagesCount, pages, isDisabled, offset } =
    usePagination({
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
      perpage: pagesCount
    });
  }, [currentPage]);

  return (
    <div>
      Orders
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
    </div>
  );
};

export default Orders;
