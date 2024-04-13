import React, { useState, useEffect } from 'react';
import { addNewCategory, getAllCategories, getAllProducts, addNewProduct } from '../apis/api';

function Products() {
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        productName: '',
        category: '',
        manufacturingCost: 0,
        sellingCost: 0
    });
    const [newCategory, setNewCategory] = useState('');
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories().then(res => setCategories(res))
        getAllProducts().then(res=>setProducts(res))
    }, [])

    const toggleProductModal = () => {
        setIsProductModalOpen(!isProductModalOpen);
    };

    const toggleCategoryModal = () => {
        setIsCategoryModalOpen(!isCategoryModalOpen);
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = (name === 'manufacturingCost' || name === 'sellingCost') ? parseInt(value) : value;
    
        setNewProduct({
            ...newProduct,
            [name]: parsedValue
        });
    };
    

    const handleCategoryChange = (e) => {
        setNewCategory(e.target.value);
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        addNewProduct(newProduct).then(res=>console.log(res))
        setNewProduct({
            productName: '',
            category: '',
            manufacturingCost: 0,
            sellingCost: 0
        });
        toggleProductModal();
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        addNewCategory(newCategory).then(res => console.log(res))
        setNewCategory('');
        toggleCategoryModal();
    };

    const handleDelete = (index) => {
        console.log('Deleting product at index:', index);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className='flex justify-between  mb-2'>
                <h2 className="text-2xl font-bold mb-4">Products</h2>
                <div className='space-x-4'>
                    <button onClick={toggleCategoryModal} className='px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700'>Add New Category</button>
                    <button onClick={toggleProductModal} className='px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700'>Add New Product</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-900 text-white">
                            <th className="px-6 py-3 text-center font-medium border-b border-gray-300">Product Name</th>
                            <th className="px-6 py-3 text-center font-medium border-b border-gray-300">Category</th>
                            <th className="px-6 py-3 text-center font-medium border-b border-gray-300">Manufacturing Cost</th>
                            <th className="px-6 py-3 text-center font-medium border-b border-gray-300">Selling Cost</th>
                            <th className="px-6 py-3 text-center font-medium border-b border-gray-300">Profit</th>
                            <th className="px-6 py-3 font-medium border-b border-gray-300 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product, index) => (
                            <tr key={index} className='bg-white'>
                                <td className="px-6 py-2 whitespace-nowrap border-b border-gray-300 text-center">{product.productName}</td>
                                <td className="px-6 py-2 whitespace-nowrap border-b border-gray-300 text-center">{product.category}</td>
                                <td className="px-6 py-2 whitespace-nowrap border-b border-gray-300 text-center">Rs.{product.manufacturingCost}</td>
                                <td className="px-6 py-2 whitespace-nowrap border-b border-gray-300 text-center">Rs.{product.sellingCost}</td>
                                <td className="px-6 py-2 whitespace-nowrap border-b border-gray-300 text-center">Rs.{product.sellingCost - product.manufacturingCost}</td>
                                <td className="px-6 py-2 whitespace-nowrap border-b border-gray-300 text-center">
                                    <button onClick={() => handleDelete(index)} className="bg-red-500 text-white rounded-md px-4 py-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Product Modal */}
            {isProductModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleProductSubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="w-full">
                                            <div className="mt-3 text-center sm:text-left">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                                    Add New Product
                                                </h3>
                                                <div className="mt-5">
                                                    <div className="mb-4">
                                                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
                                                        <input type="text" name="productName" id="productName" value={newProduct.productName} onChange={handleProductChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  sm:text-sm border-2 border-gray-300 rounded-md py-2 px-3" />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                                        <select name="category" id="category" value={newProduct.category} onChange={handleProductChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  sm:text-sm border-2 border-gray-300 rounded-md py-2 px-3">
                                                            <option value="">Select category</option>
                                                            {categories.map(category => (
                                                                <option key={category.id} value={category.categoryName}>{category.categoryName}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="mb-4">
                                                        <label htmlFor="manufacturingCost" className="block text-sm font-medium text-gray-700">Manufacturing Cost</label>
                                                        <input type="number" name="manufacturingCost" id="manufacturingCost" value={newProduct.manufacturingCost} onChange={handleProductChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  sm:text-sm border-2 border-gray-300 rounded-md py-2 px-3" />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="sellingCost" className="block text-sm font-medium text-gray-700">Selling Cost</label>
                                                        <input type="number" name="sellingCost" id="sellingCost" value={newProduct.sellingCost} onChange={handleProductChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md py-2 px-3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Add Product
                                    </button>
                                    <button onClick={toggleProductModal} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Category Modal */}
            {isCategoryModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleCategorySubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="w-full">
                                            <div className="mt-3 text-center sm:text-left">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                                    Add New Category
                                                </h3>
                                                <div className="mt-5">
                                                    <div className="mb-4">
                                                        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
                                                        <input type="text" name="categoryName" id="categoryName" value={newCategory} onChange={handleCategoryChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  sm:text-sm border-2 border-gray-300 rounded-md py-2 px-3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Add Category
                                    </button>
                                    <button onClick={toggleCategoryModal} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Products;
