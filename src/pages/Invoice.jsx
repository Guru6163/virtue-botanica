import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../apis/api';

function Invoice() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrderById(id)
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching order:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className='text-center mt-10'>Loading...</div>;
  }

  if (!order) {
    return <div text-center mt-10>No order found for ID: {id}</div>;
  }

  return (
    <div className="flex justify-center items-center mt-10 ">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full">
        <div className="bg-gray-800 text-white px-6 py-4">
          <h1 className="text-3xl font-bold">Invoice</h1>
          <p className="text-sm">Order ID: {order.orderId}</p>
        </div>
        <div className="px-6 py-4">
          <div className="border-b border-gray-300 pb-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Customer Details</h2>
            <p><span className="font-semibold">Name:</span> {order.customerDetails.firstName} {order.customerDetails.lastName}</p>
            <p><span className="font-semibold">Address:</span> {order.customerDetails.address}</p>
            <p><span className="font-semibold">City:</span> {order.customerDetails.city}, {order.customerDetails.state} - {order.customerDetails.zip}</p>
            <p><span className="font-semibold">Email:</span> {order.customerDetails.email}</p>
            <p><span className="font-semibold">Phone:</span> {order.customerDetails.phone}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Order Items</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Product Name</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Unit Price</th>
                  <th className="px-4 py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="px-4 py-2">{item.product.productName}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">Rs. {item.product.sellingCost}</td>
                    <td className="px-4 py-2">Rs. {item.quantity * item.product.sellingCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">Total: Rs. {order.totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
