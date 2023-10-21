import axios from 'axios';

class HttpAdapter {
  constructor() {
    this.axiosInstance = axios.create();
  }

  async get(url, params = {}) {
    try {
      const response = await this.axiosInstance.get(url, {
        params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post(url, data = {}) {
    try {
      const response = await this.axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(url) {
    try {
      const response = await this.axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put(url, data = {}) {
    try {
      const response = await this.axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default HttpAdapter;
