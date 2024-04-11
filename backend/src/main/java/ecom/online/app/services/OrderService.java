package ecom.online.app.services;

import java.util.List;

import ecom.online.app.entities.Order;



public interface OrderService {

    List<Order> getOrderByUserId(Long userId);

    // Long addToOrder(Long userId,String fullname,String address,String phone);
    
    Long addToOrderFromCart(Long userId,String fullname,String address,String phone);

    Order updateOrderItemQuantity(Long orderItemId, int newQuantity);

    void removeFromOrder(Long orderItemId);
    
}
