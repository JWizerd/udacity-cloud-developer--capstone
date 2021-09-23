import Service from "./base.service";

export class FilesService extends Service {
  constructor(axios, resource) {
    super(axios, resource);
  }

  /**
   * @param {id} id
   * @param {File} File
   * @returns string - the url to the uploaded file
   */
  async upload(id, File) {
    const urls = await this.getUploadUrls(id);
    await this.axios.put(urls.uploadUrl, File);
    return urls.attachmentUrl;
  }

  /**
   * @typedef {Object} UploadUrls
   * @param {string} uploadUrl
   * @param {string} attachmentUrl
   *
   * @param {string} key - the id used for the file uploaded
   * @returns {UploadUrls}
   */
  async getUploadUrls(key) {
    const { data: signedUrls } = await this.axios.get(`files/upload-url/${key}`);
    return signedUrls;
  }
}