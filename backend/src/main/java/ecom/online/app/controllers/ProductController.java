package ecom.online.app.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
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
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import ecom.online.app.entities.Product;
import ecom.online.app.services.ProductService;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

//     @CrossOrigin(origins = "http://localhost:4200")
//     @GetMapping("/category/{categoryId}")
// public ResponseEntity<List<Product>> getProductByCategoryId(@PathVariable Integer categoryId) {
//     List<Product> products = (List<Product>) productService.getProductByCategoryId(categoryId);

//     if (products != null && !products.isEmpty()) {
//         return new ResponseEntity<>(products, HttpStatus.OK);
//     } else {
//         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//     }
// }


    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
public ResponseEntity<Product> createProduct(@RequestParam("image") MultipartFile image,
                                             @RequestParam("product") String productJson) {
    try {
        // Convert product JSON to Product object
        Product product = new ObjectMapper().readValue(productJson, Product.class);
        
        // Save the image file to the server
        // For example, you can use the following method to save it to a directory
        String imageUrl = saveImage(image);

        // Set the image URL in the product object
        product.setImageUrl(imageUrl);

        // Save the product to the database
        Product createdProduct = productService.createProduct(product);

        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    } catch (IOException e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

private String saveImage(MultipartFile image) throws IOException {
    String fileName = StringUtils.cleanPath(image.getOriginalFilename());
    Path uploadPath = Paths.get("assets/img/");

    // Ensure the upload directory exists
    if (!Files.exists(uploadPath)) {
        Files.createDirectories(uploadPath);
    }

    // Save the file to the upload directory
    try (InputStream inputStream = image.getInputStream()) {
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        return filePath.toString(); // Return the file path or URL
    }
}

    // public ResponseEntity<Product> createProduct(@RequestBody Product product) {
    //     Product createdProduct = productService.createProduct(product);
    //     return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    // }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(id, product);
        if (updatedProduct != null) {
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
	@CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // http://localhost:8080/api/products/search?keyword=duct1

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
        List<Product> searchedProducts = productService.searchProducts(keyword);
        return new ResponseEntity<>(searchedProducts, HttpStatus.OK);
    }
}

