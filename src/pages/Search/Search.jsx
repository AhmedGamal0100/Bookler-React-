import './Search.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingHandler, axiosInstanceHotels } from '../../apis/hotels';
import { useLocation } from 'react-router-dom';
import { Spin } from "antd";
import HotelsCard from "../../components/HotelsCard/HotelsCard";
import GeneralPath from "../../components/GeneralPath/GeneralPath";
import './Search.css';
import SearchNotFound from '../../components/SearchNotFound/SearchNotFound';

const Search = () => {
    const isVerticalNavClosed = useSelector((state) => state.verticalNav.closedNav);
    const loggedStore = useSelector((state) => state.account.isLogged);
    const [dataList, setDataList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [length, setLength] = useState(0);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get("q");
    const country = searchParams.get("address.countryIsoCode");

    useEffect(() => {
        setLoadingHandler(setLoading);

    }, []);

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            try {
                const res = await axiosInstanceHotels.get("");
                let hotels = res.data;
                if (name) {
                    hotels = hotels.filter(hotel =>
                        hotel.name.toLowerCase().includes(name.toLowerCase())
                    );
                }
                if (country) {
                    hotels = hotels.filter(hotel =>
                        hotel.address.countryIsoCode === country
                    );
                }
                await setDataList(hotels);
                await setLength(hotels.length)

            } catch (error) {
                console.error('Error fetching hotels:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, [name, country]);

    return (
        <>
            <section className='content-general' style={{ width: isVerticalNavClosed ? "1060px" : "1250px", top: loggedStore ? "210px" : "390px" }}>
                {loading ? (
                    <Spin tip="Loading" size="large"
                        style={{ scale: "1.2" }} >
                        <div style={{ marginTop: "5rem" }} />
                    </Spin >
                ) :
                    length > 0 ?
                        <>
                            <div className="content-general__path">
                                <GeneralPath path={"home"} length={length} />
                            </div>
                            <div className="hotels" style={{
                                marginRight: isVerticalNavClosed ? "120px" : "76px"
                            }}>
                                {dataList && dataList.map((item) => (
                                    <div className='hotels__container' key={item.id}>
                                        <HotelsCard hotels={item} />
                                    </div>
                                ))}
                            </div>
                        </> :
                        <>
                            <SearchNotFound />
                        </>
                }
            </section>
        </>
    );
};

export default Search;
