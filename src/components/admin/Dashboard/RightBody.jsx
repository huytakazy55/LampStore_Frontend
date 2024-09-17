import React from 'react'
import './RightBody.css'
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import AnalyticOverview from './AnalyticOverview';
import AnalyticChart from './AnalyticChart';

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
        <AnalyticChart />
    </div>
  )
}

export default RightBody