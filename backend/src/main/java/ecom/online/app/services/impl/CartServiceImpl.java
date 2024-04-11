package ecom.online.app.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecom.online.app.entities.Cart;
import ecom.online.app.repositories.CartRepository;
import ecom.online.app.services.CartService;


@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public List<Cart> getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

   
    //See if i use price product in place of total

    @Override
    public Cart addToCart(Long userId, Long productId, int quantity, double total) {
        Cart cartItem = new Cart();
        cartItem.setUserId(userId);
        cartItem.setProductId(productId);
        cartItem.setQuantity(quantity);
        cartItem.setTotal(total);

        return cartRepository.save(cartItem);
    }

    public boolean isProductInCart(Long userId, Long productId) {
        return !cartRepository.findByUserIdAndProductId(userId, productId).isEmpty();
    }

    

    @Override
    public Cart updateCartItemQuantity(Long cartItemId, int newQuantity) {
        Optional<Cart> optionalCart = cartRepository.findById(cartItemId);

        if (optionalCart.isPresent()) {
            Cart cartItem = optionalCart.get();
            cartItem.setQuantity(newQuantity);
            return cartRepository.save(cartItem);
        } else {
            // Handle case where cart item with given ID is not found
            return null;
        }
    }

    @Override
    public void removeFromCart(Long cartItemId) {
        cartRepository.deleteById(cartItemId);
    }

    @Override
public void removeFromCartByUserId(Long userId) {
    // Retrieve cart items by user ID
    List<Cart> cartItems = cartRepository.findByUserId(userId);

    // Delete each cart item
    for (Cart cartItem : cartItems) {
        cartRepository.deleteById(cartItem.getId());
    }
}

}
