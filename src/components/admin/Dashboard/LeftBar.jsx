import React from 'react'
import './LeftBar.css'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const LeftBar = () => {
    const {t, i18n} = useTranslation();
    const leftBar = useSelector((state) => state.leftbar.leftbar);
  return (
    <div className={`LeftBar ${leftBar ? 'minimize' : ''}`}>
        <ul>
            <li>
                <i class='bx bxs-home' ></i>
                <a href="#">{(t('HomePage'))}</a>
            </li>
            <li>
                <i class='bx bxs-user' ></i>
                <a href="#">{(t('Users'))}</a>
            </li>
            <li>
                <i class='bx bxs-category' ></i>
                <a href="#">{(t('Category'))}</a>
            </li>
            <li>
                <i class='bx bxs-package' ></i>
                <a href="#">{(t('Products'))}</a>
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
            </li>
        </ul>
    </div>
  )
}

export default LeftBar