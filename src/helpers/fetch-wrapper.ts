import { useAuthStore } from '@/stores/auth.store';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};

const backend_url = import.meta.env.VITE_BACKEND_PATH;

function request(method: string) {
  return async (url: string, body?: object, cb = handleResponse) => {
    const requestOptions: RequestInit = {
      method,
      headers: authHeader(url),
      body: body && JSON.stringify(body)
    };

    return fetch(url, requestOptions)
      .then((response) => cb(response, method, url, body))
      .catch((err) => {
        throw err;
      });
  };
}

function authHeader(url: string): HeadersInit {
  const headers: HeadersInit = {};
  if (url.startsWith(backend_url)) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
}

async function handleResponse(
  response: Response,
  method: string,
  url: string,
  body?: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  return response
    .text()
    .then((text) => {
      if (!response.ok) throw text;
      try {
        return JSON.parse(text);
      } catch(e) {
        return text;
      }
    })
    .catch((err) => {
      const { user, logout } = useAuthStore();
      if (response.status == 401 && user.valid()) {
        localStorage.setItem(
          'failed_action',
          JSON.stringify({
            method,
            url,
            body
          })
        );
        logout();
        throw 'You have been logged out.';
      }
      if (err) {
        try {
          return JSON.parse(err);
        }
        catch(e) {
          return err;
        }
      } else {
        return response.statusText;
      }
    });
}
