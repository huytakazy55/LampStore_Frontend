import React, {useContext} from 'react'
import { Breadcrumbs, Link } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './Category.css'
import {ThemeContext} from '../../../../ThemeContext';

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

const Category = () => {
  const {themeColors} = useContext(ThemeContext);
  const {t} = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
        <div className='RightBody-title'>
          {t('Category')}
        </div>
        <div onClick={handleOpen} className='Create-Category' style={{background: `${themeColors.EndColorLinear}`}}>
            <i class='bx bx-duplicate'></i>
            {t('Create')}
          </div>
        <div className='RightBody-breadcrumbs'>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link component={RouterLink} to="/admin" color="inherit">
              {t('Home')}
            </Link>
            <Typography color="textPrimary">{t('Category')}</Typography>
          </Breadcrumbs>
        </div>
        <div className='Category'>
          <table>
            <tr>
              <th>STT</th>
              <th>Tên danh mục</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Đèn ngủ thú</td>
              <td>Đèn ngủ hình các con thú</td>
              <td>
                <div className='combo-action'>
                  <i class='bx bx-edit'></i>
                  <i class='bx bx-trash' ></i>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t('CreateCategoryTitle')}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
    </div>
  )
}

export default Category