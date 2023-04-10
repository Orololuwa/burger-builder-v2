import { AxiosResponse } from "axios";
import { apiRoutes } from "core/routes/routes";
import { authInstance } from "lib/config/axios.config";
import { ICreateOrder } from "core/components/orders/create-order.dto";
import { IOrderRoot } from "models/orders";
import { IPaginationParams } from "models/base";

class IngredientsService {
  async getOrders(
    params: IPaginationParams
  ): Promise<AxiosResponse<IOrderRoot>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.get(apiRoutes.ORDERS, { params });
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async createOrder(
    body: ICreateOrder
  ): Promise<AxiosResponse<{ message: string }>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.post(apiRoutes.ORDERS, body);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new IngredientsService();
