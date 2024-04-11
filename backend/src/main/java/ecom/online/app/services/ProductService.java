package ecom.online.app.services;


import java.util.List;

import ecom.online.app.entities.Product;


public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(Long id);
    // List<Product> getProductByCategoryId(Integer CategoryId);
    Product createProduct(Product product);
    Product updateProduct(Long id, Product product);
    void deleteProduct(Long id);
    List<Product> searchProducts(String keyword);
}

