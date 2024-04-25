import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function BasicDemo() {
    const navigate = useNavigate(); // Initialize usenavigate hook

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => navigate('/') // Navigate to the home page
        },
        {
            label: 'Orders',
            icon: 'pi pi-fw pi-star',
            command: () => navigate('/orders') // Navigate to the features page
        },
        {
            label: 'Create Order',
            icon: 'pi pi-fw pi-envelope',
            command: () => navigate('/create-order') // Navigate to the contact page
        },
        {
            label: 'Products',
            icon: 'pi pi-fw pi-envelope',
            command: () => navigate('/products') // Navigate to the contact page
        }
    ];

    const start = (
        <div className='bg-green-700 text-white px-4 py-1 my-2 mr-6' style={{ fontSize: '1.5rem', fontWeight: 600 }}>
            Virtue Botanica
        </div>
    );

    return (
        <div style={{ backgroundColor: '#3f51b5' }}>
            <Menubar model={items} start={start} />
        </div>
    );
}
