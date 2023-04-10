import { useOrders } from "core/hooks/use-orders";
import { useEffect } from "react";

const Orders = () => {
  const { allOrders, getOrders } = useOrders();

  useEffect(() => {
    getOrders({
      page: allOrders.pagination.currentPage,
      perpage: allOrders.pagination.pageSize
    });
  }, []);

  return <div>Orders</div>;
};

export default Orders;
