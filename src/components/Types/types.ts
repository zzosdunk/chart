export interface ItemData {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
}

export interface CartData {
  id: number;
  products: ItemData[];
  totalProducts: number;
  total: number;
  userId: number;
}
