import { useEffect } from "react";
import Popular from "../../../components/accommodation/Popular";
import Promotion from "../../../components/accommodation/Promotion";
import Activity from "../../../components/activity/Activity";
import HeroImage from "../../../components/heroImage/HeroImage";
import SearchBox from "../../../components/search/SearchBox";

const HomePage = () => {

  useEffect(() => {
    document.title = "บาราลี รีสอร์ท เกาะช้าง | Barali Beach Resort Koh Chang";
  }, []);

  return (
    <>
      {/* ภาพ Hero */}
      <HeroImage />

      {/* กล่องค้นหา */}
      <div className="container">
        <SearchBox />
      </div>

      {/* รายการที่พักยอดนิยม */}
      <section className="container mb-4">
        <h3 className="fw-bold">
          <span className="border-bottom border-3 border-primary">ที่พักยอดนิยม</span>
        </h3>
        <Popular />
      </section>

      {/* โปรโมชัน */}
      <section className="container my-4">
        <h3 className="fw-bold">
          <span className="border-bottom border-3 border-primary">โปรโมชันพิเศษ</span>
        </h3>
        <Promotion />
      </section>

      {/* กิจกรรมแนะนำ */}
      <section className="container my-5">
        <h3 className="text-center fw-bold">
          <span className="border-bottom border-3 border-primary">เพลิดเพลินกับกิจกรรมชายหาดของเรา</span>
        </h3>
        <Activity />
      </section>
    </>
  );
};

export default HomePage;
