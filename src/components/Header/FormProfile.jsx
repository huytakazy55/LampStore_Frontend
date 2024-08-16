import React, { useState } from 'react'
import './FormProfile.css'
import avatar from '../../assets/images/Avatar.jpg'

const FormProfile = ({popupProfileRef, toggleProfile}) => {
  const [infoSideActive, setInfoSideActive] = useState('info');

  const handleInfoSideActive = (tab) => {
    setInfoSideActive(tab);
  }
  return (
    <div ref={popupProfileRef} onClick={(e) => e.stopPropagation()} className={`FormProfile ${toggleProfile ? 'active' : ''}`}>
        <div className='FormProfile-avatar'>
          <p className='avar-fullname'>Lê Quang Huy</p>
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
                <p>hihi</p>
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