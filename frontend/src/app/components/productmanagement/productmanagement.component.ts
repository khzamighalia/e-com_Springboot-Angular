import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { TokenService } from '../../Services/token-service.service';
import { Product } from '../../shared/product';
import { Order } from '../../shared/order';
import { OrderService } from './../../Services/order.service';

@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.component.html',
  styleUrls: ['./productmanagement.component.css']
})
export class ProductmanagementComponent implements OnInit {
  products: Product[] = [];
  orders: Order[] = [];
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
  productslist: boolean = true;
  orderslist: boolean = false;
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
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    this.loadProducts();
    // this.loadOrders();
  }

  //Products

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
  }


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
        this.loadProducts(); 
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

  showProducts(): void {
    
    this.orderslist = false;
    this.productslist = true;
    this.loadOrders();

   
  }

  // //Orders
  // loadOrders(): void {
  //   this.orderService.getAllOrders().subscribe(
  //     (orders: Order[]) => {
  //       this.orders = orders;
  //     },
  //     error => {
  //       this.errorMessage = 'Error loading products: ' + error.message;
  //       this.showErrorAlert = true;
  //     }
  //   );
  // }

  showAllOrders(): void {
    this.showAddForm = false;
    this.showEditForm = false;
    this.orderslist = true;
    this.productslist = false;
    this.loadOrders();

   
  }
  // loadOrders(): void {
  //   this.orderService.getAllOrders().subscribe(
  //     (orders: Order[]) => {
  //       this.orders = orders;
  //       // Fetch product details for each order
  //       this.orders.forEach(order => {
  //         this.productService.getProduct(order.productId);
  //       });
  //     },
  //     error => {
  //       this.errorMessage = 'Error loading orders: ' + error.message;
  //       this.showErrorAlert = true;
  //     }
  //   );
  // }

  // getProductByProductId(productId: number): void {
  //   this.productService.getProduct(productId).subscribe(
  //     (product: Product) => {
  //       const order = this.orders.find(order => order.productId === productId);
  //       if (order) {
  //         order.product = product;
  //       }
  //     },
  //     error => {
  //       console.error('Error fetching product:', error);
  //     }
  //   );
  // }
  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        // Fetch product details for each order
        this.loadProductsForOrders();
      },
      error => {
        this.errorMessage = 'Error loading orders: ' + error.message;
        this.showErrorAlert = true;
      }
    );
  }
  
  loadProductsForOrders(): void {
    // Fetch product details for each order
    this.orders.forEach(order => {
      this.getProductByProductId(order.productId);
    });
  }
  
  getProductByProductId(productId: number): void {
    this.productService.getProduct(productId).subscribe(
      (product: Product) => {
        const order = this.orders.find(order => order.productId === productId);
        if (order) {
          order.product = product;
        }
      },
      error => {
        console.error('Error fetching product:', error);
      }
    );
  }
  
}
