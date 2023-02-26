import { AxiosResponse } from "axios";
import { apiRoutes } from "core/routes/routes";
import { publicInstance } from "lib/config/axios.config";
import { ILogin } from "models/auth";

class AuthService {
  async login(body: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<ILogin>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await publicInstance.post(apiRoutes.SIGN_IN, body);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default new AuthService();
