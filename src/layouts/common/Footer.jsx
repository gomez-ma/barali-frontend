import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="py-4" style={{ backgroundColor: '#ebebeb'}}>
      <Container>
        <Row>
          <Col md={3}>
            <h5>เมนูหลัก</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">หน้าหลัก</a></li>
              <li><a href="/about" className="footer-link">เกี่ยวกับเรา</a></li>
              <li><a href="/contact" className="footer-link">ติดต่อเรา</a></li>
              <li><a href="/faq" className="footer-link">คำถามที่พบบ่อย</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>ห้องพัก</h5>
            <ul className="list-unstyled">
              <li><a href="/rooms/deluxe" className="footer-link">ห้องดีลักซ์</a></li>
              <li><a href="/rooms/suite" className="footer-link">ห้องสวีท</a></li>
              <li><a href="/rooms/family" className="footer-link">ห้องครอบครัว</a></li>
              <li><a href="/rooms/villa" className="footer-link">วิลล่า</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>จุดหมายและกิจกรรม</h5>
            <ul className="list-unstyled">
              <li><a href="/destinations/beach" className="footer-link">ชายหาด</a></li>
              <li><a href="/activities/snorkeling" className="footer-link">ดำน้ำตื้น</a></li>
              <li><a href="/activities/hiking" className="footer-link">เดินป่า</a></li>
              <li><a href="/activities/spa" className="footer-link">สปา</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>อีเวนต์ในรีสอร์ท</h5>
            <ul className="list-unstyled">
              <li><a href="/events/wedding" className="footer-link">งานแต่งงาน</a></li>
              <li><a href="/events/conference" className="footer-link">สัมมนา</a></li>
              <li><a href="/events/party" className="footer-link">ปาร์ตี้</a></li>
              <li><a href="/events/music-night" className="footer-link">ค่ำคืนดนตรี</a></li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-light" />
        <div className="text-center text-secondary">
          &copy; {new Date().getFullYear()} Barali Resort. All rights reserved.
        </div>
      </Container>
    </footer>

  );
};

export default Footer;
