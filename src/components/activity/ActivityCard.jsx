import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { X } from 'react-bootstrap-icons';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ActivityCard = ({ activity }) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const fullImageUrl = `${BASE_URL}/uploads/activities/${activity.image_name}`;
    
    const handleImageClick = () => {
        setShowOverlay(true);
    };
    
    const handleClose = () => {
        setShowOverlay(false);
    };
    
    return (
        <>
            <div className="col-lg-3 px-2 py-2">
                <div className="border rounded p-2 shadow-sm h-100">
                    <Row>
                        <Col md={12}>
                            <div 
                                className="activity-image-wrapper position-relative" 
                                onClick={handleImageClick}
                                style={{ cursor: 'pointer' }}
                            >
                                <img 
                                    src={fullImageUrl} 
                                    alt={activity.name} 
                                    className="img-fluid rounded activity-image" 
                                />
                                <div className="overlay">
                                    <div className="overlay-text">{activity.name}</div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            
            {/* Image Overlay Modal */}
            <Modal 
                show={showOverlay} 
                onHide={handleClose} 
                centered 
                size="lg"
                contentClassName="bg-transparent border-0"
            >
                <div className="position-relative">
                    <button
                        onClick={handleClose}
                        className="position-absolute top-0 end-0 bg-dark bg-opacity-50 text-white border-0 rounded-circle d-flex justify-content-center align-items-center p-2 m-2"
                        style={{ zIndex: 1050, width: '40px', height: '40px' }}
                    >
                        <X size={24} />
                    </button>
                    
                    <Modal.Body className="p-0">
                        <div className="text-center">
                            <img 
                                src={fullImageUrl} 
                                alt={activity.name} 
                                className="img-fluid rounded shadow-lg"
                                style={{ maxHeight: '80vh' }}
                            />
                            <div className="bg-dark bg-opacity-75 text-white py-2 px-3 rounded-bottom">
                                <h5 className="mb-0">{activity.name}</h5>
                                {activity.description && (
                                    <p className="mb-0 mt-1 small">{activity.description}</p>
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
};

export default ActivityCard;