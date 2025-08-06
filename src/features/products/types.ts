export interface Category {
  id: number;
  name: string;
  image: string;
  creationAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  categories: Category[];
  searchTerm: string;
  selectedCategory: Category | null;
  currentPage: number;
  itemsPerPage: number;
}