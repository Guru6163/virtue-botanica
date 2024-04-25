import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../apis/api';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { deleteOrder } from '../apis/api';

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

    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Order has been Deleted', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

    const confirmDelete = (event, orderId) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this Order?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                await deleteOrder(orderId)
                accept()
                getAllOrders()
                .then(res => {
                    setOrders(res);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching orders:', error);
                    setLoading(false);
                })
            },
            reject
        });
    };

    const handleOrderClick = (orderId) => {
        navigate(`/orders/${orderId}`); // Navigate to order details page
    };

    const updateStatus = (orderId) => {
        // Implement the update status functionality here
        // For demonstration purposes, let's log the order ID to the console
        console.log("Updating status for order with ID:", orderId);
    };

    return (
        <div className=" mt-8 px-8">
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>
            <Toast ref={toast} />
            <ConfirmPopup />
            <DataTable showGridlines value={orders} loading={loading} emptyMessage="No Orders Available">
                <Column field="orderId" header="Order ID" sortable />
                <Column header="Customer Name" body={rowData => `${rowData.customerDetails?.firstName ?? 'N/A'} ${rowData.customerDetails?.lastName ?? 'N/A'}`} sortable />
                <Column field="timestamp" header="Ordered At" body={rowData => rowData.timestamp ? new Date(rowData.timestamp.toDate()).toLocaleString('en-US', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) : 'N/A'} sortable />
                <Column field="customerDetails.phone" header="Phone Number" sortable />
                <Column header="Items Count" body={rowData => rowData.items ? rowData.items.reduce((total, item) => total + parseInt(item.quantity), 0) : 'N/A'} sortable />
                <Column field="totalPrice" header="Cost" body={rowData => `Rs.${rowData.totalPrice ?? 'N/A'}`} sortable />
                <Column className='capitalize' field="deliveryStatus" header="Delivery Status" body={rowData => rowData.deliveryStatus ?? 'N/A'} sortable />
                <Column header="Actions" body={(rowData) => (
                    <div className="flex justify-evenly">
                        <Button label="Invoice" className="p-button-sm" onClick={() => handleOrderClick(rowData.id)} />
                        <Button label="Update Status" className="p-button-sm p-button-secondary" onClick={() => updateStatus(rowData.id)} />
                        <Button label="Delete" className="p-button-sm p-button-danger" onClick={(e) => confirmDelete(e, rowData.id)} />
                    </div>
                )} />
            </DataTable>
        </div>
    );
}

export default Orders;
