import { useAuthStore } from '@/stores/auth';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};

const backend_url = import.meta.env.VITE_BACKEND_PATH;

function request(method: string) {
  return (url: string, body?: object, cb = handleResponse) => {
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
  // return auth header with jwt if user is logged in and request is to the api url
  const { auth } = useAuthStore();
  const isApiUrl = url.startsWith(backend_url);
  const headers: HeadersInit = {};
  if (isApiUrl) {
    headers['Content-Type'] = 'application/json';
  }
  if (auth.valid() && isApiUrl) {
    headers['Authorization'] = `Bearer ${auth.token}`;
  }
  return headers;
}

function handleResponse(
  response: Response,
  method: string,
  url: string,
  body?: object
): Promise<any> {
  return response
    .text()
    .then((text) => {
      if (!response.ok) throw text;
      return JSON.parse(text);
    })
    .catch((err) => {
      const { auth, logout } = useAuthStore();
      if (response.status == 401 && auth.valid()) {
        return jwtRefresh()
          .then(() => request(method)(url, body))
          .catch(() => {
            logout();
            throw 'Your session could not be restored.';
          });
      }
      throw err || response.statusText;
    });
}

function jwtRefresh() {
  const { auth } = useAuthStore(),
    now = new Date();

  if (auth.lastTokenRefresh && now.getTime() - auth.lastTokenRefresh.getTime() < 5000) {
    throw 'Open Circuit Breaker.';
  } else {
    auth.lastTokenRefresh = now;
  }

  return fetchWrapper
    .post(`${backend_url}/auth/refresh`, undefined, jwtRefreshResponse)
    .then((data) => auth.setToken(data.jwt))
    .catch((err) => {
      throw err;
    });
}

function jwtRefreshResponse(response: Response) {
  return response
    .text()
    .then((text) => JSON.parse(text))
    .catch((err) => {
      throw err;
    });
}
