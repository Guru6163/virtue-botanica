import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../apis/api';
import { Button } from 'primereact/button';


function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize navigate hook

    useEffect(() => {
        getAllOrders()
            .then(res => {
                setOrders(res);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setLoading(false);
            });
    }, []);

    const handleOrderClick = (orderId) => {
        navigate(`/orders/${orderId}`); // Navigate to order details page
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-3xl font-semibold mb-4">Orders</h2>
            <Button label="Check" icon="pi pi-check" />
            <div className="overflow-x-auto p-2">
                <table className="table-auto min-w-full border-collapse border border-gray-900">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="px-4 py-2 text-left text-white">Order ID</th>
                            <th className="px-4 py-2 text-left text-white">Customer Name</th>
                            <th className="px-4 py-2 text-left text-white">Ordered At</th>
                            <th className="px-4 py-2 text-left text-white">Phone Number</th>
                            <th className="px-4 py-2 text-left text-white">Items Count</th>
                            <th className="px-4 py-2 text-left text-white">Cost</th>
                            <th className="px-4 py-2 text-center text-white">Delivery Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    Loading...
                                </td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No Orders Available
                                </td>
                            </tr>
                        ) : (
                            orders.map(order => (
                                <tr className='cursor-pointer hover:bg-gray-100' key={order.orderId} onClick={() => handleOrderClick(order.id)}>
                                    <td className="border px-4 py-2">{order.orderId ?? 'N/A'}</td>
                                    <td className="border px-4 py-2">{(order.customerDetails?.firstName ?? 'N/A') + ' ' + (order.customerDetails?.lastName ?? 'N/A')}</td>
                                    <td className="border px-4 py-2">{order.timestamp ? new Date(order.timestamp.toDate()).toLocaleString('en-US', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) : 'N/A'}</td>
                                    <td className="border px-4 py-2">{order.customerDetails?.phone ?  order.customerDetails?.phone : 'N/A'}</td>
                                    <td className="border px-4 py-2">{order.items ? order.items.reduce((total, item) => total + parseInt(item.quantity), 0) : 'N/A'}</td>
                                    <td className="border px-4 py-2">Rs.{order.totalPrice ?? 'N/A'}</td>
                                    <td className={`border px-4 py-2 text-center capitalize ${getStatusColor(order.deliveryStatus)}`}>{order.deliveryStatus ?? 'N/A'}</td>
                                    <td>

                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Function to determine status color
function getStatusColor(status) {
    switch (status) {
        case 'pending':
            return 'text-yellow-800 bg-yellow-200';
        case 'Delivered':
            return 'text-green-800 bg-green-200';
        case 'Shipped':
            return 'text-blue-800 bg-blue-200';
        default:
            return 'text-gray-800 bg-gray-200';
    }
}

export default Orders;
