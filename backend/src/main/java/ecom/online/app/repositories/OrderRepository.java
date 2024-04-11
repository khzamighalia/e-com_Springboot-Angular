package ecom.online.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ecom.online.app.entities.Order;



public interface OrderRepository extends JpaRepository<Order, Long> {

     List<Order> findByUserId(Long userId);

    
}
