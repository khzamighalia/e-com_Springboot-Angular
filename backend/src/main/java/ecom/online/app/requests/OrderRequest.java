package ecom.online.app.requests;

// public class OrderRequest {
//     private Long userId;
//     private Long productId;
//     private int quantity;
//     private double total;
//     private String fullname;
//     private String address;
//     private String phone;
    
//     public OrderRequest() {
//     }

//     public OrderRequest(Long userId, Long productId, int quantity, double total,String fullname,String address, String phone) {
//         this.userId = userId;
//         this.productId = productId;
//         this.quantity = quantity;
//         this.total = total;
//         this.fullname = fullname;
//         this.address = address;
//         this.phone = phone;
//     }

//     public Long getUserId() {
//         return userId;
//     }

//     public void setUserId(Long userId) {
//         this.userId = userId;
//     }

//     public Long getProductId() {
//         return productId;
//     }

//     public void setProductId(Long productId) {
//         this.productId = productId;
//     }

//     public int getQuantity() {
//         return quantity;
//     }

//     public void setQuantity(int quantity) {
//         this.quantity = quantity;
//     }

//     public double getTotal() {
//         return total;
//     }

//     public void setTotal(double total) {
//         this.total = total;
//     }

//     public String getFullname() {
//         return fullname;
//     }

//     public void setFullname(String fullname) {
//         this.fullname = fullname;
//     }

//     public String getAddress() {
//         return address;
//     }

//     public void setAddress(String address) {
//         this.address = address;
//     }

//     public String getPhone() {
//         return phone;
//     }

//     public void setPhone(String phone) {
//         this.phone = phone;
//     }
    
// }

public class OrderRequest {
    private Long userId;
    private String fullname;
    private String address;
    private String phone;

    // Getters and setters

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
