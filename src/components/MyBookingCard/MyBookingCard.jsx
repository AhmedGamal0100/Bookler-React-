import { useEffect, useState } from 'react';
import './MyBookingCard.css';
import { axiosInstanceHotels, setLoadingHandler } from '../../apis/hotels';
import { Tooltip, Spin } from 'antd';
import { CalendarOutlined, StarFilled } from '@ant-design/icons';

const MyBookingCard = ({ data }) => {
    if (!data) return null;

    const [hotels, setHotels] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(data);

        setLoadingHandler(setLoading);
    }, []);

    useEffect(() => {
        const fetchHotelsDetails = async () => {
            try {
                setLoading(true);
                const res = await axiosInstanceHotels.get(`/${data.hotelId}`);
                setHotels(res.data);
                console.log(res.data);

            } catch (error) {
                console.error('Error fetching hotel details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHotelsDetails();
    }, [data.hotelId]);

    return (
        <Spin spinning={loading}>
            <div className="mybooking-card">
                <div className="mybooking-img">
                    {hotels?.images?.main ? (
                        <img src={hotels.images.main} alt="Hotel thumbnail" />
                    ) : (
                        <div className="mybooking-img__placeholder">No Image</div>
                    )}
                </div>

                <div className="mybooking-content">
                    <div className='mybooking-rate'>
                        <p>
                            {hotels?.rating?.score}
                        </p>
                        <StarFilled />
                    </div>

                    <div className="mybooking-upper">
                        <h2>{hotels?.name || 'Hotel Name'}</h2>
                        <p>{hotels?.description || 'No description available.'}</p>
                    </div>

                    <div className="mybooking-lower">
                        <div className="mybooking-amenities-container">
                            {hotels?.amenities?.length ? (
                                hotels.amenities.map((amen) => (
                                    <Tooltip title={amen} key={amen}>
                                        <div className="mybooking-amenity">
                                            <p>{amen}</p>
                                        </div>
                                    </Tooltip>
                                ))
                            ) : (
                                <p>No amenities listed.</p>
                            )}
                        </div>

                        <div className="mybooking-lower-container">
                            {hotels?.pricing?.[0] ? (
                                <p>
                                    {hotels.pricing[0].discount}{' '}
                                    <b>${hotels.pricing[0].discountedPrice}</b>
                                </p>
                            ) : (
                                <p>Price info not available</p>
                            )}

                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} className='mybooking-lower-dates'>
                                <div>
                                    <span>From:</span>
                                    <CalendarOutlined className='mybooking-lower-icon' />
                                    <p className='mybooking-lower-from-date'>{data.dateFrom.split(',').slice(0, 2).join(',')}</p>
                                </div>
                                <div>
                                    <span>To:</span>
                                    <CalendarOutlined className='mybooking-lower-icon' />
                                    <p>{data.dateTo.split(',').slice(0, 2).join(',')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    );
};

export default MyBookingCard;
