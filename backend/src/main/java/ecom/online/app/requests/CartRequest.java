package ecom.online.app.requests;

public class CartRequest {
    private Long userId;
    private Long productId;
    private int quantity;
    private double total;

    public CartRequest() {
    }

    public CartRequest(Long userId, Long productId, int quantity, double total) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.total = total;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    
    
    
    
    

}
