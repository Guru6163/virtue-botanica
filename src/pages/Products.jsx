import React, { useState, useEffect } from 'react';
import { addNewCategory, getAllCategories, getAllProducts, addNewProduct, deleteProduct, deleteCategory } from '../apis/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

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
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetchProductsAndCategories();
    }, []);

    const fetchProductsAndCategories = async () => {
        try {
            const categoriesData = await getAllCategories();
            const productsData = await getAllProducts();
            setCategories(categoriesData);
            setProducts(productsData);
            setFilteredProducts(productsData); // Set filteredProducts initially to all products
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

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
        addNewProduct(newProduct)
            .then(res => {
                toast.success("Product added successfully!");
                setNewProduct({
                    productName: '',
                    category: '',
                    manufacturingCost: 0,
                    sellingCost: 0
                });
                toggleProductModal();
                fetchProductsAndCategories(); // Refresh products and categories
            })
            .catch(error => {
                console.error(error);
                toast.error(error);
            });
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addNewCategory(newCategory);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success("Category added successfully!");
                setNewCategory('');
                toggleCategoryModal();
                fetchProductsAndCategories(); // Refresh products and categories
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add category. Please try again later.");
        }
    };

    const handleDelete = async (product) => {
        try {
            const res = await deleteProduct(product?.id);
            if (res) {
                toast.success("Product deleted successfully!");
                fetchProductsAndCategories(); // Refresh products and categories
            } else {
                toast.error("Failed to delete product. Please try again later.");
            }
        } catch (error) {
            console.error("Error deleting product: ", error);
            toast.error("Failed to delete product. Please try again later.");
        }
    };

    const handleCategoryFilter = (e) => {
        const selectedCategory = e.target.value;
        if (selectedCategory === "") {
            // If no category is selected, show all products
            setFilteredProducts(products);
        } else {
            // Filter products based on the selected category
            const filteredProducts = products.filter(product => product.category === selectedCategory);
            setFilteredProducts(filteredProducts);
        }
    };

    const handleCategoryDelete = async (category) => {
        try {
            const res = await deleteCategory(category.id);
            if (res) {
                toast.success("Category deleted successfully!");
                fetchProductsAndCategories();
            } else {
                toast.error("Failed to delete category. Please try again later.");
            }
        } catch (error) {
            console.error("Error deleting category: ", error);
            toast.error("Failed to delete category. Please try again later.");
        }
    };

    const calculateProfit = (product) => {
        return product.sellingCost - product.manufacturingCost;
    };

    const renderProfitColumn = (rowData) => {
        const profit = calculateProfit(rowData);
        return (
            <td className='flex justify-center'>
                <div className='bg-green-600 px-4 py-1 text-white rounded-md'>{`Rs.${profit.toFixed(2)}`}</div>
            </td>
        );
    };

    const renderProfitPercentageColumn = (rowData) => {
        const profit = calculateProfit(rowData);
        const profitPercentage = (profit / rowData.manufacturingCost) * 100;

        return (
            <td className='flex justify-center'>
                <div className={`px-4 py-1 rounded-md ${profitPercentage >= 0 ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                    {`${profitPercentage.toFixed(2)}%`}
                </div>
            </td>
        );
    };

    const renderActions = (rowData) => {
        return (
            <div>
                <button onClick={() => handleDelete(rowData)} className='bg-red-500 text-white rounded-md px-4 py-1.5 w-full' >Delete</button>
            </div>
        );
    };

    return (
        <div className="p-10">
            <ToastContainer />
            <div className='flex justify-between  mb-2'>
                <h2 className="text-2xl font-bold mb-4">Products</h2>
                <div className='space-x-4'>
                    <Button onClick={toggleCategoryModal} label='Add New Category'/>
                    <Button onClick={toggleProductModal} label='Add New Product'/>
                    <select onChange={handleCategoryFilter} className="px-6 py-3 bg-gray-200 text-gray-800 text-sm rounded-md">
                        <option value="">Filter by Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.categoryName}>{category.categoryName}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="card">
                <DataTable size='small' className="text-center shadow-lg" showGridlines value={filteredProducts} paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    <Column style={{ border: '0.5px solid #9CA3AF' }} bodyClassName='font-bold' headerStyle={{background:'#2463EB',color:'white'}} field="productName" header="Name" ></Column>
                    <Column style={{ border: '0.5px solid #9CA3AF' }} headerStyle={{background:'#2463EB',color:'white'}} alignHeader='center' align='center' field="category" header="Category" ></Column>
                    <Column style={{ border: '0.5px solid #9CA3AF' }} headerStyle={{background:'#2463EB',color:'white'}} alignHeader='center' align='center' field="manufacturingCost" header="Manufacturing Cost" ></Column>
                    <Column style={{ border: '0.5px solid #9CA3AF' }} headerStyle={{background:'#2463EB',color:'white'}} alignHeader='center' align='center' field="sellingCost" header="Selling Cost" ></Column>
                    <Column style={{ border: '0.5px solid #9CA3AF' }} headerStyle={{background:'#2463EB',color:'white'}} alignHeader='center' align='center' header="Profit" body={renderProfitColumn} />
                    <Column style={{ border: '0.5px solid #9CA3AF' }} headerStyle={{background:'#2463EB',color:'white'}} alignHeader='center' align='center' header="Profit Percentage" body={renderProfitPercentageColumn} />
                    <Column style={{ border: '0.5px solid #9CA3AF' }} headerStyle={{background:'#2463EB',color:'white'}} alignHeader='center' align='center' header="Actions" body={renderActions} />
                </DataTable>
            </div>
            <h2 className="text-2xl font-bold my-4">Categories</h2>
            <div className="card">
                <DataTable size='small' className="text-center" showGridlines value={categories} paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ width: '30rem' }}>
                    <Column style={{ border: '0.5px solid #9CA3AF' }} headerStyle={{background:'#2463EB',color:'white'}} field="categoryName" header="Name" ></Column>
                    <Column style={{ border: '0.5px solid #9CA3AF' }} headerStyle={{background:'#2463EB',color:'white'}} header="Actions" body={(category) =>
                        <button onClick={() => handleCategoryDelete(category)} className="bg-red-500 text-white rounded-md px-4 py-2 w-full">Delete</button>} />
                </DataTable>
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
