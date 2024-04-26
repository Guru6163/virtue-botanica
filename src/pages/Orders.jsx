import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../apis/api';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { deleteOrder } from '../apis/api';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { updateOrderStatus } from '../apis/api';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [trackingId, setTrackingId] = useState(null);
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

    const refreshTable = () => {
        getAllOrders()
            .then(res => {
                setOrders(res);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    };

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
                await deleteOrder(orderId);
                accept();
                refreshTable()
            },
            reject
        });
    };

    const handleOrderClick = (orderId) => {
        navigate(`/orders/${orderId}`); // Navigate to order details page
    };

    const updateStatus = (order) => {
        setSelectedOrder(order);
        setSelectedStatus(order.deliveryStatus);
        setDisplayDialog(true);
    };

    const handleUpdateOrderStatus = () => {
        if (!selectedOrder) {
            return;
        }
        updateOrderStatus(selectedOrder.id, selectedStatus, trackingId)
            .then(async res => {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Order status updated successfully', life: 3000 });
                await refreshTable();
            })
            .catch(error => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update order status', life: 3000 });
            });
        setDisplayDialog(false);
    };

    const onHide = () => {
        setSelectedOrder(null);
        setSelectedStatus(null);
        setDisplayDialog(false);
    };

    const deliveryStatusBgColor = {
        'pending': 'bg-yellow-600 text-white font-bold p-1.5', // Yellow for pending
        'shipped': 'bg-blue-600 text-white font-bold p-1.5', // Steel blue for shipped
        'delivered': 'bg-green-600 text-white font-bold p-1.5' // Lime green for delivered
    };



    return (
        <div className="mt-8 px-4 md:px-8">
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>
            <Toast ref={toast} />
            <ConfirmPopup />
            <DataTable responsive showGridlines value={orders} style={{ border: '0.5px solid #9CA3AF' }} className='shadow-lg' loading={loading} emptyMessage="No Orders Available">
                <Column style={{ border: '0.5px solid #9CA3AF' }} headerStyle={{ background: '#2463EB', color: 'white' }} alignHeader='center' align='center' field="orderId" header="Order ID" />
                <Column style={{ border: '0.5px solid #9CA3AF' }} headerStyle={{ background: '#2463EB', color: 'white' }} alignHeader='center' align='center' header="Customer Name" body={rowData => `${rowData.customerDetails?.firstName ?? 'N/A'} ${rowData.customerDetails?.lastName ?? 'N/A'}`} />
                <Column style={{ border: '0.5px solid #9CA3AF' }} headerStyle={{ background: '#2463EB', color: 'white' }} alignHeader='center' align='center' field="timestamp" header="Ordered At" body={rowData => rowData.timestamp ? new Date(rowData.timestamp.toDate()).toLocaleString('en-US', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) : 'N/A'} />
                <Column style={{ border: '0.5px solid #9CA3AF' }} headerStyle={{ background: '#2463EB', color: 'white' }} alignHeader='center' align='center' field="customerDetails.phoneNumber" header="Phone Number" />
                <Column style={{ border: '0.5px solid #9CA3AF' }} headerStyle={{ background: '#2463EB', color: 'white' }} alignHeader='center' align='center' header="Items Count" body={rowData => rowData.items ? rowData.items.reduce((total, item) => total + parseInt(item.quantity), 0) : 'N/A'} />
                <Column style={{ border: '0.5px solid #9CA3AF' }} headerStyle={{ background: '#2463EB', color: 'white' }} alignHeader='center' align='center' field="totalPrice" header="Cost" body={rowData => `Rs.${rowData.totalPrice ?? 'N/A'}`} />
                <Column
                    style={{ border: '0.5px solid #9CA3AF' }}
                    headerStyle={{ background: '#2463EB', color: 'white' }}
                    alignHeader='center'
                    align='center'
                    field="deliveryStatus"
                    header="Delivery Status"
                    body={rowData => (
                        <div className={'capitalize ' + deliveryStatusBgColor[rowData.deliveryStatus]}  >
                            {rowData.deliveryStatus ?? 'N/A'}
                        </div>
                    )}
                />
                <Column
                style={{ border: '0.5px solid #9CA3AF' }} headerStyle={{ background: '#2463EB', color: 'white' }}
                    header="Actions"
                    body={(rowData) => (
                        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
                            <Button label="Invoice" className="p-button-sm mb-2 md:mb-0 md:mr-2" onClick={() => handleOrderClick(rowData.id)} />
                            <Button label="Update Status" className="p-button-sm p-button-secondary mb-2 md:mb-0 md:mr-2" onClick={() => updateStatus(rowData)} />
                            <Button label="Delete" className="p-button-sm p-button-danger" onClick={(e) => confirmDelete(e, rowData.id)} />
                        </div>
                    )}
                />
            </DataTable>
            <Dialog header="Update Order Status" visible={displayDialog} style={{ width: '400px' }} onHide={onHide} className="p-dialog-custom">
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12">
                        <label htmlFor="status" className="p-d-block">Status</label>
                        <Dropdown id="status" value={selectedStatus} options={[{ label: 'Pending', value: 'pending' }, { label: 'Shipped', value: 'shipped' }, { label: 'Delivered', value: 'delivered' }]} onChange={(e) => setSelectedStatus(e.value)} optionLabel="label" placeholder="Select a status" />
                    </div>
                    {selectedStatus !== 'pending' && (
                        <div className="p-field p-col-12 mt-4">
                            <label htmlFor="trackingId" className="p-d-block">Tracking ID</label>
                            <InputText id="trackingId" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} />
                        </div>
                    )}
                </div>
                <div className="flex justify-end space-x-4 mt-5">
                    <Button label="Cancel" icon="pi pi-times" onClick={onHide} className="p-button-sm p-button-danger p-ml-2" />
                    <Button label="Update" icon="pi pi-check" onClick={handleUpdateOrderStatus} className="p-button-sm p-button-primary" />
                </div>
            </Dialog>
        </div>
    );
}

export default Orders;
