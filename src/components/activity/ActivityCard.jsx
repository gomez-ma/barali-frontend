import { useState } from 'react';
import { Modal } from 'react-bootstrap';

const ActivityCard = ({ activity }) => {
    const [showModal, setShowModal] = useState(false);

    const imageUrl = `${import.meta.env.VITE_BASE_URL}/uploads/activities/${activity.image_name}`;

    const title = activity.name || "กิจกรรม";

    const handleCardClick = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <button
                className="activity-card h-100 d-flex flex-column border rounded overflow-hidden shadow-sm text-start p-0 bg-white w-100"
                onClick={handleCardClick}
                aria-label={`${title}`}
                style={{ cursor: "pointer" }}
            >
                <div className="activity-image-container position-relative">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="activity-image img-fluid w-100 object-fit-cover"
                        style={{ height: "200px" }}
                    />
                    <div className="activity-overlay position-absolute w-100 h-100 d-flex align-items-end top-0 start-0">
                        <div className="overlay-content w-100 p-3 bg-dark bg-opacity-50">
                            <h5 className="activity-title mb-0 text-white">{title}</h5>
                        </div>
                    </div>
                </div>
            </button>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
                size="lg"
                dialogClassName="activity-modal"
                aria-labelledby="activity-modal-title"
            >
                <div className="position-relative bg-white rounded shadow overflow-hidden">
                    {/* ปุ่มปิด */}
                    <button
                        onClick={handleCloseModal}
                        className="btn btn-close position-absolute top-0 end-0 m-2 z-3"
                        aria-label="Close"
                    />

                    {/* รูปภาพ */}
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-100 img-fluid"
                        style={{ objectFit: 'cover', maxHeight: '70vh' }}
                    />

                    {/* ข้อความใต้รูป */}
                    <div className="p-3 text-center bg-white">
                        <h4 id="activity-modal-title" className="mb-2">{title}</h4>
                    </div>
                </div>
            </Modal>

        </>
    );
};

export default ActivityCard;
