import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from './types';

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  categories: [],
  searchTerm: '',
  selectedCategory: null,
  currentPage: 1,
  itemsPerPage: 10,
};

// Mock API calls - replace with actual API calls
const fakeApi = {
  getProducts: async () => {
    // In a real app, you would fetch from https://fakeapi.platzi.com/en/products
    const mockProducts: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 100,
        description: 'Description 1',
        category: { id: 1, name: 'Electronics' },
        images: ['https://placehold.co/300x200'],
      },
      // Add more mock products...
    ];
    return mockProducts;
  },
  getCategories: async () => ['Electronics', 'Clothing', 'Furniture', 'Books'],
  addProduct: async (product: Omit<Product, 'id'>) => ({ ...product, id: Math.floor(Math.random() * 1000) }),
  updateProduct: async (product: Product) => product,
  deleteProduct: async (id: number) => id,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fakeApi.getProducts();
    return response;
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await fakeApi.getCategories();
    return response;
  }
);

export const addNewProduct = createAsyncThunk(
  'products/addNewProduct',
  async (product: Omit<Product, 'id'>) => {
    const response = await fakeApi.addProduct(product);
    return response;
  }
);

export const updateExistingProduct = createAsyncThunk(
  'products/updateExistingProduct',
  async (product: Product) => {
    const response = await fakeApi.updateProduct(product);
    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number) => {
    await fakeApi.deleteProduct(id);
    return id;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })
      .addCase(updateExistingProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      });
  },
});

export const { setSearchTerm, setSelectedCategory, setCurrentPage } = productsSlice.actions;
export default productsSlice.reducer;