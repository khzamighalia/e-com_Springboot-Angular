package ecom.online.app.services;


import java.util.List;

import ecom.online.app.entities.Cart;

public interface CartService {
    
    List<Cart> getCartByUserId(Long userId);

    public boolean isProductInCart(Long userId, Long productId);

    Cart addToCart(Long userId, Long productId, int quantity, double total);

    Cart updateCartItemQuantity(Long cartItemId, int newQuantity);

    void removeFromCart(Long cartItemId);

    void removeFromCartByUserId(Long userId);
}
