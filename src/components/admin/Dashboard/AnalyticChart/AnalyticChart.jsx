import React, { useContext, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, Legend, PieChart, Pie, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../ThemeContext';

const dataDaily = [
  { name: 'Thứ Hai', sale1: 100, sale2: 400 },
  { name: 'Thứ Ba', sale1: 320, sale2: 310 },
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
    const { t } = useTranslation();
    const [timeRange, setTimeRange] = useState('daily');
    const data = timeRange === 'daily' ? dataDaily : timeRange === 'weekly' ? dataWeekly : dataMonthly;
    const {themeColors} = useContext(ThemeContext);

    return (
        <div className='w-full flex justify-between items-center relative'>
            <div className='relative w-[65%]'>
                <Paper sx={{ mt: 4, p: 2 }}>
                    <Typography variant="h6" gutterBottom style={{color: `${themeColors.EndColorLinear}`}}> 
                        Sale Over Time ({timeRange.charAt(0).toUpperCase() + timeRange.slice(1)})
                        <div className='absolute top-12 right-4'>
                            <a className='ml-6 font-medium' href='#' style={{ color: timeRange === 'daily' ? `${themeColors.StartColorLinear}` : `${themeColors.EndColorLinear}` }} onClick={() => setTimeRange('daily')}>Daily</a>
                            <a className='ml-6 font-medium' href='#' style={{ color: timeRange === 'weekly' ? `${themeColors.StartColorLinear}` : `${themeColors.EndColorLinear}` }} onClick={() => setTimeRange('weekly')}>Weekly</a>
                            <a className='ml-6 font-medium' href='#' style={{ color: timeRange === 'monthly' ? `${themeColors.StartColorLinear}` : `${themeColors.EndColorLinear}` }} onClick={() => setTimeRange('monthly')}>Monthly</a>
                        </div>
                    </Typography>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={data}>
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend layout="horizontal" align="right" verticalAlign="top" height={30} />
                            <Line type="monotone" dataKey="sale1" stroke={`${themeColors.StartColorLinear}`} />
                            <Line type="monotone" dataKey="sale2" stroke={`${themeColors.EndColorLinear}`} />
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
            </div>
            <div className='relative w-2/6'>
                <Paper sx={{ mt: 4, p: 2 }}>
                    <Typography variant="h6" gutterBottom style={{color: `${themeColors.EndColorLinear}`}}>
                        Traffic by Month
                    </Typography>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={dataTrafficByMonth}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={90}
                                fill="#8884d8"
                                paddingAngle={3}
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
