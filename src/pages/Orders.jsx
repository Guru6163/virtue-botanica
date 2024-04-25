import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../apis/api';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
        <div className=" mt-8 px-8">
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>
            <DataTable showGridlines value={orders} loading={loading} emptyMessage="No Orders Available">
                <Column field="orderId" header="Order ID" sortable />
                <Column header="Customer Name" body={rowData => `${rowData.customerDetails?.firstName ?? 'N/A'} ${rowData.customerDetails?.lastName ?? 'N/A'}`} sortable />
                <Column field="timestamp" header="Ordered At" body={rowData => rowData.timestamp ? new Date(rowData.timestamp.toDate()).toLocaleString('en-US', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) : 'N/A'} sortable />
                <Column field="customerDetails.phone" header="Phone Number" sortable />
                <Column header="Items Count" body={rowData => rowData.items ? rowData.items.reduce((total, item) => total + parseInt(item.quantity), 0) : 'N/A'} sortable />
                <Column field="totalPrice" header="Cost" body={rowData => `Rs.${rowData.totalPrice ?? 'N/A'}`} sortable />
                <Column className='capitalize' field="deliveryStatus" header="Delivery Status" body={rowData => rowData.deliveryStatus ?? 'N/A'} sortable />
                <Column header="Actions" body={(rowData) => <Button label="Details" className="p-button-sm" onClick={() => handleOrderClick(rowData.id)} />} />
            </DataTable>
        </div>
    );
}

export default Orders;
