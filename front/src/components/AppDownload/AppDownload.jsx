import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For Better Experience Download <br />Tomato App</p>
      <div className="app-download-platforms">
        <img src={assets.playStoreImg} alt="" />
        <img src={assets.appStoreImg} alt="" />
      </div>
    </div>
  )
}

export default AppDownload
