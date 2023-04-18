import { API_PATH } from '@/config/path';
import { apiService } from '@/httpRequest';
import { IProduct, IProductListConfig } from '@/types/product.type';

export const productService = {
  getProducts(params: IProductListConfig) {
    return apiService.get(API_PATH.products, {
      params,
    });
  },

  getProductDetail(id: string) {
    return apiService.get(`${API_PATH.products}/${id}`);
  },

  addProduct(data: IProduct | FormData) {
    return apiService.post(`${API_PATH.products}`, data);
  },

  updateProduct(id: string, data: IProduct | FormData) {
    return apiService.patch(`${API_PATH.products}/${id}`, data);
  },

  deleteProduct(id: string) {
    return apiService.delete(`${API_PATH.products}/${id}`);
  },
};
