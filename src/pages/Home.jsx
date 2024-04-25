import React, { useState, useEffect } from 'react';
import { FaIndustry, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';
import LineChart from '../components/LineChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllOrders } from '../apis/api';
import { convertToChartData } from '../utils';

function Dashboard() {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [allOrders, setAllOrders] = useState([])

    useEffect(() => {
        getAllOrders().then(res => setAllOrders(res))
        
    }, [])

    return (
        <div>
            <div className="flex justify-center">
                <div className="w-full px-8 grid grid-cols-1 md:grid-cols-1 gap-4 mt-8">
                    <div className='bg-white rounded-lg shadow-lg'>
                        <div className="p-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="mr-4 bg-blue-500 rounded-lg p-3">
                                    <FaIndustry className="text-white text-3xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Total Orders</h3>
                                    <p className="text-gray-600">$10,000</p>
                                </div>
                            </div>
                            <div className="text-gray-500">
                                <FaIndustry className="text-xl" />
                            </div>
                        </div>
                        {/* <LineChart data={convertToChartData(allOrders)} /> */}
                    </div>
                    <div className='bg-white rounded-lg shadow-lg'>
                        <div className="p-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="mr-4 bg-green-500 rounded-lg p-3">
                                    <FaChartLine className="text-white text-3xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Profit</h3>
                                    <p className="text-gray-600">$5,000</p>
                                </div>
                            </div>
                            <div className="text-gray-500">
                                <FaChartLine className="text-xl" />
                            </div>
                        </div>
                        <LineChart data={convertToChartData(allOrders)} />
                    </div>

                    <div className='bg-white rounded-lg shadow-lg'>
                        <div className="p-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="mr-4 bg-yellow-500 rounded-lg p-3">
                                    <FaMoneyBillWave className="text-white text-3xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Total Sales</h3>
                                    <p className="text-gray-600">$20,000</p>
                                </div>
                            </div>
                            <div className="text-gray-500">
                                <FaMoneyBillWave className="text-xl" />
                            </div>
                        </div>
                        {/* <LineChart /> */}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Dashboard;
