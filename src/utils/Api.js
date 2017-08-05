export default class Api {
  constructor(props) {
    this.api = props.api;
  }

  get(address, data = undefined) {
    return this.r('GET', this.api + address, data);
  }

  post(address, data = {}) {
    return this.r('POST', this.api + address, data);
  }

  patch(address, data = {}) {
    return this.r('PATCH', this.api + address, data);
  }

  delete(address, data = {}) {
    return this.r('DELETE', this.api + address, data);
  }

  r(method, address, data) {
    var params = { method: method, headers: {} };

    if (data) {
      params['body'] = JSON.stringify(data);
    }

    params['headers']['Accept'] = 'application/json';
    params['headers']['Content-Type'] = 'application/json';

    return fetch(address, params)
  }
}
