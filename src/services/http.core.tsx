import axios from 'axios';

class HTTPCore {
  api;
  constructor({}) {
    this.api = axios;
  }

  post(path = '/', data = {}, config = {}) {
    return this.api.post(path, data, config).then(res => res.data);
  }

  get(path = '/', config = {}) {
    return this.api.get(path, config).then(res => res.data);
  }

  put(path = '/', data = {}, config = {}) {
    return this.api.put(path, data, config).then(res => res.data);
  }

  patch(path = '/', data = {}, config = {}) {
    return this.api.patch(path, data, config).then(res => res.data);
  }

  delete(path = '/', config = {}) {
    return this.api.delete(path, config).then(res => res.data);
  }
}

export default HTTPCore;
