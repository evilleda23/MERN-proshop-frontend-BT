import HttpAdapter from './http-adapter';

const http = new HttpAdapter();

export async function get(url, params = {}) {
  try {
    return await http.get(url, {
      params,
    });
  } catch (error) {
    throw error;
  }
}

export async function post(url, data = {}) {
  try {
    return await http.post(url, data);
  } catch (error) {
    throw error;
  }
}

export async function remove(url) {
  try {
    return await http.delete(url);
  } catch (error) {
    throw error;
  }
}

export async function put(url, data = {}) {
  try {
    return await http.put(url, data);
  } catch (error) {
    throw error;
  }
}
