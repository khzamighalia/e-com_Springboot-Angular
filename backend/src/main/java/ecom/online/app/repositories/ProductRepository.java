package ecom.online.app.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import ecom.online.app.entities.Product;


public interface ProductRepository extends JpaRepository<Product, Long> {
    // You can add custom query methods if needed
    List<Product> findByTitleContaining(String keyword);

    // List<Product> findByCategoryId(Integer categoryId);

}
