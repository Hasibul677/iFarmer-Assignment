export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
  images: string[];
};

export type ProductsState = {
  products: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
  searchTerm: string;
  selectedCategory: string | null;
  currentPage: number;
  itemsPerPage: number;
};