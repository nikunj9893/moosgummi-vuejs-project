import axios from 'axios';

export default axios.create({
  baseURL: 'https://billing-api.test.sixhop.net/api/v1',
});