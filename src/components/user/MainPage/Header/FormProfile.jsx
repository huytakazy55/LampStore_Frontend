import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setAvatar } from '../../../../redux/slices/avatarSlice';
import avatar from '../../../../assets/images/Avatar.jpg'
import AuthService from '../../../../Services/AuthService'
import ProfileService from '../../../../Services/ProfileService'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import Compressor from 'compressorjs';

const FormProfile = ({popupProfileRef, toggleProfile}) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
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

  const [previewImage, setPreviewImage] = useState('');

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
        toast.error("Có lỗi xảy ra khi thêm mới hồ sơ.");
      })
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleDeleteAvatar = (e) => {
    e.preventDefault();
    if(profileData.ProfileAvatar) {
      ProfileService.DeleteAvatar(profileData.id)
      .then((res) => {
        toast.success("Đã xóa ảnh đại diện.");
        dispatch(setAvatar(''));
        setPreviewImage(null);
        profileData.ProfileAvatar = '';
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra.");
      })
    }else {
      toast.error("Không tồn tại ảnh đại diện.");
    }
  }


  const handleInfoSideActive = (tab) => {
    setInfoSideActive(tab);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 1 * 1024 * 1024; // 1MB
  
    if (file) {
      if (file.size > maxSize) {
        toast.error("Kích thước ảnh phải nhỏ hơn 1MB.");
        return;
      }
  
      // Sử dụng Compressor.js để nén ảnh
      new Compressor(file, {
        quality: 0.8, // Chất lượng ảnh nén từ 0 đến 1
        maxWidth: 500, // Độ rộng tối đa của ảnh nén
        maxHeight: 500, // Độ cao tối đa của ảnh nén
        success(result) {
          // Nén ảnh thành công
          const formData = new FormData();
          formData.append('ProfileAvatar', result, result.name);

          ProfileService.UploadAvatar(profileData.id, formData)
            .then((response) => {
              const avatarURL = URL.createObjectURL(result);
              setPreviewImage(avatarURL);
              toast.success("Upload ảnh đại diện thành công.");
              dispatch(setAvatar(avatarURL));
            })
            .catch((error) => {
              toast.error("Upload ảnh không thành công.");
            });
        },
        error(err) {
          // Xử lý lỗi nén ảnh
          toast.error("Có lỗi xảy ra khi nén ảnh.");
        }
      });
    }
  };

  return (
    <div ref={popupProfileRef} onClick={(e) => e.stopPropagation()} className={`w-[70rem] h-[35rem] absolute left-1/2 top-[10rem] z-[1000] border-t-2 border-[var(--hightlight-color)] translate-x-[-50%] transition-all duration-300 ease-in-out flex justify-between  ${toggleProfile ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-[1rem]'}`}>
        <div className='w-[29%] h-[80%] shadow-[var(darker-shadow)] bg-[var(--white-color)] text-center p-8'>
          <p className='font-bold text-h3 mb-4'>{profileData.FullName ? profileData.FullName : "--"}</p>
          <div className='relative'>
            <div className='w-40 h-40 rounded-[50%] overflow-hidden border-2 border-[var(--hightlight-color)] p-[5px] mx-auto relative'>
              <img className='w-full h-full rounded-[50%]' src={previewImage ? previewImage : (profileData.ProfileAvatar ? `${API_ENDPOINT}${profileData.ProfileAvatar}` : avatar)} alt="Avatar" />
            </div>
            <div className='absolute w-[35px] h-[35px] top-[0.6rem] right-[3.5rem] bg-[var(--white-color)] border-2 border-[var(--hightlight-color)] rounded-[50%] text-[var(--darkness-color)]' onClick={(e) => handleDeleteAvatar(e)} ><a href='#'><i className='bx bx-trash text-h2 leading-[1.3] align-middle'></i></a></div>
          </div>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button type="button" onClick={() => document.getElementById('fileInput').click()} className='bg-[var(--hightlight-color)] py-[5px] px-[10px] text-[var(--white-color)] text-h4 flex justify-center items-center my-4 mx-auto rounded-[2px]'>
            <i className='bx bx-upload text-h3 pr-[5px] pb-[2px] pl-2px'></i> Tải lên ảnh mới
          </button>
          <div className='border-[1px] border-gray-700 rounded-[3px] bg-gray-200 py-[5px] px-[10px] text-small my-4 mx-auto text-gray-600 mb-8'>
            <p>Tải lên ảnh đại diện mới. Ảnh sẽ được tự động thay đổi kích thước.</p>
            <p>Ảnh có độ lớn không quá <b>1 MB</b></p>
          </div>
          <p>Ngày tạo: <b>16 - 08 - 2024</b></p>
        </div>
        <div className='w-[70%] h-full shadow-[var(--darker-shadow)] bg-[var(--white-color)]'>
          <div className='h-1/5 bg-slate-200 border-b border-gray-500 pt-8 px-8 pb-0 relative'>
            <p className='font-bold text-h2'>Chỉnh sửa thông tin</p>
            <div className='flex justify-start items-center absolute bottom-0 gap-6'>
              <div onClick={() => handleInfoSideActive('info')} className={`mt-1 relative cursor-pointer ${infoSideActive === 'info' ? 'font-semibold after:content-[""] after:w-full after:h-[2px] after:bg-[var(--hightlight-color)] after:absolute after:bottom-[-1px] after:left-0' : ''}`}>Thông tin người dùng</div>
              <div onClick={() => handleInfoSideActive('bill')} className={`mt-1 relative cursor-pointer ${infoSideActive === 'bill' ? 'font-semibold after:content-[""] after:w-full after:h-[2px] after:bg-[var(--hightlight-color)] after:absolute after:bottom-[-1px] after:left-0' : ''}`}>Thông tin hóa đơn</div>
            </div>
          </div>
          <div className='w-full h-[80%] p-8'>
            <div className={`${infoSideActive === 'info' ? 'block' : 'hidden'}`}>
                <form name='relative pb-8' onSubmit={handleSubmit} action="" method="post">
                  <div className='flex justify-between items-center mb-6'>
                    <div className='w-[45%]'>
                      <p className='mb-2'>Tên người dùng</p>
                      <input className='border-[1px] outline-none w-full py-[5px] px-[10px] focus:border-[var(--hightlight-color)]' type="text" id='FullName' name='FullName' value={profileData.FullName} onChange={handleInputChange}/>
                    </div>
                    <div className='w-[45%]'>
                      <p className='mb-2'>Email</p>
                      <input className='border-[1px] outline-none w-full py-[5px] px-[10px] focus:border-[var(--hightlight-color)]' type="text" id='Email' name='Email' value={profileData.Email} onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mb-6'>
                    <div className='w-[45%]'>
                      <p className='mb-2'>Số điện thoại</p>
                      <input className='border-[1px] outline-none w-full py-[5px] px-[10px] focus:border-[var(--hightlight-color)]' type="text" id='PhoneNumber' name='PhoneNumber' value={profileData.PhoneNumber} onChange={handleInputChange}/>
                    </div>
                    <div className='w-[45%]'>
                      <p className='mb-2'>Địa chỉ</p>
                      <input className='border-[1px] outline-none w-full py-[5px] px-[10px] focus:border-[var(--hightlight-color)]' type="text" id='Address' name='Address' value={profileData.Address} onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className='text-h3 font-semibold mb-2'>Social Profile</div>
                  <div className='flex justify-between items-center mb-6'>
                    <div className="w-[45%] flex justify-center items-center">
                      <i className='bx bxl-facebook-square border-[1px] text-h2 w-[15%] leading-[1.48] text-center'></i>
                      <input className='border-[1px] outline-none w-full py-[5px] px-[10px] focus:border-[var(--hightlight-color)]' type="text" name="FacebookUser" id="FacebookUser" placeholder='Facebook Username'/>
                    </div>
                    <div className="w-[45%] flex justify-center items-center">
                      <i className='bx bxl-google border-[1px] text-h2 w-[15%] leading-[1.48] text-center'></i>
                      <input className='border-[1px] outline-none w-full py-[5px] px-[10px] focus:border-[var(--hightlight-color)]' type="text" name="GoogleUser" id="GoogleUser" placeholder='Google Username'/>
                    </div>
                  </div>
                  <button className='bg-[var(--hightlight-color)] py-[5px] px-[10px] text-white text-h4 flex justify-center items-center rounded-[2px]' type='submit'><i className='bx bx-edit text-h3 pr-[5px] pb-[2px] pl-[2px]'></i>Cập nhật thay đổi</button>
                </form>
            </div>
            <div className={`tab-body ${infoSideActive === 'bill' ? 'block' : 'hidden'}`}>
                <p>haha</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FormProfile