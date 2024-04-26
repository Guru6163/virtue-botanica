import React, { useState, useEffect } from 'react';
import { FaIndustry, FaChartLine } from 'react-icons/fa';
import LineChart from '../components/LineChart';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllOrders } from '../apis/api';
import { convertToChartData, convertToOrderCountData } from '../utils';
import { Dropdown } from 'primereact/dropdown';


function Dashboard() {
    const [selectedFilter, setSelectedFilter] = useState('week');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [allOrders, setAllOrders] = useState([])

    const filters = [
        { name: 'Week', code: 'week' },
        { name: 'Month', code: 'month' },
        { name: 'Year', code: 'year' },
        { name: 'Past 7 Days', code: 'past7' },
        { name: 'Past 14 Days', code: 'past14' },
        { name: 'Past 30 Days', code: 'past30' }
    ];


    useEffect(() => {
        getAllOrders().then(res => setAllOrders(res));
    }, []);

    return (
        <div>
            <div className="flex justify-center mt-6">
                <Dropdown value={selectedFilter} onChange={(e) => setSelectedFilter(e.value)} options={filters} optionLabel="name" optionValue='code'
                    placeholder="Select a Filter" className='shadow-lg' style={{ width: '300px' }} />
            </div>
            <div className="flex justify-center">
                <div className="w-full px-8 grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className='bg-white rounded-lg shadow-lg'>
                        <div className="p-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="mr-4 bg-blue-500 rounded-lg p-3">
                                    <FaIndustry className="text-white text-3xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Total Orders</h3>
                                    <p className="text-gray-600 font-semibold">{(convertToOrderCountData(allOrders).series[0].data).reduce((total, current) => total + current, 0)}</p>
                                </div>
                            </div>
                            <div className="text-gray-500">
                                <FaIndustry className="text-xl" />
                            </div>
                        </div>
                        <LineChart data={convertToOrderCountData(allOrders, selectedFilter)} />
                    </div>
                    <div className='bg-white rounded-lg shadow-lg'>
                        <div className="p-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="mr-4 bg-green-500 rounded-lg p-3">
                                    <FaChartLine className="text-white text-3xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Total Rvenue</h3>
                                    <p className="text-gray-600 font-semibold">Rs.{(convertToChartData(allOrders).series[0].data).reduce((total, current) => total + current, 0)}</p>
                                </div>
                            </div>
                            <div className="text-gray-500">
                                <FaChartLine className="text-xl" />
                            </div>
                        </div>
                        <LineChart data={convertToChartData(allOrders, selectedFilter)} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Dashboard;
