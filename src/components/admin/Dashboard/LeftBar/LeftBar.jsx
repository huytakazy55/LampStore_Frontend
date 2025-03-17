import React, {useContext} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../ThemeContext';

const LeftBar = () => {
    const {t} = useTranslation();
    const leftBar = useSelector((state) => state.leftbar.leftbar);
    const { themeColors } = useContext(ThemeContext);
    console.log(leftBar);
  return (
    <div style={{background: `linear-gradient(0deg, ${themeColors.StartColorLinear} 0%, ${themeColors.EndColorLinear} 100%)`}} className={`h-full border-r border-gray-300 transition-all duration-400 ease-linear overflow-hidden ${leftBar ? 'w-[4.5rem] relative' : 'w-[13%]'}`}>
        <ul className='p-4 text-white'>
            <Link className='left-10 text-white font-medium w-52 transition-all duration-400 ease-in-out' to="/admin">
                <li className='relative p-[10px] h-10 flex justify-start items-center rounded-md mb-2 cursor-pointer hover:bg-fuchsia-500'>
                    <i className={`bx bxs-home text-h3 -mt-1 mr-4 transition-all duration-400 ease-in-out ${leftBar ? 'flex justify-center items-center mr-40' : ''}`}></i>
                    <span>{t('HomePage')}</span>                    
                </li>
            </Link>

            <Link className='left-10 text-white font-medium w-52 transition-all duration-400 ease-in-out' to="/admin/users">
                <li className='relative p-[10px] h-10 flex justify-start items-center rounded-md mb-2 cursor-pointer hover:bg-fuchsia-500'>
                    <i className={`bx bxs-user text-h3 -mt-1 mr-4 transition-all duration-400 ease-in-out ${leftBar ? 'flex justify-center items-center mr-40' : ''}`}></i>
                    <span>{t('Users')}</span>
                </li>
            </Link>

            <Link className='left-10 text-white font-medium w-52 transition-all duration-400 ease-in-out' to="/admin/category">
                <li className='relative p-[10px] h-10 flex justify-start items-center rounded-md mb-2 cursor-pointer hover:bg-fuchsia-500'>
                    <i className={`bx bxs-category text-h3 -mt-1 mr-4 transition-all duration-400 ease-in-out ${leftBar ? 'flex justify-center items-center mr-40' : ''}`}></i>
                    <span>{t('Category')}</span>
                </li>
            </Link>

            <Link className='left-10 text-white font-medium w-52 transition-all duration-400 ease-in-out' to="/admin/products">
                <li className='relative p-[10px] h-10 flex justify-start items-center rounded-md mb-2 cursor-pointer hover:bg-fuchsia-500'>
                    <i className={`bx bxs-package text-h3 -mt-1 mr-4 transition-all duration-400 ease-in-out ${leftBar ? 'flex justify-center items-center mr-40' : ''}`}></i>
                    <span>{t('Products')}</span>
                </li>
            </Link>

            <Link className='left-10 text-white font-medium w-52 transition-all duration-400 ease-in-out' to="/admin">
                <li className='relative p-[10px] h-10 flex justify-start items-center rounded-md mb-2 cursor-pointer hover:bg-fuchsia-500'>
                    <i className={`bx bxs-store-alt text-h3 -mt-1 mr-4 transition-all duration-400 ease-in-out ${leftBar ? 'flex justify-center items-center mr-40' : ''}`}></i>
                    <span>{t('Orders')}</span>
                </li>
            </Link>

            <Link className='left-10 text-white font-medium w-52 transition-all duration-400 ease-in-out' to="/admin">
                <li className='relative p-[10px] h-10 flex justify-start items-center rounded-md mb-2 cursor-pointer hover:bg-fuchsia-500'>
                    <i className={`bx bxs-book-content text-h3 -mt-1 mr-4 transition-all duration-400 ease-in-out ${leftBar ? 'flex justify-center items-center mr-40' : ''}`}></i>
                    <span>{t('Delivery')}</span>
                </li>
            </Link>

            <Link className='left-10 text-white font-medium w-52 transition-all duration-400 ease-in-out' to="/admin">
                <li className='relative p-[10px] h-10 flex justify-start items-center rounded-md mb-2 cursor-pointer hover:bg-fuchsia-500'>
                    <i className={`bx bxs-cog text-h3 -mt-1 mr-4 transition-all duration-400 ease-in-out ${leftBar ? 'flex justify-center items-center mr-40' : ''}`}></i>
                    <span>{t('Setting')}</span>
                </li>
            </Link>
        </ul>
    </div>
  )
}

export default LeftBar