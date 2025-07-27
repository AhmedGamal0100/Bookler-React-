import { useSelector } from "react-redux"
import { axiosInstanceHotels, setLoadingHandler } from '../../apis/hotels';
import { Spin } from "antd";
import { useState, useEffect } from "react";
import HotelsCard from "../../components/HotelsCard/HotelsCard";
import GeneralPath from "../../components/GeneralPath/GeneralPath";

import './Hotels.css';

function Hotels() {
  const isVerticalNavClosed = useSelector((state) => state.verticalNav.closedNav);
  const loggedStore = useSelector((state) => state.account.isLogged);
  const [dataList, setDataList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [length, setLength] = useState(0);

  useEffect(() => {
    setLoadingHandler(setLoading);
  }, []);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axiosInstanceHotels.get();
        await setDataList(res.data);
        await setLength(res.data.length)

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchHotels();
  }, []);
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
          </>
        }
      </section>
    </>
  )
}

export default Hotels
