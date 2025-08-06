'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import {
  addNewProduct,
  updateExistingProduct,
  fetchCategories
} from '@/features/products/productsSlice';
import { Product } from '@/features/products/types';

interface ProductFormProps {
  initialData?: Product;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { categories } = useAppSelector((state) => state.products);

  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    title: '',
    price: 0,
    description: '',
    category: { id: 0, name: '', image: '', creationAt: '', updatedAt: '' },
    images: [''],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (!initialData && categories.length > 0) {
      setFormData((prev) => ({
        ...prev,
        category: categories[0],
      }));
    }
  }, [categories, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'category') {
      const selectedCategory = categories.find((cat) => cat.id === Number(value));
      if (selectedCategory) {
        setFormData({
          ...formData,
          category: selectedCategory,
        });
      }
    } else if (name === 'price') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else if (name.startsWith('images[')) {
      const index = parseInt(name.match(/\[(\d+)\]/)?.[1] || '0');
      const newImages = [...formData.images];
      newImages[index] = value;
      setFormData({
        ...formData,
        images: newImages,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const removeImageField = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages,
    });
  };

const validateForm = () => {
  const newErrors: Record<string, string> = {};

  // Title Validation
  if (!formData.title.trim()) {
    newErrors.title = 'Title is required';
  } else if (formData.title.length > 100) {
    newErrors.title = 'Title must be less than 100 characters';
  }

  // Price Validation
  if (formData.price <= 0) {
    newErrors.price = 'Price must be greater than 0';
  }

  // Description Validation
  if (!formData.description.trim()) {
    newErrors.description = 'Description is required';
  }

  // Image Validation (only checks for non-empty URLs now)
  if (formData.images.length === 0 || formData.images.some((img) => !img.trim())) {
    newErrors.images = 'Image URL is required';
  }

  // Set and return errors
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (initialData) {
        await dispatch(updateExistingProduct({ ...formData, id: initialData.id })).unwrap();
      } else {
        await dispatch(
          addNewProduct({
            title: formData.title,
            price: formData.price,
            description: formData.description,
            categoryId: formData.category.id,
            images: formData.images,
          })
        ).unwrap();
      }
      router.push('/assignment-2');
    } catch (error) {
      console.error('Failed to save product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        {initialData ? 'Edit Product' : 'Add New Product'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category.id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Images *</label>
          {formData.images.map((image, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="text"
                name={`images[${index}]`}
                value={image}
                onChange={handleChange}
                className={`flex-1 px-3 py-2 border ${
                  errors.images ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Image URL"
              />
              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="ml-2 p-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/assignment-2')}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 text-white rounded-md ${
              isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
