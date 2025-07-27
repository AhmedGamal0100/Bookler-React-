import { Link } from 'react-router-dom';
import './GeneralPath.css';
import { useSelector } from 'react-redux';

const GeneralPath = ({ path, length }) => {
    const isVerticalNavClosed = useSelector((state) => state.verticalNav.closedNav);

    return (
        <>
            <div className="general-path" style={{
                width: isVerticalNavClosed ? '895px' : '1135px',
            }}>
                {
                    path === "home" ?
                        <><h3>Hotels</h3><p> Total&nbsp; <span>{length} results</span></p></>
                        : path === "details" ?
                            <><h3>Hotel Details</h3><p style={{ color: "#C9CACA" }}> <Link to="/hotels" className='grey-color'>Hotel</Link>  &gt;&nbsp; <span> Hotel Details</span></p></>
                            : path === "booking" ?
                                <><h3>Booking</h3><p style={{ color: "#C9CACA" }}> <Link to="/hotels" className='grey-color'>Hotel</Link> &gt; <span style={{ color: "#C9CACA" }}>Hotel Details</span> &gt;&nbsp;<span> Booking</span></p></>
                                : path === "myBooking" &&
                                <><h3>My Bookings</h3><p style={{ color: "#177CFD" }}>My Bookings</p></>
                }
            </div >
        </>
    )
}

export default GeneralPath;