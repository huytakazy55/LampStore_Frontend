import React, { useState, useEffect } from 'react'
import './FormProfile.css'
import avatar from '../../assets/images/Avatar.jpg'
import AuthService from '../Services/AuthService'
import ProfileService from '../Services/ProfileService'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'

const FormProfile = ({popupProfileRef, toggleProfile}) => {
  const token = localStorage.getItem("token");
  const API_ENDPOINT = "https://localhost:7124";
  const [infoSideActive, setInfoSideActive] = useState('info');
  const [profileData, setProfileData] = useState({
    FullName: '',
    Email: '',
    PhoneNumber: '',
    UserId: '',
    Address: '',
    username: '',
    password: '',
    ProfileAvatar: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(avatar);

  useEffect(() => {
    if(toggleProfile && token) {
      AuthService.profile()
        .then((res) => {
          const userId = jwtDecode(token).nameid;
          setProfileData({
            id: res?.id,
            FullName: res?.fullName,
            UserId: userId,
            Email: res?.email,
            PhoneNumber: res?.phoneNumber,
            Address: res?.address,
            ProfileAvatar: res?.profileAvatar
          });
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [toggleProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFile) {
      formData.append('ProfileAvatar', selectedFile);
      ProfileService.UploadAvatar(profileData.id, formData)
      .then((response) => {
        toast.success("upload ảnh đại diện thành công.");
        console.log(response);
      })
      .catch((error) => {
        toast.error("upload ảnh không thành công.");
        console.log(error);
      })
    }

    if(profileData.id) {
      ProfileService.UpdateUserProfile(profileData.id, profileData.FullName, profileData.UserId, profileData.Email, profileData.PhoneNumber, profileData.Address)
        .then((response) => {
          toast.success("Đã cập nhật thông tin hồ sơ.");
          console.log(response.data);
        })
        .catch((error) => {
          toast.error("Lỗi cập nhật hồ sơ.")
          console.log(error);
        });
    } else {
      ProfileService.CreateUserProfile(profileData.FullName, profileData.UserId, profileData.Email, profileData.PhoneNumber, profileData.Address)
      .then((res) => {
        toast.success("Thêm mới hồ sơ thành công.");
      })
      .catch((err) => {
        toast.success("Có lỗi xảy ra khi thêm mới hồ sơ.");
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDeleteAvatar = (e) => {
    e.preventDefault();
    setProfileData({
      ProfileAvatar: ''
    })
    const formData = new FormData();
    formData.append('ProfileAvatar', selectedFile);
      ProfileService.UploadAvatar(profileData.id, formData)
      .then((response) => {
        toast.success("upload ảnh đại diện thành công.");
        console.log(response);
      })
      .catch((error) => {
        toast.error("upload ảnh không thành công.");
        console.log(error);
      })
  };
  
  return (
    <div ref={popupProfileRef} onClick={(e) => e.stopPropagation()} className={`FormProfile ${toggleProfile ? 'active' : ''}`}>
        <div className='FormProfile-avatar'>
          <p className='avar-fullname'>{profileData.FullName ? profileData.FullName : "--"}</p>
          <div className='border-avar'>
            <div className='avar-img'>
              <img src={ profileData.ProfileAvatar ? `${API_ENDPOINT}${profileData.ProfileAvatar}` : avatar} alt="Avatar" />
            </div>
            <div className='del-avar' onClick={(e) => handleDeleteAvatar(e)} ><a href='#'><i class='bx bx-trash'></i></a></div>
          </div>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button type="button" onClick={() => document.getElementById('fileInput').click()} className='avar-upload-img'>
            <i class='bx bx-upload'></i> Tải lên ảnh mới
          </button>
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
                      <input type="text" id='FullName' name='FullName' value={profileData.FullName} onChange={handleInputChange}/>
                    </div>
                    <div className='Form-input'>
                      <p>Email</p>
                      <input type="text" id='Email' name='Email' value={profileData.Email} onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className='row-input'>
                    <div className='Form-input'>
                      <p>Số điện thoại</p>
                      <input type="text" id='PhoneNumber' name='PhoneNumber' value={profileData.PhoneNumber} onChange={handleInputChange}/>
                    </div>
                    <div className='Form-input'>
                      <p>Địa chỉ</p>
                      <input type="text" id='Address' name='Address' value={profileData.Address} onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className='row-input'>
                    <div className='Form-input'>
                      <p>Tên đăng nhập</p>
                      <input type="text" id='UserName' name='UserName' onChange={handleInputChange}/>
                    </div>
                    <div className='Form-input'>
                      <p>Mật khẩu</p>
                      <input type="password" id='PassWord' name='PassWord' onChange={handleInputChange}/>
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