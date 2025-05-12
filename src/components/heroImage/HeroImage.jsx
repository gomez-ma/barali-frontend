import { Carousel } from 'react-bootstrap';

const HeroImage = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const fullImageUrl = `${BASE_URL}/uploads/heroimages/`;
    const imageStyle = {
        height: '60vh',
        objectFit: 'cover'
    };

    return (
        <Carousel fade interval={3000} pause={false} touch={true} keyboard={true}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={`${fullImageUrl}12-2500x1667.jpg`}
                    alt="ห้องพักหรูริมทะเล"
                    style={imageStyle}
                />
                <Carousel.Caption>
                    <h3>ห้องพักหรูริมทะเล</h3>
                    <p>สัมผัสความเงียบสงบของธรรมชาติ และความสะดวกสบายระดับพรีเมียม</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={`${fullImageUrl}13-2500x1667.jpg`}
                    alt="ห้องสวีทสุดพิเศษ"
                    style={imageStyle}
                />
                <Carousel.Caption>
                    <h3>ห้องสวีทสุดพิเศษ</h3>
                    <p>ตกแต่งหรูหรา พร้อมวิวที่สวยงาม</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={`${fullImageUrl}14-2500x1667.jpg`}
                    alt="ชายหาดส่วนตัว"
                    style={imageStyle}
                />
                <Carousel.Caption>
                    <h3>ชายหาดส่วนตัว</h3>
                    <p>พักผ่อนท่ามกลางเสียงคลื่นและบรรยากาศแสนสงบ</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={`${fullImageUrl}15-2500x1667.jpg`}
                    alt="สิ่งอำนวยความสะดวกครบครัน"
                    style={imageStyle}
                />
                <Carousel.Caption>
                    <h3>สิ่งอำนวยความสะดวกครบครัน</h3>
                    <p>สระว่ายน้ำ ฟิตเนส สปา และอีกมากมายรอคุณอยู่</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default HeroImage;
