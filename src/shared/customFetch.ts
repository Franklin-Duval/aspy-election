import { notification } from 'antd';
import { ResponseErrorBody } from 'server/shared/ErrorFormatted';

export const customFetch = {
  get: (url: string) => {
    return fetch(url).then(responseHandler);
  },

  post: (url: string, data: unknown) => {
    return fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(responseHandler);
  },
};

export const responseHandler = async (res: Response) => {
  if (res.status >= 400) {
    const resJson = (await res.json()) as ResponseErrorBody;
    if (resJson.errors) {
      resJson.errors.forEach((error) => {
        notification.error({
          message: error.message,
          description: error.details,
          duration: null,
        });
      });
    }
    if (resJson.error) {
      const error = resJson.error;
      notification.error({
        message: error.message,
        description: error.details,
        duration: null,
      });
    }
    throw Error('Error occured');
  }
  return res.json();
};
