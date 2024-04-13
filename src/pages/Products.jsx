import React, { useState } from 'react';

function Products() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        productName: '',
        manufacturingCost: 0,
        sellingCost: 0
    });

    const products = [
        {
            productName: 'Neem Soap',
            manufacturingCost: 250,
            sellingCost: 350,
            profit: 100
        },
        {
            productName: 'Handmade Candle',
            manufacturingCost: 150,
            sellingCost: 250,
            profit: 100
        }
    ];

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    };

    const handleDelete = (index) => {
        console.log('Deleting product at index:', index);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add the logic to submit the new product
        console.log('New product:', newProduct);
        // Clear the form fields
        setNewProduct({
            productName: '',
            manufacturingCost: 0,
            sellingCost: 0
        });
        // Close the modal
        toggleModal();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className='flex justify-between  mb-2'>
                <h2 className="text-2xl font-bold mb-4">Products</h2>
                <button onClick={toggleModal} className='px-4 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700'>Add New Product</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-900 text-white">
                            <th className="px-6 py-3 text-center font-medium border-b border-gray-300">Product Name</th>
                            <th className="px-6 py-3 text-center font-medium border-b border-gray-300">Manufacturing Cost</th>
                            <th className="px-6 py-3 text-center font-medium border-b border-gray-300">Profit</th>
                            <th className="px-6 py-3 font-medium border-b border-gray-300 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className='bg-white'>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300 text-center">{product.productName}</td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300 text-center">Rs.{product.manufacturingCost}</td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300 text-center">Rs.{product.profit}</td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300 text-center">
                                    <button onClick={() => handleDelete(index)} className="bg-red-500 text-white rounded-md px-4 py-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSubmit}>
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
                                                        <input type="text" name="productName" id="productName" value={newProduct.productName} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  sm:text-sm border-2 border-gray-300 rounded-md py-2 px-3" />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="manufacturingCost" className="block text-sm font-medium text-gray-700">Manufacturing Cost</label>
                                                        <input type="number" name="manufacturingCost" id="manufacturingCost" value={newProduct.manufacturingCost} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  sm:text-sm border-2 border-gray-300 rounded-md py-2 px-3" />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="sellingCost" className="block text-sm font-medium text-gray-700">Selling Cost</label>
                                                        <input type="number" name="sellingCost" id="sellingCost" value={newProduct.sellingCost} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md py-2 px-3" />
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
                                    <button onClick={toggleModal} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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
