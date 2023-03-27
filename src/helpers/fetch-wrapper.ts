import { useAuthStore } from '@/stores/auth';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};

function request(method: string) {
  return async (url: string, body: any) => {
    const requestOptions: RequestInit = {
      method,
      headers: authHeader(url)
    };
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
  };
}

// helper functions

function authHeader(url: string): HeadersInit {
  // return auth header with jwt if user is logged in and request is to the api url
  const { auth } = useAuthStore();
  const isLoggedIn = auth.valid();
  // TODO
  // const isApiUrl = url.startsWith('/api');
  const isApiUrl = true;
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (isLoggedIn && isApiUrl) {
    headers['Authorization'] = `Bearer ${auth.getToken}`;
  }
  return headers;
}

function handleResponse(response: Response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const { auth, logout } = useAuthStore();
      if ([401].includes(response.status) && auth) {
        // auto logout if 401 Unauthorized response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
