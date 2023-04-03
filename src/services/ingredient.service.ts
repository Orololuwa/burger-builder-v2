import { AxiosResponse } from "axios";
import { apiRoutes } from "core/routes/routes";
import { authInstance } from "lib/config/axios.config";
import { IIngredient } from "models/ingredient";

class IngredientsService {
  async getIngredients(): Promise<AxiosResponse<{ data: IIngredient[] }>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.get(apiRoutes.INGREDIENTS);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new IngredientsService();
