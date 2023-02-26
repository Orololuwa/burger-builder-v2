import { AxiosResponse } from "axios";
import { publicInstance } from "lib/config/axios.config";
import { ILogin } from "models/auth";

class AuthService {
  async login(body: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<ILogin>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await publicInstance.post("/auth/signin", body);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default new AuthService();
