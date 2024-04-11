import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { TokenService } from '../../Services/token-service.service';
import { Product } from '../../shared/product';

@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.component.html',
  styleUrls: ['./productmanagement.component.css']
})
export class ProductmanagementComponent implements OnInit {
  products: Product[] = [];
  product: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    imageUrl: ''
  };
  newProduct: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    imageUrl: ''
  };
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  selectedProductId: number | null = null; // Property to hold the selected product ID

  token: string | null = '';
  selectedImage: File | null = null;
  showAddSuccessAlert: boolean = false;
  showEditSuccessAlert: boolean = false;
  showDeleteSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;
  errorMessage: string = '';

  constructor(
    private tokenService: TokenService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    this.loadProducts();
  }

  showAddProductForm(): void {
    this.showAddForm = true;
    this.showEditForm = false;
   
  }

  onSubmit(formType: string): void {
    if (formType === 'add') {
      // Handle submission of the add product form
      if (!this.selectedImage) {
        this.showErrorAlert = true;
        console.error('Please select an image.');
        return;
      }
  
      const formData = new FormData();
      formData.append('image', this.selectedImage);
      formData.append('product', JSON.stringify(this.newProduct));
  
      this.productService.createProduct(formData).subscribe(
        createdProduct => {
          this.showAddForm = false; 
          this.showAddSuccessAlert = true;
          this.showEditSuccessAlert = false;
          this.showDeleteSuccessAlert = false;
          this.loadProducts(); 
        },
        error => {
          console.error('Error creating product:', error);
        }
      );
    } else if (formType === 'edit') {
      // Handle submission of the edit product form
      // Example logic to update the product
      this.productService.updateProduct(this.product.id, this.product).subscribe(
        updatedProduct => {
          // Optionally, update the table or show a success message
          // console.log('Product updated:', updatedProduct);
          this.showEditForm = false; 
          this.showEditSuccessAlert = true;
          this.showAddSuccessAlert = false;
          this.showDeleteSuccessAlert = false;
          this.loadProducts(); 
        },
        error => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      console.error('Invalid form type:', formType);
    }
  }
  
 

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  showUpdateForm(productId: number): void {
    // this.selectedProductId = productId; // Set the selected product ID
    this.productService.getProduct(productId).subscribe(
      (data: Product) => {
        this.product = data; // Assign fetched product details to the product property
        this.showEditForm = true; // Show the update form
        this.showAddForm = false;
      },
      error => {
        console.error('Error fetching product:', error);
        this.showErrorAlert = true;

      }
    );
    // this.showEditForm = true; // Show the update form
  }

  // editProduct(productId: number): void {
  //   this.productService.getProduct(productId).subscribe(
  //     (data: Product) => {
  //       this.newProduct = data;
  //       this.showEditForm = true;
  //     },
  //     error => {
  //       this.errorMessage = 'Error fetching product: ' + error.message;
  //       this.showErrorAlert = true;
  //     }
  //   );
  // }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      error => {
        this.errorMessage = 'Error loading products: ' + error.message;
        this.showErrorAlert = true;
      }
    );
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(product.id, product).subscribe(
      updatedProduct => {
        // Optionally, update the table or show a success message
        console.log('Product updated:', updatedProduct);
        this.showEditForm = false;
        this.showEditSuccessAlert = true;
        this.showAddSuccessAlert = false;
          this.showDeleteSuccessAlert = false;
      },
      error => {
        this.errorMessage = 'Error updating product: ' + error.message;
        this.showErrorAlert = true;
      }
    );
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        // Optionally, update the table or show a success message
        this.loadProducts(); // Refresh the product list after deletion
        this.showDeleteSuccessAlert = true;
        this.showEditSuccessAlert = false;
          this.showAddSuccessAlert = false;
      },
      error => {
        this.errorMessage = 'Error deleting product: ' + error.message;
        this.showErrorAlert = true;
      }
    );
  }

  resetForm(): void {
    this.newProduct = {
      id: 0,
      title: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      imageUrl: ''
    };
    this.selectedImage = null;
  }
}
