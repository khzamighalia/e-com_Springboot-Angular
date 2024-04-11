package ecom.online.app.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import ecom.online.app.entities.Product;
import ecom.online.app.repositories.ProductRepository;
import ecom.online.app.services.ProductService;


@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        return optionalProduct.orElse(null);
    }

    // @Override
    // public List<Product> getProductByCategoryId(Integer categoryId) {
    //     return productRepository.findByCategoryId(categoryId);
    // }
    

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        if (productRepository.existsById(id)) {
            product.setId(id);
            return productRepository.save(product);
        }
        return null;
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> searchProducts(String keyword) {
        return productRepository.findByTitleContaining(keyword);

    }
}

