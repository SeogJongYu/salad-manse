import qs from 'qs';

export interface FetchOptions extends RequestInit {
  params?: Record<string, any>;
  baseURL?: string;
}

export async function apiRequest<Response>(
  url: string,
  options: FetchOptions = {},
): Promise<Response> {
  const {
    params,
    baseURL = 'https://api.example.com',
    ...fetchOptions
  } = options;

  if (!url.startsWith('/')) {
    throw new Error('URL must start with a forward slash (/)');
  }

  let fullUrl = baseURL + url;

  if (params) {
    const queryString = qs.stringify(params, {
      arrayFormat: 'brackets',
      skipNulls: true,
      filter: (_prefix, value) => {
        if (
          value === undefined ||
          (Array.isArray(value) && value.length === 0) ||
          value === ''
        ) {
          return;
        }
        return value;
      },
    });

    fullUrl += `?${queryString}`;
  }

  const defaultHeaders: HeadersInit = {};

  if (fetchOptions.method !== 'GET') {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const mergedOptions: RequestInit = {
    ...fetchOptions,
    headers: {
      ...defaultHeaders,
      ...fetchOptions.headers,
    },
  };

  try {
    const response = await fetch(fullUrl, mergedOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error (${response.status}): ${errorText}`);
      throw new Error(`HTTP error (${response.status}): ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
}
