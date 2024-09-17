import React from 'react'
import './AnalyticOverview.css'

const AnalyticOverview = () => {
  return (
    <div className='AnalyticOverview'>
        <div className='analytic-card'>
            <div className='analytic-icon'>
                <i class='bx bxs-user' ></i>
            </div>
            <div className='analytic-content'>
                <div className='analytic-count'>
                    200+
                </div>
                <div className='analytic-name'>
                    Number of users
                </div>
            </div>
        </div>
        <div className='analytic-card'>
            <div className='analytic-icon'>
                <i class="bx bxs-detail"></i>
            </div>
            <div className='analytic-content'>
                <div className='analytic-count'>
                    500+
                </div>
                <div className='analytic-name'>
                    Stock Products
                </div>
            </div>
        </div>
        <div className='analytic-card'>
            <div className='analytic-icon'>
                <i class='bx bxl-telegram' ></i>
            </div>
            <div className='analytic-content'>
                <div className='analytic-count'>
                    1000+
                </div>
                <div className='analytic-name'>
                    Sales products
                </div>
            </div>
        </div>
        <div className='analytic-card'>
            <div className='analytic-icon'>
                <i class='bx bxs-truck'></i>
            </div>
            <div className='analytic-content'>
                <div className='analytic-count'>
                    20+
                </div>
                <div className='analytic-name'>
                    Products Delivery
                </div>
            </div>
        </div>
    </div>
  )
}

export default AnalyticOverview