import React, {useState, useEffect, useRef} from 'react'
import { styled, alpha } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import InputBase from '@mui/material/InputBase';
import Logo from '../../../assets/images/LogoLamp3D.jpg'
import England from '../../../assets/images/England-img.jpg'
import VietNam from '../../../assets/images/VietNam-icon.jpg'
import SearchIcon from '@mui/icons-material/Search';
import './AppBar.css'
import { useDispatch } from 'react-redux';
import { setLeftBar } from '../../../redux/slices/leftBarAdminSlice';
import { useTranslation } from 'react-i18next';

const AppBar = () => {
    const dispatch = useDispatch();
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.black, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.black, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    }));
      
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
            width: '20ch',
            },
        },
    }));

    const leftbar = useSelector(state => state.leftbar.leftbar);

    const toggleHideLeftBar = () => {
        dispatch(setLeftBar(!leftbar));
    }

    const [showLanguage, setShowLanguage] = useState(false);
    const languageRef = useRef(null);

    const toggleShowLanguage = () => {
        setShowLanguage(!showLanguage);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (languageRef.current && !languageRef.current.contains(event.target)) {
                setShowLanguage(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [languageRef]);

    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className='AppBar'>
            <div className='AppBar-logo'>
                <img src={Logo} alt="" />
            </div>
            <div onClick={() => toggleHideLeftBar()} className='AppBar-icon'>
                <i class='bx bx-menu'></i>
            </div>
            <div className='AppBar-search'>
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </div>
            <div className='AppBar-middle'>

            </div>
            <div className='AppBar-service'>
                <div onClick={() => toggleShowLanguage()} className='language-icon'>
                    <img src={i18n.language == 'vi' ? VietNam : England} alt="" />
                    <div ref={languageRef} className={`AppBar-service-changelanguage ${showLanguage ? 'active' : ''}`}>
                        <div onClick={() => changeLanguage('vi')} className='language-button'>
                            <img src={VietNam} alt="" />
                            Tiếng việt
                        </div>
                        <div onClick={() => changeLanguage('en')} className='language-button'>
                            <img src={England} alt="" />
                            English
                        </div>
                    </div>
                </div>
                <div className='noti-icon'>
                    <i class='bx bx-bell' ></i>
                </div>
                <div className='mail-icon'>
                    <i class='bx bx-envelope' ></i>
                </div>
                <div className='user-icon'>
                    <i class='bx bx-user'></i>
                </div>
            </div>
        </div>
    )
}

export default AppBar