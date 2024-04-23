import { HttpAdapter } from '../interfaces/http-adapter.interface';

export class FetchAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    try {
      const data: Promise<T> = (await fetch(url)).json();
      return data;
    } catch (error) {
      throw new Error('This is an error - Check logs');
    }
  }
}
