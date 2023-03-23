export interface ItemData {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountedPrice: number;
}

export interface CartData {
  id: number;
  products: ItemData[];
  totalProducts: number;
  total: number;
  userId: number;
}
