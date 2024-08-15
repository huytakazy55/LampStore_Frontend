import React from 'react'
import './FormProfile.css'

const FormProfile = ({popupProfileRef, toggleProfile}) => {
  return (
    <div ref={popupProfileRef} onClick={(e) => e.stopPropagation()} className={`FormProfile ${toggleProfile ? 'active' : ''}`}></div>
  )
}

export default FormProfile