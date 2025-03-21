import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Breadcrumbs, Link } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Modal from '@mui/material/Modal';
import { ThemeContext } from '../../../../ThemeContext';
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
  const [userData, setUserData] = useState([]);
   //Pagination
   const [page, setPage] = useState(1);
   const itemsPerPage = 20;

  // Search
  const [searchTerm, setSearchTerm] = useState('');
  const [roleData, setRoleData] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    UserManage.GetUserAccount()
      .then((res) => {
        setUserData(res.$values);
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra!");
      });
  }, []);

  useEffect(() => {
    if (userData.length > 0) {
      userData.forEach(user => {
        UserManage.GetRoleById(user.id)
          .then((res) => {
            setRoleData(prevState => ({
              ...prevState,
              [user.id]: res.data.$values,
            }));
          })
          .catch((err) => {
            toast.error(`Lỗi khi lấy role của ${user.userName}`);
          });
      });
    }
  }, [userData]);

  const updateUserLockStatus = (userId, isLocked) => {
    setUserData(prevData => 
      prevData.map(user => 
        user.id === userId ? { ...user, lockoutEnd: isLocked ? new Date(Date.now() + 1000 * 60 * 60) : null } : user
      )
    );
  };

  const LockUser = (userId, username) => {
    UserManage.LockUser(userId, username)
      .then((res) => {
        toast.success(`Đã khóa tài khoản ${username}`);
        updateUserLockStatus(userId, true); // Cập nhật trạng thái khóa
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra");
      });
  };

  const UnLockUser = (userId, username) => {
    UserManage.UnLockUser(userId, username)
      .then((res) => {
        toast.success(`Đã mở khóa tài khoản ${username}`);
        updateUserLockStatus(userId, false); // Cập nhật trạng thái mở khóa
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra");
      });
  };

  //Search Service
  const highlightedText = (text, highlight) => {
    if (!text || typeof text !== 'string') return text;
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
      ) : part
    );
  };
  const filteredUsers = useMemo(() => {
    return userData.filter(user => {
      return (
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [userData, searchTerm]);
  
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // Pagination
  const currentItems = useMemo(() => {
    return filteredUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [filteredUsers, page, itemsPerPage]);

  return (
    <div>
        <div className='text-h2 font-semibold mb-2'>
          {t('Users')}
        </div>
        <div className='absolute right-0 top-4 flex justify-end items-center gap-4 h-9'>
          <div style={{background: `${themeColors.EndColorLinear}`}} className='flex border-[1px] border-gray-300 justify-between items-center rounded-sm h-full'>
            <i className='bx bx-search-alt-2 text-h2 px-5 text-white'></i>
            <input 
              className='border-none outline-none py-1 px-3 text-small rounded-tr-sm rounded-br-sm leading-none h-full w-60'
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{color: `${themeColors.StartColorLinear}`}} type="text" 
              placeholder="tên, danh mục ..." 
            />
          </div>
          <div className='border-[1px] border-gray-300 py-1 px-4 font-medium rounded-sm text-white flex justify-center items-center gap-1 cursor-pointer h-full' style={{background: `${themeColors.EndColorLinear}`}}>
              <i className='bx bx-duplicate text-h3 -mt-[1px]'></i>
              {t('Create')}
          </div>
        </div>
        <div className='mb-4'>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link component={RouterLink} to="/admin" color="inherit">
              {t('Home')}
            </Link>
            <Typography color="textPrimary">{t('Users')}</Typography>
          </Breadcrumbs>
        </div>
        <div className='User'>
          <table>
            <thead>
              <tr style={{background: `${themeColors.EndColorLinear}`, color: `${themeColors.StartColorLinear}`}}>
                <th className='w-[5%]'>STT</th>
                <th className='w-1/4'>Id</th>
                <th className='w-[40%]'>Tên người dùng</th>
                <th className='w-[10%]'>Nhóm quyền</th>
                <th className='w-[10%]'>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {
                  currentItems.length > 0 ? (
                    currentItems.map((user, index) => (
                      <tr key={user.id}>
                        <td style={{textAlign: 'center', width: '5%'}}>{index + 1}</td>
                        <td>{user.id}</td>
                        <td>{highlightedText(user.userName, searchTerm)}</td>
                        <td style={{textAlign: 'center'}}>{highlightedText(roleData[user.id] ? roleData[user.id] : 'Loading...', searchTerm)}</td>
                        <td>
                          <div className='flex justify-center items-center gap-3'>                        
                          {user.lockoutEnd && new Date(user.lockoutEnd) > new Date() ? (
                            // Tài khoản bị khóa, hiển thị nút "Mở khóa"
                            <i onClick={() => UnLockUser(user.id, user.userName)} className='bx bx-lock-open' ></i>
                          ) : (
                            // Tài khoản không bị khóa, hiển thị nút "Khóa"
                            <i onClick={() => LockUser(user.id, user.userName)} className='bx bx-lock' ></i>
                          )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{textAlign: 'center', color:'red'}}>Không có dữ liệu</td>
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

export default Users;
