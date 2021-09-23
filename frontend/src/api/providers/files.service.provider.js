import FilesService from "../services/files.service";
export const filesServiceProvider = (container) => {
  const key = 'files';
  container.bind(key,  new FilesService(container.axios, key));
}