import { AuthService } from "../services/auth.service";
export const authServiceProvider = (container) => {
  return new AuthService(container.axios);
}