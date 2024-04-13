import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../apis/api';

function CreateOrder() {
    const [products, setProducts] = useState([])
    const [customerDetails, setCustomerDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: 'Tamil Nadu',
        zip: ''
    });

    const [items, setItems] = useState([]);
    const [orderDate, setOrderDate] = useState('');


    useEffect(() => {
        getAllProducts().then(res => setProducts(res))
    }, [])

    const handleDateChange = (e) => {
        setOrderDate(e.target.value);
    };

    const getTotalPrice = () => {
        return items.reduce((total, item) => {
            return total + item.product.sellingCost * item.quantity;
        }, 0);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails({ ...customerDetails, [name]: value });
    };

    const handleAddItem = () => {
        if (products.length > 0) {
            setItems([...items, { product: products[0], quantity: 1 }]);
        }
    };

    const handleChangeItemQuantity = (index, value) => {
        const updatedItems = [...items];
        updatedItems[index].quantity = value;
        setItems(updatedItems);
    };

    const handleRemoveItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const handleProductNameChange = (index, productName) => {
        const updatedItems = [...items];
        updatedItems[index].product = products.find(product => product.productName === productName);
        setItems(updatedItems);
    };


    const onSubmit = (data) => {
        
        console.log(data);
    };


    return (
        <div className="mx-auto mt-8 px-4 lg:px-8">
            <h2 className="text-3xl text-center font-semibold mb-6">Create Order</h2>
            <form onSubmit={onSubmit} className="w-full  mx-auto grid grid-cols-3 gap-6">
                <div className="border border-gray-300 rounded-md p-4">
                    <h3 className="text-xl font-semibold mb-4">Customer Information</h3>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-800 font-medium mb-2">First Name</label>
                        <input type="text" id="firstName" name="firstName" className="w-full border border-gray-300 rounded-md px-3 py-2" value={customerDetails.firstName} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-800 font-medium mb-2">Last Name</label>
                        <input type="text" id="lastName" name="lastName" className="w-full border border-gray-300 rounded-md px-3 py-2" value={customerDetails.lastName} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-800 font-medium mb-2">Email</label>
                        <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded-md px-3 py-2" value={customerDetails.email} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-800 font-medium mb-2">Phone</label>
                        <input type="tel" id="phone" name="phone" className="w-full border border-gray-300 rounded-md px-3 py-2" value={customerDetails.phone} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-800 font-medium mb-2">Address</label>
                        <input type="text" id="address" name="address" className="w-full border border-gray-300 rounded-md px-3 py-2" value={customerDetails.address} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="city" className="block text-gray-800 font-medium mb-2">City</label>
                        <input type="text" id="city" name="city" className="w-full border border-gray-300 rounded-md px-3 py-2" value={customerDetails.city} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="state" className="block text-gray-800 font-medium mb-2">State</label>
                        <input type="text" id="state" name="state" value='Tamil Nadu' className="w-full border border-gray-300 rounded-md px-3 py-2" onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="zip" className="block text-gray-800 font-medium mb-2">Pin Code</label>
                        <input type="text" id="zip" name="zip" className="w-full border border-gray-300 rounded-md px-3 py-2" value={customerDetails.zip} onChange={handleChange} />
                    </div>
                </div>
                <div className="border border-gray-300 rounded-md p-4 col-span-2">
                    <div className='flex justify-between items-center mb-2'>
                        <h3 className="text-xl font-semibold ">Order Details</h3>
                        <button type="button" onClick={handleAddItem} className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2">Add Item</button>
                    </div>

                    {items.map((item, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 mb-4 items-center">
                            <div>
                                <label className="block text-gray-800 font-medium mb-2">Item Name</label>
                                <select
                                    value={item.product.productName}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    onChange={(e) => handleProductNameChange(index, e.target.value)}
                                >
                                    {products.map((product, index) => (
                                        <option key={index} value={product.productName}>{product.productName}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-800 font-medium mb-2">Item Quantity</label>
                                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" value={item.quantity} onChange={(e) => handleChangeItemQuantity(index, e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-gray-800 font-medium mb-2">Cost</label>
                                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" value={item.product.sellingCost * item.quantity} disabled />
                            </div>
                            <div className="block mt-8">
                                <button type="button" onClick={() => handleRemoveItem(index)} className="bg-red-500 text-white rounded-md px-4 py-2">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-span-3 flex justify-end items-center border-gray-300 space-x-4">
                    <input type="date" id="orderDate" name="orderDate" className="border border-gray-300 rounded-md px-3 py-2" value={orderDate} onChange={handleDateChange} />
                    <p className="text-gray-800 font-bold text-xl ">Total Price: Rs.{getTotalPrice()}</p>
                    <button type="submit" className="bg-green-500 text-white rounded-md px-4 py-2">Submit Order</button>
                </div>
            </form>
        </div>
    );
}

export default CreateOrder;
