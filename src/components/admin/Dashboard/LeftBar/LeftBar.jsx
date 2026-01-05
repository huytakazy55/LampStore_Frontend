import React, { useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../ThemeContext';
import { setCurrentBar } from '../../../../redux/slices/leftBarAdminSlice';
import { jwtDecode } from 'jwt-decode';

const LeftBar = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const leftBar = useSelector((state) => state.leftbar.leftbar);
    const currentBar = useSelector((state) => state.leftbar.currentBar); // Sửa lỗi sai tên state
    const { themeColors } = useContext(ThemeContext);

    const userRoles = useMemo(() => {
        const token = localStorage.getItem('token');
        if (!token) return [];
        try {
            const decoded = jwtDecode(token);
            const roleClaim = decoded.role;
            return Array.isArray(roleClaim) ? roleClaim : roleClaim ? [roleClaim] : [];
        } catch (error) {
            console.error('Cannot decode token roles:', error);
            return [];
        }
    }, []);

    const menuItems = [
        { name: "HomePage", icon: "bxs-home", path: "/admin", roles: null },
        { name: "Users", icon: "bxs-user", path: "/admin/users", roles: ["Administrator"] },
        { name: "Roles", icon: "bxs-shield-alt-2", path: "/admin/roles", roles: ["Administrator"] },
        { name: "Category", icon: "bxs-category", path: "/admin/category", roles: ["Administrator","Manager","Warehouse staff"] },
        { name: "Tags", icon: "bxs-tag", path: "/admin/tags", roles: ["Administrator","Manager"] },
        { name: "Banners", icon: "bxs-image", path: "/admin/banners", roles: ["Administrator","Manager"] },
        { name: "Products", icon: "bxs-package", path: "/admin/products", roles: ["Administrator","Manager","Warehouse staff"] },
        { name: "Orders", icon: "bxs-store-alt", path: "/admin/orders", roles: ["Administrator","Manager","Accountant"] },
        { name: "Chat", icon: "bxs-chat", path: "/admin/chat", roles: null },
        { name: "Delivery", icon: "bxs-book-content", path: "/admin/delivery", roles: ["Administrator","Manager","Warehouse staff"] },
        { name: "Setting", icon: "bxs-cog", path: "/admin/settings", roles: ["Administrator"] },
    ];

    const visibleMenuItems = menuItems.filter(item => {
        if (!item.roles || item.roles.length === 0) return true;
        return item.roles.some(r => userRoles.includes(r));
    });

    return (
        <div
            style={{
                background: `linear-gradient(0deg, ${themeColors.StartColorLinear} 0%, ${themeColors.EndColorLinear} 100%)`,
            }}
            className={`h-full border-r border-gray-300 transition-all duration-400 ease-linear overflow-hidden ${
                leftBar ? 'w-[4.5rem] relative' : 'w-[13%]'
            }`}
        >
            <ul className="p-4 text-white">
                {visibleMenuItems.map((item) => (
                    <Link
                        key={item.name}
                        onClick={() => dispatch(setCurrentBar(item.name))}
                        className="left-10 text-white font-medium w-52 transition-all duration-400 ease-in-out"
                        to={item.path}
                    >
                        <li
                            className={`relative p-[10px] h-10 flex justify-start items-center rounded-md mb-2 cursor-pointer hover:bg-fuchsia-700/25 ${
                                currentBar === item.name ? 'bg-fuchsia-700/25' : ''
                            }`}
                        >
                            <i
                                className={`bx ${item.icon} text-h3 mr-4 transition-all duration-400 ease-in-out ${
                                    leftBar ? 'flex justify-center items-center mr-40' : ''
                                }`}
                            ></i>
                            <span>{t(item.name)}</span>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default LeftBar;