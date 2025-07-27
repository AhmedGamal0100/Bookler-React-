import NavbarImgBg from '../../assets/imgs/HeaderFull.jpg';
import NavbarImgBgLogged from '../../assets/imgs/bgHeader.png';
import pp from '../../assets/imgs/profilepic.png';
import { useState, useEffect, useRef } from 'react';
import { FaBed, FaHome, FaTaxi } from 'react-icons/fa';
import { RiFlightTakeoffFill } from 'react-icons/ri';
import './NavHorizontal.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import { useForm, Controller } from "react-hook-form"
import { Button, Popover, Select, Input, DatePicker, notification, Tooltip } from 'antd';
import { Link, useNavigate, useLocation } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';
import { setRemoveLogged } from '../../stores/AccountSlicer';
import { clearSearchReset } from '../../stores/SearchSlicer';


function NavHorizontal() {
  const [api, contextHolder] = notification.useNotification();
  const [isLogin, setIsLogin] = useState(false)
  const isVerticalNavClosed = useSelector((state) => state.verticalNav.closedNav);
  const loggedStore = useSelector((state) => state.account.isLogged);
  const loggedProfile = useSelector((state) => state.account.account);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const openNotification = (desc) => {
    api.open({
      message: 'Sign Out',
      description: desc,
      type: 'success',
      duration: 3,
    });
  };

  const location = useLocation();

  const signout = () => {
    dispatch(setRemoveLogged());
    openNotification("Signed Out Successfully!")
  }

  const handleOpenChange = newOpen => {
    setOpen(newOpen);
  };

  const searchResetFlag = useSelector((state) => state.search.searchReset);
  useEffect(() => {
    if (searchResetFlag) {
      reset({
        search: "",
        country: "",
        dateIn: null,
        dateOut: null,
      });
      dispatch(clearSearchReset());
    }
  }, [searchResetFlag]);


  // Countries Input Config
  const countries = [
    {
      label: 'Egypt',
      value: "EG",
      key: '1',
    },
    {
      label: "United States",
      value: "US",
      key: '2',
    },
    {
      label: "Morocco",
      value: "MA",
      key: '3',
    },
    {
      label: "Greece",
      value: "GR",
      key: '4',
    },
  ];

  // Date Input Config
  const dateFormat = "dd MMM'YY";

  // Form Config
  const { control, handleSubmit, reset } = useForm({
    search: "",
    country: {},
    dateIn: "",
    dateOut: "",
  })

  const onSubmit = (data) => {
    const query = new URLSearchParams();

    if (data.search) query.append("q", data.search);
    if (data.country) query.append("address.countryIsoCode", countries.find(country => country.key == data.country).value);

    navigate(`/search/?${query.toString()}`);
  };

  useEffect(() => {
    setIsLogin(loggedStore);
  }, [loggedStore])

  const resetSearch = () => {
    reset({
      search: "",
      country: "",
      dateIn: null,
      dateOut: null,
    })
    navigate('search/');
  }

  useEffect(() => {
    if (location.pathname !== "/search") {

      reset({
        search: "",
        country: "",
        dateIn: null,
        dateOut: null,
      });
    }
  }, [location.pathname, reset]);

  return (
    <>
      <div className='nav'>
        {contextHolder}
        {
          !isLogin ?
            <>
              <img src={NavbarImgBg} alt="Navbar-img-bg" />
              <ul className='nav__login-not-logged'>
                <li><Link to="/login" className=''>Login</Link></li>
                <li><Link to="/register" className=''>Register</Link></li>
              </ul>
              <ul className='nav__routing-not-logged' style={isVerticalNavClosed ? { left: "340px" } : { left: '110px' }}  >
                <li><Link to="/hotels" > <FaBed style={{ width: "24px", height: "24px" }} /> <span>Hotel</span> </Link></li>
                <Tooltip placement="bottom" title="This feature is not ready yet!" >
                  <li><Link > <FaHome style={{ width: "24px", height: "24px" }} /> <span>Villa</span> </Link></li>
                </Tooltip>
                <Tooltip placement="bottom" title="This feature is not ready yet!" >
                  <li><Link > <FaTaxi style={{ width: "24px", height: "24px" }} /> <span>Taxi</span> </Link></li>
                </Tooltip>
                <Tooltip placement="bottom" title="This feature is not ready yet!" >
                  <li><Link > <RiFlightTakeoffFill style={{ width: "24px", height: "24px" }} /> <span>Flights</span> </Link></li>
                </Tooltip>
              </ul>
            </>
            :
            <>
              <img src={NavbarImgBgLogged} alt="Navbar-img-bg" />
              <ul className='nav__routing-not-logged' style={{ left: isVerticalNavClosed ? "300px" : "110px", bottom: "1rem" }}  >
                <li><Link to="/hotels" > <FaBed style={{ width: "24px", height: "24px" }} /> <span>Hotel</span> </Link></li>
                <Tooltip placement="bottom" title="This feature is not ready yet!" >
                  <li><Link > <FaHome style={{ width: "24px", height: "24px" }} /> <span>Villa</span> </Link></li>
                </Tooltip>
                <Tooltip placement="bottom" title="This feature is not ready yet!" >
                  <li><Link > <FaTaxi style={{ width: "24px", height: "24px" }} /> <span>Taxi</span> </Link></li>
                </Tooltip>
                <Tooltip placement="bottom" title="This feature is not ready yet!" >
                  <li><Link > <RiFlightTakeoffFill style={{ width: "24px", height: "24px" }} /> <span>Flights</span> </Link></li>
                </Tooltip>

              </ul>
              <div className='nav__profile'>
                <Popover
                  content={
                    <div className="nav__profile-content">
                      <Button onClick={signout}>Sign Out</Button>
                    </div>
                  }
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <div className='nav__profile-btn'>
                    <img src={pp} alt="profile picture" />
                    <span>{loggedProfile.username}</span>
                    <DownOutlined />
                  </div>
                </Popover>
              </div>
            </>
        }
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='nav__search-bar'
            style={{
              width: isVerticalNavClosed ? '875px' : '1110px',
              right: isVerticalNavClosed ? '120px' : '75px',
              bottom: isLogin ? "-74px" : "-43px"
            }} >
            <div className='nav__search-right'>
              < div className='nav__search-input'>
                <label htmlFor="search">SEARCH</label>
                <Controller
                  name="search"
                  control={control}
                  render={({ field }) => <Input {...field} type="text" placeholder='Search...' id='search' className='nav__search-input-input' />}>
                </Controller>
              </div>
              <div className='nav__search-input'>
                <label >COUNTRY</label>
                <Controller
                  name="country"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Choose Country..."
                      size='large'

                      className='nav__search-input-select'
                      options={countries.map(c => ({ label: c.label, value: c.key }))}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </div>
              <div className='nav__search-input'>
                <label className="block mb-2 text-lg">CHECK-IN</label>
                <Controller
                  name="dateIn"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      className="nav__search-input-input nav__search-input-date" format={dateFormat} picker="day" style={{ fontWeight: 'bold' }}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                    />
                  )}
                />
              </div>
              {
                !isVerticalNavClosed &&
                <div className='nav__search-input'>
                  <label className="block mb-2 text-lg">CHECK-OUT</label>
                  <Controller
                    name="dateOut"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        className="nav__search-input-input nav__search-input-date" format={dateFormat} picker="day" style={{ fontWeight: 'bold' }}
                        onChange={(date) => {
                          field.onChange(date);
                        }}
                      />
                    )}
                  />
                </div>
              }
            </div>
            <div className='nav__search-left'>
              <Button className="nav__search-filter" shape='round' onClick={() => resetSearch()}>Clear Filters</Button>
              <button className="nav__search-search" type='submit' >Search</button>
            </div>
          </div >
        </form >
      </div >
    </>
  )
}

export default NavHorizontal
