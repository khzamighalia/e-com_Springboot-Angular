// export class Product {
//     id: number;
//     title: string;
//     price: number;
//     categoryId: number;
//     stock: number;
  
//     constructor(id: number, title: string, price: number, categoryId: number, stock: number) {
//       this.id = id;
//       this.title = title;
//       this.price = price;
//       this.categoryId = categoryId;
//       this.stock = stock;
//     }
//   }
export interface Product {
    id: number;
    title: string;
    description: string;
    imageUrl: String;
    price: number;
    category: String;
    stock: number;
  }
  
  