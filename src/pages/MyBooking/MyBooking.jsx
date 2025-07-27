import './MyBooking.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Result } from 'antd';
import GeneralPath from '../../components/GeneralPath/GeneralPath';
import MyBookingCard from '../../components/MyBookingCard/MyBookingCard';
import { getDataFromLocalStorage } from '../../stores/BookingSlicer';
import MyBookingProfileCard from '../../components/MyBookingProfileCard/MyBookingProfileCard';

function MyBookig() {
  const isVerticalNavClosed = useSelector((state) => state.verticalNav.closedNav);
  const loggedStore = useSelector((state) => state.account.isLogged);
  const dispatch = useDispatch();
  const dataFromStore = useSelector((state) => state.booking.finalData);

  useEffect(() => {
    dispatch(getDataFromLocalStorage());
  }, [])

  return (
    <>
      <section className='content-general' style={{ width: isVerticalNavClosed ? "1060px" : "1250px", top: loggedStore ? "210px" : "390px" }}>

        <div className="content-general__path">
          <GeneralPath path={"myBooking"} length={0} />
        </div>
        <div className="mybooking-details" style={{
          marginRight: isVerticalNavClosed ? "120px" : "76px"
        }}>
          {
            dataFromStore.bookingList && dataFromStore.bookingList.length > 0 ?
              <>
                <div className='mybooking-found' style={{ width: isVerticalNavClosed ? '622px' : '862px' }}>
                  {
                    dataFromStore.bookingList.map((card, index) => (
                      <MyBookingCard key={index} data={card} />
                    ))
                  }
                </div>
              </> :
              <>
                <div className='mybooking-notfound' style={{ width: isVerticalNavClosed ? '622px' : '862px' }}>
                  <Result
                    status="404"
                    title="Empty Booking List"
                  />
                </div>
              </>
          }
          <div className='mybooking-profile'>
            <MyBookingProfileCard profile={dataFromStore} />
          </div>
        </div>
      </section>
    </>
  )
}

export default MyBookig
