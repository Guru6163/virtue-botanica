import React, { useState } from 'react';
import { FaIndustry, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';
import LineChart from '../components/LineChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Dashboard() {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div>
            <div className="w-full flex justify-center mt-8 items-center">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="w-full md:w-auto h-10 px-3 rounded-lg border border-gray-300 mb-2 md:mb-0"
                />
                <span className="mx-2">to</span>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="w-full md:w-auto h-10 px-3 rounded-lg border border-gray-300"
                />
            </div>
            <div className="flex justify-center">
                <div className="w-full max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className='bg-white rounded-lg shadow-lg'>
                        <div className="p-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="mr-4 bg-blue-500 rounded-lg p-3">
                                    <FaIndustry className="text-white text-3xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Manufacturing Cost</h3>
                                    <p className="text-gray-600">$10,000</p>
                                </div>
                            </div>
                            <div className="text-gray-500">
                                <FaIndustry className="text-xl" />
                            </div>
                        </div>
                        <LineChart />
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
                        <LineChart />
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
                        <LineChart />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Dashboard;
