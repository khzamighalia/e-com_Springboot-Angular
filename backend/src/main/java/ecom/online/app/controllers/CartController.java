package ecom.online.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ecom.online.app.entities.Cart;
import ecom.online.app.requests.CartRequest;
import ecom.online.app.services.CartService;


    @RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{userId}")
    public ResponseEntity<List<Cart>> getCartByUserId(@PathVariable Long userId) {
        List<Cart> cartItems = cartService.getCartByUserId(userId);
        return new ResponseEntity<>(cartItems, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestBody CartRequest cartRequest) {
        
        if (!cartService.isProductInCart(cartRequest.getUserId(), cartRequest.getProductId())) {
            Cart cartItem = cartService.addToCart(
                cartRequest.getUserId(),
                cartRequest.getProductId(),
                cartRequest.getQuantity(),
                cartRequest.getTotal()
            );
    
        return new ResponseEntity<>(cartItem, HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.CONFLICT);

        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/update/{cartItemId}")
    public ResponseEntity<Cart> updateCartItemQuantity(
            @PathVariable Long cartItemId,
            @RequestParam int newQuantity) {
        Cart updatedCartItem = cartService.updateCartItemQuantity(cartItemId, newQuantity);

        if (updatedCartItem != null) {
            return new ResponseEntity<>(updatedCartItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long cartItemId) {
        cartService.removeFromCart(cartItemId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

    

