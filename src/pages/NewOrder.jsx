import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useForm } from 'react-hook-form';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { addNewOrder, getAllProducts } from '../apis/api';
import { Toast } from 'primereact/toast';




export default function CreateOrder() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [addedItems, setAddedItems] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [courierCharge, setCourierCharge] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const toast = useRef(null);

    useEffect(() => {
        getAllProducts().then(res => setProducts(res))
    }, [])

    const showDialog = () => {
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const handleAddItem = () => {
        if (selectedProduct && quantity > 0) {
            const cost = selectedProduct.sellingCost * quantity;
            setAddedItems([...addedItems, { product: selectedProduct, quantity: quantity, cost }]);
            setSelectedProduct(null);
            setQuantity(0);
            hideDialog();
        }
    };

    const handleRemoveItem = (rowData) => {
        const updatedItems = addedItems.filter(item => item.product.productName !== rowData.product.productName);
        setAddedItems(updatedItems);
    };

    const removeButton = (rowData) => {
        return <Button icon="pi pi-trash" className="p-button-danger" label='Remove Item' onClick={() => handleRemoveItem(rowData)} />;
    };

    const calculateTotal = () => {
        let totalPrice = addedItems.reduce((total, item) => total + item.cost, 0);
        return (
            <div className='text-lg' style={{ textAlign: 'right', paddingRight: '1rem', paddingTop: '0.5rem', fontWeight: 'bold' }}>
                Total Price: Rs.{totalPrice}
            </div>
        );
    };


    const onSubmit = async (data) => {
        if (addedItems.length === 0) {
            return;
        }
        const orderDetails = { customerDetails: data, items: addedItems, totalPrice: totalCost, courierCharge };
        try {
            const orderId = await addNewOrder(orderDetails);
            if (orderId) {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Order placed successfully', life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to place order', life: 3000 });
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error adding order', life: 3000 });
        }
    };
    

    return (
        <div className='px-8 py-6'>
            <Toast ref={toast} />
            <div className='font-semibold mb-4 text-xl'>Customer Details</div>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className="card flex flex-col md:flex-row gap-3">
                    <div className="p-inputgroup flex-1 shadow-lg">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText {...register('firstName', { required: true })} placeholder="First Name" />
                    </div>
                    <div className="p-inputgroup flex-1 shadow-lg">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText {...register('lastName', { required: true })} placeholder="Last Name" />
                    </div>
                    <div className="p-inputgroup flex-1 shadow-lg">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-phone"></i>
                        </span>
                        <InputText {...register('phoneNumber', { required: true })} placeholder="Phone Number" />
                    </div>
                    <div className="p-inputgroup flex-1 shadow-lg">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-envelope"></i>
                        </span>
                        <InputText {...register('email', { required: true })} placeholder="Email" />
                    </div>
                </div>
                <div className="card flex flex-col md:flex-row gap-3">
                    <div className="p-inputgroup flex-1 shadow-lg">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-address-book"></i>
                        </span>
                        <InputText {...register('address', { required: true })} placeholder="Address" />
                    </div>
                    <div className="p-inputgroup flex-1 shadow-lg">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-address-book"></i>
                        </span>
                        <InputText {...register('city', { required: true })} placeholder="City" />
                    </div>
                    <div className="p-inputgroup flex-1 shadow-lg">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-address-book"></i>
                        </span>
                        <InputText {...register('state', { required: true })} placeholder="State" />
                    </div>
                    <div className="p-inputgroup flex-1 shadow-lg">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-address-book"></i>
                        </span>
                        <InputText {...register('pincode', { required: true })} placeholder="Pincode" />
                    </div>
                </div>
                <div className="card flex flex-col md:flex-row gap-3">
                    {errors.firstName && <span className="text-red-500">First name is required</span>}
                    {errors.lastName && <span className="text-red-500">Last name is required</span>}
                    {errors.phoneNumber && <span className="text-red-500">Phone number is required</span>}
                    {errors.email && <span className="text-red-500">Email is required</span>}
                    {errors.address && <span className="text-red-500">Address is required</span>}
                    {errors.city && <span className="text-red-500">City is required</span>}
                    {errors.state && <span className="text-red-500">State is required</span>}
                    {errors.pincode && <span className="text-red-500">Pincode is required</span>}
                </div>

            </form>
            <Divider className='text-black' />
            <div className='mt-3 flex justify-between items-center'>
                <div className='text-xl font-semibold'>Order Details</div>
                <Button label='Add Items' onClick={showDialog}></Button>
                <Dialog visible={dialogVisible} onHide={hideDialog} header="Add Items" style={{ width: '25vw' }}>
                    <form className='flex flex-col space-y-4'>
                        <Dropdown
                            value={selectedProduct}
                            options={products}
                            optionLabel='productName'
                            placeholder='Select Item'
                            onChange={(e) => setSelectedProduct(e.value)}
                        />
                        <InputNumber
                            value={quantity}
                            placeholder='Enter Quantity'
                            onChange={(e) => setQuantity(e.value)}
                        />
                    </form>
                    <div className='flex justify-end space-x-2 mt-4'>
                        <Button label='Cancel' severity='danger' onClick={hideDialog} />
                        <Button label='Add Item' onClick={handleAddItem} />
                    </div>
                </Dialog>
            </div>
            <div className="card mt-6">
                <DataTable size='small' className='shadow-lg' showGridlines value={addedItems} footer={calculateTotal()} >
                    <Column style={{ border: '0.5px solid #9CA3AF' }} headerClassName='py-2' alignHeader='center' align='center' headerStyle={{ background: '#2463EB', color: 'white' }} field="product.productName" header="Item Name"></Column>
                    <Column style={{ border: '0.5px solid #9CA3AF' }} headerClassName='py-2' alignHeader='center' align='center' headerStyle={{ background: '#2463EB', color: 'white' }} field="product.category" header="Category"></Column>
                    <Column style={{ border: '0.5px solid #9CA3AF' }} headerClassName='py-2' alignHeader='center' align='center' headerStyle={{ background: '#2463EB', color: 'white' }} field="quantity" header="Quantity"></Column>
                    <Column style={{ border: '0.5px solid #9CA3AF' }} headerClassName='py-2' alignHeader='center' align='center' headerStyle={{ background: '#2463EB', color: 'white' }} field="cost" header="Cost"></Column>
                    <Column style={{ border: '0.5px solid #9CA3AF' }} headerClassName='py-2' alignHeader='center' align='center' bodyStyle={{ width: '200px' }} headerStyle={{ background: '#2463EB', color: 'white' }} body={removeButton} header="Action"></Column>
                </DataTable>
            </div>

            <div className='text-center my-4'>{addedItems && addedItems.length === 0 ? 'No Items Added Yet' : ''}</div>
            <div className='flex justify-end'>
                <div className='flex space-x-4'>
                    <div className='flex flex-col'>
                        <small id="username-help">
                            Courier Charge.
                        </small>
                        <InputText id="courierCharge" value={courierCharge} onChange={(e) => {
                            setCourierCharge(e.target.value)
                            setTotalCost((addedItems.reduce((total, item) => total + item.cost, 0)) + parseInt(e.target.value))
                        }} />
                    </div>
                    <Button onClick={handleSubmit(onSubmit)} label={"Place Order value of Rs." + (totalCost)} className="mt-4" />
                </div>
            </div>
        </div>
    )
}
