import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState, Category } from './types';

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

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return id;
  }
);

export const addNewProduct = createAsyncThunk(
  'products/addNewProduct',
  async (newProduct: {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
  }) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    if (!response.ok) throw new Error('Failed to add product');
    return await response.json();
  }
);

export const updateExistingProduct = createAsyncThunk(
  'products/updateExistingProduct',
  async (updatedProduct: Product) => {
    const response = await fetch(`${API_BASE_URL}/products/${updatedProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return await response.json();
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
    setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
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
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      })
      
      // Add new product
      .addCase(addNewProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload); 
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add product';
      })
      
      // Update product
      .addCase(updateExistingProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateExistingProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update product';
      });
  },
});

export const { setSearchTerm, setSelectedCategory, setCurrentPage } = productsSlice.actions;
export default productsSlice.reducer;