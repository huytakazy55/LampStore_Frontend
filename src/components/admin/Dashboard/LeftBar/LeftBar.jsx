import React, {useContext} from 'react'
import './LeftBar.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../ThemeContext';

const LeftBar = () => {
    const {t} = useTranslation();
    const leftBar = useSelector((state) => state.leftbar.leftbar);
    const { themeColors } = useContext(ThemeContext);
  return (
    <div style={{background: `linear-gradient(0deg, ${themeColors.StartColorLinear} 0%, ${themeColors.EndColorLinear} 100%)`}} className={`LeftBar ${leftBar ? 'minimize' : ''}`}>
        <ul>
            <Link to="/admin">
                <li>
                    <i class='bx bxs-home'></i>
                    <span>{t('HomePage')}</span>                    
                </li>
            </Link>

            <Link to="/admin/users">
                <li>
                    <i class='bx bxs-user'></i>
                    <span>{t('Users')}</span>
                </li>
            </Link>

            <Link to="/admin/category">
                <li>
                    <i class='bx bxs-category'></i>
                    <span>{t('Category')}</span>
                </li>
            </Link>

            <Link to="/admin/products">
                <li>
                    <i class='bx bxs-package' ></i>
                    <span>{t('Products')}</span>
                </li>
            </Link>

            <Link to="/admin">
                <li>
                    <i class='bx bxs-store-alt' ></i>
                    <span>{t('Orders')}</span>
                </li>
            </Link>

            <Link to="/admin">
                <li>
                    <i class='bx bxs-book-content' ></i>
                    <span>{t('Delivery')}</span>
                </li>
            </Link>

            <Link to="/admin">
                <li>
                    <i class='bx bxs-cog' ></i>
                    <span>{t('Setting')}</span>
                </li>
            </Link>


            {/* <li>
                <i class='bx bxs-home'></i>
                <Link to="/admin">{t('HomePage')}</Link>
            </li>


            <li>
                <i class='bx bxs-user'></i>
                <Link to="/admin/users">{t('Users')}</Link>
            </li>
            <li>
                <i class='bx bxs-category'></i>
                <Link to="/admin/category">{t('Category')}</Link>
            </li>
            <li>
                <i class='bx bxs-package' ></i>
                <Link to="/admin/products">{t('Products')}</Link>
            </li>
            <li>
                <i class='bx bxs-store-alt' ></i>
                <a href="#">{(t('Orders'))}</a>
            </li>
            <li>
                <i class='bx bxs-book-content' ></i>
                <a href="#">{(t('Delivery'))}</a>
            </li>
            <li>
                <i class='bx bxs-cog' ></i>
                <a href="#">{(t('Setting'))}</a>
            </li> */}
        </ul>
    </div>
  )
}

export default LeftBar