package ecom.online.app.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecom.online.app.entities.Cart;
import ecom.online.app.entities.Order;
import ecom.online.app.repositories.OrderRepository;
import ecom.online.app.services.CartService;
import ecom.online.app.services.OrderService;



@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CartService cartService;

    @Override
    public List<Order> getOrderByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    // @Override
    // public Order addToOrder(Long userId, Long productId, int quantity, double total,String fullname, String address,String phone) {
    //     Order orderItem = new Order();
    //     orderItem.setUserId(userId);
    //     orderItem.setProductId(productId);
    //     orderItem.setQuantity(quantity);
    //     orderItem.setTotal(total);
    //     orderItem.setFullname(fullname);
    //     orderItem.setAddress(address);
    //     orderItem.setPhone(phone);

    //     return orderRepository.save(orderItem);
    // }

    @Override
    public Long addToOrderFromCart(Long userId, String fullname, String address, String phone) {
        // Retrieve cart items for the user
        List<Cart> cartItems = cartService.getCartByUserId(userId);
        for (Cart cartItem : cartItems) {
            Order orderItem = new Order();
            orderItem.setUserId(userId);
            orderItem.setProductId(cartItem.getProductId());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotal(cartItem.getTotal());
            orderItem.setFullname(fullname);
            orderItem.setAddress(address);
            orderItem.setPhone(phone);
            // Optionally, you can copy other properties as needed
            orderRepository.save(orderItem);
        }

        // Clear the user's cart after adding items to the order
        cartService.removeFromCartByUserId(userId);

        // For simplicity, returning orderId as userId
        return userId;
    }

    // public Long addToOrderFromCart(Long userId,String fullname,String address,String phone) {
    //     // Retrieve cart items for the user
    //     List<Cart> cartItems = cartService.getCartByUserId(userId);
    //     for (Cart cartItem : cartItems) {
    //         Order orderItem = new Order();
    //         orderItem.setUserId(userId);
    //         orderItem.setProductId(cartItem.getProductId());
    //         orderItem.setQuantity(cartItem.getQuantity());
    //         orderItem.setTotal(cartItem.getTotal());
    //         orderItem.setFullname(fullname);
    //         orderItem.setAddress(address);
    //         orderItem.setPhone(phone);
    //         // Optionally, you can copy other properties as needed
    //         orderRepository.save(orderItem);
    //     }

    //     // Clear the user's cart after adding items to the order
    //     cartService.removeFromCartByUserId(userId);

    //     return userId;
    // }
    @Override
    public Order updateOrderItemQuantity(Long orderItemId, int newQuantity) {
        Optional<Order> optionalOrder = orderRepository.findById(orderItemId);

        if (optionalOrder.isPresent()) {
            Order orderItem = optionalOrder.get();
            orderItem.setQuantity(newQuantity);
            return orderRepository.save(orderItem);
        } else {
            // Handle case where order item with given ID is not found
            return null;
        }
    }

    @Override
    public void removeFromOrder(Long orderItemId) {
        orderRepository.deleteById(orderItemId);
    }

    
}
