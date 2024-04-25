import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-700 py-1">
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img src='https://res.cloudinary.com/dua8sce9b/image/upload/v1714064785/Screenshot_2024-04-25_at_10.34.01_PM-removebg-preview_cvuhgr.png' className="h-10"></img>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className="text-white hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-md font-medium">Home</Link>
                                <Link to="/orders" className="text-white hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-md font-medium">Orders</Link>
                                <Link to="/create-order" className="text-white hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-md font-medium">Create Order</Link>
                                <Link to="/products" className="text-white hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-md font-medium">Products</Link>
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        <Link to="/orders" className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Orders</Link>
                        <Link to="/create-order" className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Create Order</Link>
                        <Link to="/products" className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Products</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;