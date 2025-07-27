import './Recommended.css'
import { axiosInstanceRecommended, setLoadingHandler } from '../../apis/recommended'
import { useState, useEffect } from 'react';
import { Spin } from "antd";
import RecommendedCard from '../RecommendedCard/RecommendedCard';
import { Link } from 'react-router-dom';

const Recommended = () => {
    const [loading, setLoading] = useState(false);
    const [dataList, setDataList] = useState(null);

    useEffect(() => {
        setLoadingHandler(setLoading);
    }, []);

    useEffect(() => {
        const fetchRecommendedHotels = async () => {
            try {
                const res = await axiosInstanceRecommended.get();
                await setDataList(res.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchRecommendedHotels();
    }, []);

    return (
        <>
            {loading ? (
                <Spin tip="Loading" size="large" style={{ scale: "1.2" }}>
                    <div style={{ marginTop: "5rem" }} />
                </Spin>
            ) :
                <div className='recommended__list'>
                    <div className='recommended__header'>
                        <h2>Recommended Hotels</h2>
                        <Link to="/hotels">View all</Link>
                    </div>
                    <section className='recommended'>
                        {dataList && dataList.map((item) => (
                            <div className='recommended__card-list' key={item.id}>
                                <RecommendedCard recommended={item} />
                            </div>
                        ))}
                    </section>
                </div>
            }
        </>
    )
}

export default Recommended