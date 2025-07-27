import './Details.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setLoadingHandler, axiosInstanceHotels } from '../../apis/hotels';
import { Spin } from 'antd';
import GeneralPath from '../../components/GeneralPath/GeneralPath';
import { useParams } from 'react-router-dom';
import Recommended from '../../components/Recommended/Recommended';
import DetailsCard from '../../components/Details/DetailsCard';

const Details = () => {
    const isVerticalNavClosed = useSelector((state) => state.verticalNav.closedNav);
    const loggedStore = useSelector((state) => state.account.isLogged);
    const [dataList, setDataList] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoadingHandler(setLoading);
    }, []);

    useEffect(() => {
        const fetchHotelsDetails = async () => {
            try {
                const res = await axiosInstanceHotels.get(`/${id}`);
                setDataList(res.data);
            } catch (error) {
                console.error('Error fetching hotel details:', error);
            }
        };

        fetchHotelsDetails();
    }, [id]);
    return (
        <>
            <section className='content-general' style={{ width: isVerticalNavClosed ? "1060px" : "1250px", top: loggedStore ? "210px" : "390px" }}>
                {loading ? (
                    <Spin tip="Loading" size="large"
                        style={{ scale: "1.2" }} >
                        <div style={{ marginTop: "5rem" }} />
                    </Spin >
                ) :
                    <>
                        <div className="content-general__path">
                            <GeneralPath path={"details"} length={0} />
                        </div>
                        <div className="hotels-details" style={{
                            marginRight: isVerticalNavClosed ? "120px" : "76px"
                        }}>
                            <DetailsCard data={dataList} />
                        </div>
                        <Recommended />
                    </>
                }
            </section>
        </>
    )
}

export default Details;