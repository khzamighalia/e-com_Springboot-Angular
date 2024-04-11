package ecom.online.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ecom.online.app.entities.Cart;


public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUserId(Long userId);
    List<Cart> findByUserIdAndProductId(Long userId, Long productId);

}

