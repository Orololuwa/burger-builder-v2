import { AxiosResponse } from "axios";
import { authInstance } from "lib/config/axios.config";
import { ILogin } from "models/auth";

class AuthService {
  async login(body: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<ILogin>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.post("/auth/login", body);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default new AuthService();
