import React, {useContext, useEffect, useState, useMemo} from 'react'
import { Breadcrumbs, Link } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Modal from '@mui/material/Modal';
import './Users.css'
import {ThemeContext} from '../../../../ThemeContext';
import UserManage from '../../../../Services/UserManage';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 10,
  border: 'none',
  outline: 'none',
  p: 4,
};

const Users = () => {
  const {themeColors} = useContext(ThemeContext);
  const {t} = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = useState('');
   //Pagination
   const [page, setPage] = useState(1);
   const itemsPerPage = 20;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    UserManage.GetUserAccount()
    .then((res) => {
      setUserData(res.$values);
    })
    .catch((err) => {
      toast.error("Có lỗi xảy ra!");
    })

    
  },[]);


  console.log(userData);
  const LockUser = (userId, username) => {
    UserManage.LockUser(userId, username)
      .then((res) => {
        setUserData(prevData => prevData.filter(user => user.id !== userId));
        toast.success(`Đã khóa tài khoản ${username}`);
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra");
      });
  };

  const UnLockUser = (userId, username) => {
    UserManage.LockUser(userId, username)
      .then((res) => {
        setUserData(prevData => prevData.filter(user => user.id !== userId));
        toast.success(`Đã mở khóa tài khoản ${username}`);
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra");
      });
  };
  
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  //Pagination
  const currentItems = useMemo(() => {
    return userData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [userData, page, itemsPerPage]);

  console.log(userData);


  return (
    <div>
        <div className='RightBody-title'>
          {t('Users')}
        </div>
        <div onClick={handleOpen} className='Create-Users' style={{background: `${themeColors.EndColorLinear}`}}>
            <i class='bx bx-duplicate'></i>
            {t('Create')}
          </div>
        <div className='RightBody-breadcrumbs'>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link component={RouterLink} to="/admin" color="inherit">
              {t('Home')}
            </Link>
            <Typography color="textPrimary">{t('Users')}</Typography>
          </Breadcrumbs>
        </div>
        <div className='Users'>
          <table>
            <thead>
              <tr style={{background: `${themeColors.EndColorLinear}`, color: `${themeColors.StartColorLinear}`}}>
                <th>STT</th>
                <th>Id</th>
                <th>Tên người dùng</th>
                <th>Nhóm quyền</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {
                  currentItems.length > 0 ? (
                    currentItems.map((user, index) => (
                      <tr key={user.id}>
                        <td style={{textAlign: 'center', width: '5%'}}>{index + 1}</td>
                        <td style={{width: '25%'}}>{user.id}</td>
                        <td style={{width: '60%'}}>{user.userName}</td>
                        <td style={{width: '10%'}}>
                          <div className='combo-action'>
                            {/* <i onClick={() => handleUpdateClick(user.id)} class='bx bx-edit'></i> */}
                            <i onClick={() => LockUser(user.id,user.userName)} class='bx bx-lock' ></i>
                            <i onClick={() => UnLockUser(user.id,user.userName)} class='bx bx-lock-open' ></i>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{textAlign: 'center', color:'red'}}>Không có dữ liệu</td>
                    </tr>
                  )
              }
            </tbody>
          </table>
          {
            userData.length > itemsPerPage && (
              <Pagination
                size="small"
                variant="outlined" shape="rounded"
                count={Math.ceil(userData.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                color="primary"
                style={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}
              />
            )
          }
        </div>
    </div>
  )
}

export default Users