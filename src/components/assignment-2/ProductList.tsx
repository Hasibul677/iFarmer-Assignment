'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { 
  fetchProducts, 
  fetchCategories, 
  deleteProduct,
  setSearchTerm,
  setSelectedCategory,
  setCurrentPage
} from '@/features/products/productsSlice';
import Link from 'next/link';

export default function ProductList() {
  const dispatch = useAppDispatch();
  const {
    products,
    loading,
    error,
    categories,
    searchTerm,
    selectedCategory,
    currentPage,
    itemsPerPage
  } = useAppSelector((state) => state.products);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCategoryChange = (category: string | null) => {
    dispatch(setSelectedCategory(category));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const confirmDelete = (id: number) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete));
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product List</h1>
        <Link
          href="/assignment-2/edit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Product
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-3/4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2">{product.id}</td>
                    <td className="px-4 py-2">
                      <Link 
                        href={`/assignment-2/products/${product.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {product.title}
                      </Link>
                    </td>
                    <td className="px-4 py-2">{product.category.name}</td>
                    <td className="px-4 py-2">${product.price}</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <Link
                          href={`/assignment-2/edit/${product.id}`}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => confirmDelete(product.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginatedProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">No products found</div>
          )}

          <div className="flex justify-center mt-4">
            <nav className="inline-flex rounded-md shadow">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 border ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  {page}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="md:w-1/4">
          <div className="sticky top-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="font-bold mb-2">Categories</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`w-full text-left px-2 py-1 rounded ${!selectedCategory ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                >
                  All Categories
                </button>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left px-2 py-1 rounded ${selectedCategory === category ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this product?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}