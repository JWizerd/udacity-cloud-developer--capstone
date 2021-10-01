import { FilesService } from "../services/files.service";
export const filesServiceProvider = (container) => {
  return new FilesService(container.axios);
}