import React from 'react';

function Orders() {
    // Dummy orders data
    const orders = [
        { orderId: 1, customerName: 'John Doe', phoneNumber: '1234567890', itemsCount: 3, cost: 100, deliveryStatus: 'Pending' },
        { orderId: 2, customerName: 'Jane Smith', phoneNumber: '9876543210', itemsCount: 2, cost: 75, deliveryStatus: 'Delivered' },
        { orderId: 3, customerName: 'Alice Johnson', phoneNumber: '4561237890', itemsCount: 4, cost: 120, deliveryStatus: 'Shipped' },
        { orderId: 4, customerName: 'John Doe', phoneNumber: '1234567890', itemsCount: 3, cost: 100, deliveryStatus: 'Pending' },
        { orderId: 5, customerName: 'Jane Smith', phoneNumber: '9876543210', itemsCount: 2, cost: 75, deliveryStatus: 'Delivered' },
        { orderId: 6, customerName: 'Alice Johnson', phoneNumber: '4561237890', itemsCount: 4, cost: 120, deliveryStatus: 'Shipped' },
        { orderId: 7, customerName: 'John Doe', phoneNumber: '1234567890', itemsCount: 3, cost: 100, deliveryStatus: 'Pending' },
        { orderId: 8, customerName: 'Jane Smith', phoneNumber: '9876543210', itemsCount: 2, cost: 75, deliveryStatus: 'Delivered' },
        { orderId: 9, customerName: 'Alice Johnson', phoneNumber: '4561237890', itemsCount: 4, cost: 120, deliveryStatus: 'Shipped' },
    ];

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-3xl font-semibold mb-4">Orders</h2>
            <div className="overflow-x-auto p-2">
                <table className="table-auto min-w-full border-collapse border border-gray-900">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="px-4 py-2 text-left text-white">Order ID</th>
                            <th className="px-4 py-2 text-left text-white">Customer Name</th>
                            <th className="px-4 py-2 text-left text-white">Phone Number</th>
                            <th className="px-4 py-2 text-left text-white">Items Count</th>
                            <th className="px-4 py-2 text-left text-white">Cost</th>
                            <th className="px-4 py-2 text-center text-white">Delivery Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.orderId}>
                                <td className="border px-4 py-2">{order.orderId}</td>
                                <td className="border px-4 py-2">{order.customerName}</td>
                                <td className="border px-4 py-2">{order.phoneNumber}</td>
                                <td className="border px-4 py-2">{order.itemsCount}</td>
                                <td className="border px-4 py-2">${order.cost}</td>
                                <td className={`border px-4 py-2 text-center ${getStatusColor(order.deliveryStatus)}`}>{order.deliveryStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Function to determine status color
function getStatusColor(status) {
    switch (status) {
        case 'Pending':
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
