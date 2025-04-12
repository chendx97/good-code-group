interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
  data?: any;
}

interface HttpResponse<T = any> {
  [x: string]: any;
  code: number;
  data: T;
  message: string;
}

// 处理url参数
const addQueryParams = (url: string, params?: Record<string, string>) => {
  if (!params) return url;
  const queryString = new URLSearchParams(params).toString();
  return `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
};

// 基础请求方法
async function request<T>(url: string, options: RequestOptions): Promise<HttpResponse<T>> {
  try {
    // 处理查询参数
    const finalUrl = addQueryParams(url, options.params);

    // 默认headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // 处理请求体
    if (options.data) {
      options.body = JSON.stringify(options.data);
    }

    const response = await fetch(finalUrl, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}

// GET请求
export function get<T>(url: string, options: Omit<RequestOptions, 'method' | 'data'> = {}) {
  return request<T>(url, { ...options, method: 'GET' });
}

// POST请求
export function post<T>(url: string, options: Omit<RequestOptions, 'method'> = {}) {
  return request<T>(url, { ...options, method: 'POST' });
}

// 导出默认对象
export default {
  get,
  post,
};