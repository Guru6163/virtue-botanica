import React, { useState } from 'react'; 
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation


export default function BasicDemo() {
    const navigate = useNavigate(); // Initialize usenavigate hook
    const [selectedItem, setSelectedItem] = useState(null); // State to keep track of the selected item

    const menuItemTemplate = (item) => {
        const isSelected = selectedItem === item.label; // Check if the current item is selected
        const textColor = isSelected ? 'text-black' : 'text-white'; // Conditionally set text color
        return (
            <div className={`p-menuitem custom-menu-item gap-4 ${isSelected ? 'bg-white rounded-md' : ''}`} onClick={() => handleItemClick(item)}>
                <div className={`px-4 py-2 text-center ${textColor} cursor-pointer menu-item`} >{item.label}</div>
            </div>
        );
    };

    const handleItemClick = (item) => {
        setSelectedItem(item.label); // Set the selected item
        item.command(); // Execute the command associated with the item
    };

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            template: menuItemTemplate,
            command: () => navigate('/') // Navigate to the home page
        },
        {
            label: 'Orders',
            icon: 'pi pi-fw pi-star',
            template: menuItemTemplate,
            command: () => navigate('/orders') // Navigate to the features page
        },
        {
            label: 'Create Order',
            icon: 'pi pi-fw pi-envelope',
            template: menuItemTemplate,
            command: () => navigate('/create-order') // Navigate to the contact page
        },
        {
            label: 'Products',
            icon: 'pi pi-fw pi-envelope',
            template: menuItemTemplate,
            command: () => navigate('/products') // Navigate to the contact page
        }
    ];

    const start = (
        <div className='text-white px-4 py-1 my-2 mr-6' style={{ fontSize: '1.5rem', fontWeight: 600 }}>
            Virtue Botanica
        </div>
    );

    return (
        <div>
            <style>
                {`
                    .menu-item:hover {
                        color: black !important; // Change text color to black on hover
                    }
                `}
            </style>
            <Menubar style={{ backgroundColor: '#2463EB', margin:'-2px -2px' }} model={items} start={start} />
        </div>
    );
}
