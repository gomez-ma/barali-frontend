import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ActivityCard = ({ activity }) => {
    const fullImageUrl = `${BASE_URL}/uploads/activities/${activity.image_name}`;
    return (
        <div className="col-lg-3 px-2 py-2">
            <div className="border rounded p-2 shadow-sm h-100">
                <Row>
                    <Col md={12}>
                        <div className="activity-image-wrapper position-relative">
                            <img src={fullImageUrl} alt={activity.name} className="img-fluid rounded activity-image" />
                            <div className="overlay">
                                <div className="overlay-text">{activity.name}</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ActivityCard;
