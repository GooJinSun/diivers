import Cookies from 'js.cookie';
import axios from 'axios';
import { JWT_REFRESH_TOKEN } from '../../constants/cookies';

jest.mock('axios');

describe('interceptor', () => {
  it('get jwt_token_access when response status is 403', async () => {
    Cookies.set(JWT_REFRESH_TOKEN, 'test_token');

    const spy = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise((resolve) => {
        const result = {
          data: {
            access: 'test_token'
          }
        };
        resolve(result);
      });
    });

    axios.interceptors.response.use = jest.fn((successCb, failCb) => {
      failCb({
        response: {
          status: 403
        },
        config: {
          url: '/home'
        }
      });
    });

    if (Cookies.get(JWT_REFRESH_TOKEN)) {
      const tokenRes = await axios.post('/user/token');
      expect(tokenRes?.data.access).toEqual('test_token');

      expect(spy).toHaveBeenCalled();
    } else {
      const error = () => {
        throw Promise.reject(new Error('error'));
      };
      expect(error).toThrow(Error);
    }
  });
});
