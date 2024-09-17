import React, { useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import './AnalyticChart.css';
import { useTranslation } from 'react-i18next';

const dataDaily = [
  { name: 'Thứ Hai', sale1: 100, sale2: 400 },
  { name: 'THứ Ba', sale1: 320, sale2: 310 },
  { name: 'Thứ Tư', sale1: 150, sale2: 310 },
  { name: 'Thứ Năm', sale1: 250, sale2: 210 },
  { name: 'Thứ Sáu', sale1: 120, sale2: 210 },
  { name: 'Thứ Bảy', sale1: 100, sale2: 210 },
  { name: 'Chủ Nhật', sale1: 420, sale2: 210 },
];

const dataWeekly = [
  { name: 'Week 1', sale1: 600, sale2: 800 },
  { name: 'Week 2', sale1: 700, sale2: 900 },
];

const dataMonthly = [
  { name: 'Tháng 1', sale1: 2000, sale2: 3500 },
  { name: 'Tháng 2', sale1: 4200, sale2: 2600 },
  { name: 'Tháng 3', sale1: 3100, sale2: 5600 },
  { name: 'Tháng 4', sale1: 1200, sale2: 4500 },
  { name: 'Tháng 5', sale1: 4000, sale2: 2600 },
  { name: 'Tháng 6', sale1: 2200, sale2: 3600 },
  { name: 'Tháng 7', sale1: 3200, sale2: 2600 },
  { name: 'Tháng 8', sale1: 3500, sale2: 5600 },
  { name: 'Tháng 9', sale1: 1200, sale2: 3600 },
  { name: 'Tháng 10', sale1: 3200, sale2: 2600 },
  { name: 'Tháng 11', sale1: 2200, sale2: 4600 },
  { name: 'Tháng 12', sale1: 4200, sale2: 5600 },
];

const dataTrafficByMonth = [
    { name: 'January', value: 400 },
    { name: 'February', value: 300 },
    { name: 'March', value: 300 },
    { name: 'April', value: 200 },
    { name: 'May', value: 278 },
    { name: 'June', value: 189 },
  ];
  
  // Colors for PieChart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF00A0', '#A000FF'];

const AnalyticChart = () => {
    const {t} = useTranslation();
    const [timeRange, setTimeRange] = useState('daily');
    const data = timeRange === 'daily' ? dataDaily : timeRange === 'weekly' ? dataWeekly : dataMonthly;

    return (
        <div className='Analytic-chart'>
            <div className='Analytic-chart-line'>
                <Paper sx={{ mt: 4, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        {(t('SaleOverTime'))} ({timeRange.charAt(0).toUpperCase() + timeRange.slice(1)})
                        <div className='Analytic-timeRange'>
                            <a href='#' style={{color: timeRange == 'daily' ? 'green' : ''}} onClick={() => setTimeRange('daily')}>Daily</a>
                            <a href='#' style={{color: timeRange == 'weekly' ? 'green' : ''}} onClick={() => setTimeRange('weekly')}>Weekly</a>
                            <a href='#' style={{color: timeRange == 'monthly' ? 'green' : ''}} onClick={() => setTimeRange('monthly')}>Monthly</a>
                        </div>
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <Line type="monotone" dataKey="sale1" stroke="#ff00bd" />
                            <Line type="monotone" dataKey="sale2" stroke="#0001ff" />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend layout="horizontal" align="right" verticalAlign="top" height={30} />
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
            </div>
            <div className='Analytic-chart-pie'>
                <Paper sx={{ mt: 4, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Traffic by Month
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={dataTrafficByMonth}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label
                            >
                                {dataTrafficByMonth.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend layout="horizontal" align="right" verticalAlign="top" height={30} />
                        </PieChart>
                    </ResponsiveContainer>
                </Paper>
            </div>
        </div>
    );
}

export default AnalyticChart;