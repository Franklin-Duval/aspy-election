export const customFetch = {
  get: (url: string) => {
    return fetch(url);
  },

  post: (url: string, data: unknown) => {
    return fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
};
