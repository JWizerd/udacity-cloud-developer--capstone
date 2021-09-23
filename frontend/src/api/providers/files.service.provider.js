import FilesService from "../services/files.service";
export const fileServiceProvider = (container) => {
  container.bind('files',  new FilesService(container.axios));
}