package ecom.online.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ecom.online.app.entities.Order;
import ecom.online.app.services.OrderService;


    @RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Order>> getOrderByUserId(@PathVariable Long userId) {
        List<Order> orderItems = orderService.getOrderByUserId(userId);
        return new ResponseEntity<>(orderItems, HttpStatus.OK);
    }

    

    @PostMapping("/add/{userId}")
    public ResponseEntity<Long> addToOrderFromCart(@PathVariable Long userId,
                                                   @RequestParam String fullname,
                                                   @RequestParam String address,
                                                   @RequestParam String phone) {
        Long orderId = orderService.addToOrderFromCart(userId, fullname, address, phone);
        return new ResponseEntity<>(orderId, HttpStatus.CREATED);
    }
    // public ResponseEntity<Long> addToOrderFromCart(@PathVariable Long userId,@RequestParam String fullname,@RequestParam String address,@RequestParam String phone) {
    //     Long orderId = orderService.addToOrderFromCart(userId,fullname,address,phone);
    //     return new ResponseEntity<>(orderId, HttpStatus.CREATED);
    // }

    @PutMapping("/update/{orderItemId}")
    public ResponseEntity<Order> updateOrderItemQuantity(
            @PathVariable Long orderItemId,
            @RequestParam int newQuantity) {
        Order updatedOrderItem = orderService.updateOrderItemQuantity(orderItemId, newQuantity);

        if (updatedOrderItem != null) {
            return new ResponseEntity<>(updatedOrderItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/remove/{orderItemId}")
    public ResponseEntity<Void> removeFromOrder(@PathVariable Long orderItemId) {
        orderService.removeFromOrder(orderItemId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

    

