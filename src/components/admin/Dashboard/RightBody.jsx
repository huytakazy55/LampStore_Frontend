import React from 'react'
import './RightBody.css'
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import AnalyticOverview from './AnalyticOverview';
import AnalyticChart from './AnalyticChart';
import CalendarComponent from './Calendar';

const RightBody = () => {
  return (
    <div className='RightBody'>
        <div className='RightBody-title'>
            Trang chủ
        </div>
        <div className='RightBody-breadcrumbs'>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" href="/admin">
                    Home
                </Link>
                <Link color="inherit" href="/product">
                    Product
                </Link>
                <Typography color="textPrimary">Details</Typography>
            </Breadcrumbs>
        </div>
        <AnalyticOverview />
        <div className='RightBody-analyticchart'>
            <AnalyticChart />
        </div>
        <div className='RightBody-bottom'>
            <div className='RightBody-bottom-category'>

            </div>
            <div className='RightBody-bottom-calendar'>
                <CalendarComponent />
            </div>
        </div>
    </div>
  )
}

export default RightBody