package ecom.online.app.requests;

public class ProductRequest {

    private String title;
    private Double price;
    private String category;
    private Integer stock;

    public ProductRequest(){

    }

    public ProductRequest(String title,Double price,String category,Integer stock) {
        this.title = title;
        this.price = price;
        this.category = category;
        this.stock = stock;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }


}
