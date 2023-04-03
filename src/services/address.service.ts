import { AxiosResponse } from "axios";
import { apiRoutes } from "core/routes/routes";
import { authInstance } from "lib/config/axios.config";
import { IAddress, ICreateAddres } from "models/address";

class AddressService {
  async getAddress(): Promise<AxiosResponse<{ data: IAddress[] }>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.get(apiRoutes.ADDRESS);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async createAddress(
    body: ICreateAddres
  ): Promise<AxiosResponse<{ message: string }>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.post(apiRoutes.ADDRESS, body);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new AddressService();
