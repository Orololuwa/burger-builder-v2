import { AxiosResponse } from "axios";
import { apiRoutes } from "core/routes/routes";
import { authInstance } from "lib/config/axios.config";
import { IIngredient } from "models/ingredient";
import { ICreateOrder } from "core/components/orders/create-order.dto";

class IngredientsService {
  async getOrders(): Promise<AxiosResponse<{ data: IIngredient[] }>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.get(apiRoutes.ORDERS);
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
