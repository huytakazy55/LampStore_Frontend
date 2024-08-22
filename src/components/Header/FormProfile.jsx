import React, { useState, useEffect } from 'react'
import './FormProfile.css'
import avatar from '../../assets/images/Avatar.jpg'
import AuthService from '../Services/AuthService'
import ProfileService from '../Services/ProfileService'
import { jwtDecode } from 'jwt-decode'

const FormProfile = ({popupProfileRef, toggleProfile}) => {
  const token = localStorage.getItem("token");
  const [infoSideActive, setInfoSideActive] = useState('info');
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    username: '',
    password: '',
  });
  useEffect(() => {
    if(toggleProfile && token) {
      AuthService.profile()
        .then((res) => {
          const userId = jwtDecode(token).nameid;
          setProfileData({
            id: res?.id,
            fullName: res?.fullName,
            userId: userId,
            email: res?.email,
            phoneNumber: res?.phoneNumber,
            address: res?.address,
          });
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [toggleProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profileData);
    if(profileData.id) {
      ProfileService.UpdateUserProfile(profileData.id, profileData.fullName, profileData.userId, profileData.email, profileData.phoneNumber, profileData.address)
        .then((response) => {
          console.log('Cập nhật hồ sơ thành công', response.data);
        })
        .catch((error) => {
          console.error('Lỗi cập nhật hồ sơ', error);
        });
    } else {
      ProfileService.CreateUserProfile(profileData.fullName, profileData.userId, profileData.email, profileData.phoneNumber, profileData.address)
      .then((res) => {
        console.log('Thêm mới hồ sơ thành công', res.data)
      })
      .catch((err) => {
        console.error('Lỗi thêm mới hồ sơ', err);
      })
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleInfoSideActive = (tab) => {
    setInfoSideActive(tab);
  }
  
  return (
    <div ref={popupProfileRef} onClick={(e) => e.stopPropagation()} className={`FormProfile ${toggleProfile ? 'active' : ''}`}>
        <div className='FormProfile-avatar'>
          <p className='avar-fullname'>{profileData.fullName ? profileData.fullName : "--"}</p>
          <div className='border-avar'>
            <div className='avar-img'>
              <img src={avatar} alt="" />
            </div>
            <div className='del-avar'><a href='#'><i class='bx bx-trash'></i></a></div>
          </div>
          <button className='avar-upload-img'><i class='bx bx-upload' ></i>Tải lên ảnh mới</button>
          <div className='upload-limit'>
            <p>Tải lên ảnh đại diện mới. Ảnh sẽ được tự động thay đổi kích thước.</p>
            <p>Ảnh có độ lớn không quá <b>1 MB</b></p>
          </div>
          <p>Ngày tạo: <b>16 - 08 - 2024</b></p>
        </div>
        <div className='FormProfile-info'>
          <div className='info-header'>
            <p className='info-header-title'>Chỉnh sửa thông tin</p>
            <div className='info-header-tab'>
              <div onClick={() => handleInfoSideActive('info')} className={`tab-info ${infoSideActive === 'info' ? 'active' : ''}`}>Thông tin người dùng</div>
              <div onClick={() => handleInfoSideActive('bill')} className={`tab-info ${infoSideActive === 'bill' ? 'active' : ''}`}>Thông tin hóa đơn</div>
            </div>
          </div>
          <div className='info-body-tab'>
            <div className={`tab-body ${infoSideActive === 'info' ? 'active' : ''}`}>
                <form name='FormProfile' onSubmit={handleSubmit} action="" method="post">
                  <div className='row-input'>
                    <div className='Form-input'>
                      <p>Tên người dùng</p>
                      <input type="text" id='FullName' name='FullName' value={profileData.fullName} onClick={handleInputChange}/>
                    </div>
                    <div className='Form-input'>
                      <p>Email</p>
                      <input type="text" id='Email' name='Email' value={profileData.email} onClick={handleInputChange}/>
                    </div>
                  </div>
                  <div className='row-input'>
                    <div className='Form-input'>
                      <p>Số điện thoại</p>
                      <input type="text" id='PhoneNumber' name='PhoneNumber' value={profileData.phoneNumber} onClick={handleInputChange}/>
                    </div>
                    <div className='Form-input'>
                      <p>Địa chỉ</p>
                      <input type="text" id='Address' name='Address' value={profileData.address} onClick={handleInputChange}/>
                    </div>
                  </div>
                  <div className='row-input'>
                    <div className='Form-input'>
                      <p>Tên đăng nhập</p>
                      <input type="text" id='UserName' name='UserName' onClick={handleInputChange}/>
                    </div>
                    <div className='Form-input'>
                      <p>Mật khẩu</p>
                      <input type="password" id='PassWord' name='PassWord' onClick={handleInputChange}/>
                    </div>
                  </div>
                  <button className='FormProfileSubmit' type='submit'><i class='bx bx-edit'></i>Cập nhật thông tin</button>
                </form>
            </div>
            <div className={`tab-body ${infoSideActive === 'bill' ? 'active' : ''}`}>
                <p>haha</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FormProfile