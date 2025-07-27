import { FaLocationDot } from 'react-icons/fa6';
import './BookingSummaryCard.css';
import { DatePicker, Alert, Divider } from 'antd';
import { useDispatch } from 'react-redux';
import { setDateFrom, setDateTo } from '../../stores/BookingSlicer';

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useState } from 'react';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(advancedFormat);

const BookingSummaryCard = ({ data }) => {
    if (!data) return null;
    const dispatch = useDispatch();
    const [dateError, setDateError] = useState(false)
    const [dateFrom, setDateFromState] = useState(null);
    const [dateTo, setDateToState] = useState(null);

    const handleDateChange = (date, type) => {
        if (!date) return;

        if (type === 'from') {
            setDateFromState(date);
            dispatch(setDateFrom(dayjs(date).format('DD MMM, YYYY, dddd')));
        } else {
            setDateToState(date);

            if (dateFrom && dayjs(date).isAfter(dateFrom)) {
                setDateError(false);
                dispatch(setDateTo(dayjs(date).format('DD MMM, YYYY, dddd')));
            } else {
                setDateError(true);
            }
        }
    };

    const nights = dateFrom && dateTo && !dateError
        ? dateTo.diff(dateFrom, 'day')
        : 0;

    return (
        <div className="summary">
            <div className="summray__container">
                <h3>Summary</h3>
                <img src={data.images.main} alt="summary" />
                <div className='summary__header'>
                    <div className='summary__header-left'>
                        <h6>{data.name}</h6>
                        <div className='summary__header-address'>
                            <FaLocationDot className='summary__location' style={{ marginRight: "0.5rem" }} />
                            <span>
                                {data.address.street}, {data.address.city}, {data.address.country}
                            </span>
                        </div>
                    </div>
                    <div className='summary__header-right'>
                        <div>{data.pricing[0].discount}</div>
                        <div>
                            <p>{data.pricing[0].discountedPrice}</p>
                            <span>{data.pricing[0].currency}</span>
                        </div>
                        <div>{data.pricing[0].priceUnit}</div>
                    </div>
                </div>

                <label>Check In</label>
                <DatePicker
                    onChange={(date) => handleDateChange(date, 'from')}
                    className='summary__date'
                    style={{ marginBottom: "14px" }}
                    format="DD MMM, YYYY, dddd"
                />

                <label>Check Out</label>
                <DatePicker
                    style={{ marginBottom: "32px" }}
                    onChange={(date) => handleDateChange(date, 'to')}
                    className='summary__date'
                    format="DD MMM, YYYY, dddd"
                />
                <div>
                    {
                        dateError ?
                            <>
                                <Alert message='Check out date must be after check in date!' type="error" showIcon />
                            </> :
                            <>
                                <div className='summary__footer'>
                                    <p>Price Per Night</p>
                                    <span>{data.pricing[0].discountedPrice}</span>
                                </div>
                                <div className='summary__footer'>
                                    <p>Nights</p>
                                    <span>{nights}</span>
                                </div>
                                <Divider style={{ marginBlock: "8px", borderColor: "#d9d9d9" }} />
                                <div className='summary__footer'>
                                    <p>Total Price</p>
                                    <span>${data.pricing[0].discountedPrice * nights}</span>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default BookingSummaryCard;
