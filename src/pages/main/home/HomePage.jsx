import Popular from "../../../components/accommodation/Popular";
import Promotion from "../../../components/accommodation/Promotion";
import Activity from "../../../components/activity/Activity"; // แก้ชื่อไฟล์ให้ตรง
import HeroImage from "../../../components/heroImage/HeroImage";
import SearchBox from "../../../components/search/SearchBox";

const HomePage = () => {
  return (
    <>
      {/* ภาพ */}
      <HeroImage />

      {/* กล่องค้นหา */}
      <div
        className="position-absolute w-100 search-box-wrapper"
        style={{ bottom: "25%", left: 0, zIndex: 10 }}
      >
        <div className="container">
          <SearchBox />
        </div>
      </div>

      {/* รายการที่พักยอดนิยม */}
      <section className="container mt-5 mb-4">
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