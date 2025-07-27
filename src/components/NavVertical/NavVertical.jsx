import { useState, useEffect } from 'react'
import logo from '../../assets/imgs/logo.svg';
import cloud from '../../assets/imgs/cloud.png';
import { MenuFoldOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { AiFillHome } from 'react-icons/ai';
import { Link } from "react-router";
import { RiContactsBook3Fill } from 'react-icons/ri';
import { FaEarthAmericas } from 'react-icons/fa6';
import { FaCircleQuestion } from 'react-icons/fa6';
import { Button, Tooltip } from "antd";
import { useDispatch } from "react-redux"
import { setClosedNav } from '../../stores/VerticalNavSlicer';
import { useSelector } from 'react-redux';
import './NavVertical.css';

function NavVertical() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false)
  const [isVerticalNavClosed, setisVerticalNavClosed] = useState(false)

  const loggedStore = useSelector((state) => state.account.isLogged);

  const handleNavBarState = () => {
    dispatch(setClosedNav())
  }

  useEffect(() => {
    setIsLogin(loggedStore);
  }, [loggedStore])


  return (
    <>
      <div className='vertical-nav' style={isVerticalNavClosed ? { width: '240px' } : { width: '80px' }}>
        {
          isVerticalNavClosed ?
            <>
              <div>
                <header className='vertical-nav__header' style={{ justifyContent: "space-between" }}>
                  <img src={logo} alt="logo" style={{ width: "63.5px", height: "17px", paddingInline: "6px" }} />
                  <MenuFoldOutlined style={{ fontSize: "18px", cursor: "pointer" }}
                    onClick={() => {
                      setisVerticalNavClosed(!isVerticalNavClosed);
                      handleNavBarState()
                    }} />
                </header>
                <ul className='vertical-nav__content'>
                  <li><Link to="/">
                    <AiFillHome style={{ width: "18px", height: "18px" }} />
                    <span>Home</span>
                  </Link></li>
                  <li><Link to="/mybooking">
                    <RiContactsBook3Fill style={{ width: "18px", height: "18px" }} />
                    <span>My Bookings</span>
                  </Link></li>
                  <li><Link to="/hotels">
                    <FaEarthAmericas style={{ width: "18px", height: "18px" }} />
                    <span>Explore</span>
                  </Link></li>
                  <Tooltip placement="right" title="This feature is not ready yet!" >
                    <li><Link >
                      <FaCircleQuestion style={{ width: "18px", height: "18px" }} />
                      <span>Support</span>
                    </Link></li>
                  </Tooltip>
                </ul>
              </div>
              {
                !isLogin &&
                <div className='vertical-nav__signUp'>
                  <Button color="danger" variant="outlined" className='vertical-nav__signUp-btn' shape='round'>
                    <Link to="/register">
                      Sign Up Now
                    </Link>
                  </Button>
                </div>
              }
            </>
            :
            <>
              <div>
                <header className='vertical-nav__header' style={{ justifyContent: "center", textAlign: "center" }}>
                  <MenuUnfoldOutlined style={{ fontSize: "18px", cursor: "pointer" }}
                    onClick={() => {
                      setisVerticalNavClosed(!isVerticalNavClosed);
                      handleNavBarState()
                    }}
                  />
                </header>
                <ul className='vertical-nav__content-closed' style={{ justifyContent: "center", textAlign: "center" }}>
                  <li><Link to="/">
                    <AiFillHome style={{ width: "18px", height: "18px" }} />
                  </Link></li>
                  <li><Link to="/mybooking">
                    <RiContactsBook3Fill style={{ width: "18px", height: "18px" }} />
                  </Link></li>
                  <li><Link to="/hotels">
                    <FaEarthAmericas style={{ width: "18px", height: "18px" }} />
                  </Link></li>
                  <Tooltip placement="right" title="This feature is not ready yet!" >
                    <li><Link >
                      <FaCircleQuestion style={{ width: "18px", height: "18px" }} />
                    </Link></li>
                  </Tooltip>
                </ul>
              </div>
            </>
        }
        <img src={cloud} alt="cloud backgroud" style={{ position: "absolute", bottom: "0" }} />
      </div >
    </>
  )
}

export default NavVertical
