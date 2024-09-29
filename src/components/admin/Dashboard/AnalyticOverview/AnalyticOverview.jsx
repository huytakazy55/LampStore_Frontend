import React, { useContext, useEffect, useState } from 'react'
import './AnalyticOverview.css'
import { ThemeContext } from '../../../../ThemeContext'
import ProductManage from '../../../../Services/ProductManage';
import CategoryManage from '../../../../Services/CategoryManage';

const AnalyticOverview = () => {
    const {themeColors} = useContext(ThemeContext);
    const [productCount, setProductCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    useEffect(() => {
        ProductManage.GetProduct()
        .then((res) => {
            setProductCount(res.data.$values.length);
        })
        .catch((err) => {
            console.log(err);
        })
        CategoryManage.GetCategory()
        .then((res) => {
            setCategoryCount(res.data.$values.length);
        })
        .catch((err) => {
            console.log(err)
        })
    },[])
    return (
        <div className='AnalyticOverview'>
            <div style={{background: `linear-gradient(0deg, ${themeColors.StartColorLinear} 0%, ${themeColors.EndColorLinear} 100%)`, color: '#fff'}} className='analytic-card'>
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
            <div style={{background: `linear-gradient(0deg, ${themeColors.StartColorLinear} 0%, ${themeColors.EndColorLinear} 100%)`, color: '#fff'}} className='analytic-card'>
                <div className='analytic-icon'>
                    <i class="bx bxs-detail"></i>
                </div>
                <div className='analytic-content'>
                    <div className='analytic-count'>
                        {categoryCount}+
                    </div>
                    <div className='analytic-name'>
                        Categories
                    </div>
                </div>
            </div>
            <div style={{background: `linear-gradient(0deg, ${themeColors.StartColorLinear} 0%, ${themeColors.EndColorLinear} 100%)`, color: '#fff'}} className='analytic-card'>
                <div className='analytic-icon'>
                    <i class='bx bxl-telegram' ></i>
                </div>
                <div className='analytic-content'>
                    <div className='analytic-count'>
                        {productCount}+
                    </div>
                    <div className='analytic-name'>
                        Sales products
                    </div>
                </div>
            </div>
            <div style={{background: `linear-gradient(0deg, ${themeColors.StartColorLinear} 0%, ${themeColors.EndColorLinear} 100%)`, color: '#fff'}} className='analytic-card'>
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