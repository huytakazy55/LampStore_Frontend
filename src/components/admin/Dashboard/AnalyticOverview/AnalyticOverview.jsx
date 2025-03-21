import React, { useContext, useEffect, useState } from 'react'
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
        <div className='w-full flex justify-between items-center'>
            <div style={{background: `linear-gradient(0deg, ${themeColors.StartColorLinear} 0%, ${themeColors.EndColorLinear} 100%)`, color: '#fff'}} className='rounded-2xl w-[18%] px-6 flex justify-around items-center h-28 text-white'>
                <div className='flex justify-center items-center w-14 h-14 rounded-[50%] p-1 bg-violet-700/35 text-white'>
                    <i class='bx bxs-user text-h2'></i>
                </div>
                <div className='w-3/5'>
                    <div className='text-h2 font-semibold'>
                        200+
                    </div>
                    <div className='text-normal font-medium'>
                        Number of users
                    </div>
                </div>
            </div>
            <div style={{background: `linear-gradient(0deg, ${themeColors.StartColorLinear} 0%, ${themeColors.EndColorLinear} 100%)`, color: '#fff'}} className='rounded-2xl w-[18%] px-6 flex justify-around items-center h-28 text-white'>
                <div className='flex justify-center items-center w-14 h-14 rounded-[50%] p-1 bg-violet-700/35 text-white'>
                    <i class='bx bxs-detail text-h2'></i>
                </div>
                <div className='w-3/5'>
                    <div className='text-h2 font-semibold'>
                        {categoryCount}+
                    </div>
                    <div className='text-normal font-medium'>
                        Categories
                    </div>
                </div>
            </div>
            <div style={{background: `linear-gradient(0deg, ${themeColors.StartColorLinear} 0%, ${themeColors.EndColorLinear} 100%)`, color: '#fff'}} className='rounded-2xl w-[18%] px-6 flex justify-around items-center h-28 text-white'>
                <div className='flex justify-center items-center w-14 h-14 rounded-[50%] p-1 bg-violet-700/35 text-white'>
                    <i class='bx bxl-telegram text-h2'></i>
                </div>
                <div className='w-3/5'>
                    <div className='text-h2 font-semibold'>
                        {productCount}+
                    </div>
                    <div className='text-normal font-medium'>
                        Sales products
                    </div>
                </div>
            </div>
            <div style={{background: `linear-gradient(0deg, ${themeColors.StartColorLinear} 0%, ${themeColors.EndColorLinear} 100%)`, color: '#fff'}} className='rounded-2xl w-[18%] px-6 flex justify-around items-center h-28 text-white'>
                <div className='flex justify-center items-center w-14 h-14 rounded-[50%] p-1 bg-violet-700/35 text-white'>
                    <i class='bx bxs-truck text-h2'></i>
                </div>
                <div className='w-3/5'>
                    <div className='text-h2 font-semibold'>
                        20+
                    </div>
                    <div className='text-normal font-medium'>
                        Products Delivery
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalyticOverview