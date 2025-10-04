import React from 'react' 

function Logo({width = '100px', height = '60px'}) {
  return (
    <div className='inline-block'>
      <img 
        src='/logo_icon.png' 
        alt='Logo' 
        style={{width,height}} 
        className='inline-block rounded-lg object-cover'
      />
    </div>
  )
}

export default Logo