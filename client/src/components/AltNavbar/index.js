import React, { useState } from 'react'
import AltMenu from '../AltMenu'
import AuthMenu from '../AuthMenu'
import { Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Logo from '../../resources/logo1.png'
import './style.css'

function Navbar ({ authenticated }) {
  //   const [current, setCurrent] = useState('mail')
  const [visible, setVisible] = useState(false)

  const styling = {
    logo: {
      maxHeight: '4.5rem'
    },
    drawer: {
      backgroundColor: '#353452'
    }
  }
  // Hide or show the drawer
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  return (
    <nav
      className='menuBar'
      style={{
        borderBottom: '1px solid #C4C4C4',
        backgroundColor: '#353452',
        color: '#ffffff'
      }}
    >
      <div className='logo'>
        <Link to='/'>
          <img src={Logo} style={styling.logo} />
        </Link>
      </div>
      <div className='menuCon'>
        <div className='rightMenu'>
          {authenticated ? (
            <div>
              <AuthMenu order='horizontal' />
            </div>
          ) : (
            <div>
              <AltMenu order='horizontal' />
            </div>
          )}
        </div>
        <div className='barsMenu'>
          <MenuOutlined onClick={showDrawer} style={{ marginTop: '15px' }} />
        </div>
        <Drawer
          placement='right'
          closable={true}
          onClose={onClose}
          visible={visible}
          keyboard={true}
          bodyStyle={styling.drawer}
        >
          {authenticated ? (
            <AuthMenu order='inline' />
          ) : (
            <AltMenu order='inline' />
          )}
        </Drawer>
      </div>
    </nav>
  )
}
// Export the component
export default Navbar
