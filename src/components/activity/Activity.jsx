import { useEffect, useState, useRef, useCallback } from "react";
import { Spinner } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import ActivityService from "../../services/api/activity/activity.service"
import ActivityCard from "./activityCard";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Activity = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentIndex, setCurrentIndex] = useState(0);
    const autoPlayIntervalRef = useRef(null);
    const slideSpeed = 5000; // ความเร็วคงที่ 5 วินาที
    
    const itemsPerView = 4;
    const maxIndex = Math.max(0, activities.length - itemsPerView);

    useEffect(() => {
        fetchActivities();
        return () => {
            // Cleanup เมื่อ component unmount
            if (autoPlayIntervalRef.current) {
                clearInterval(autoPlayIntervalRef.current);
            }
        };
    }, []);

    // ฟังก์ชันสำหรับ auto slide
    const startAutoPlay = useCallback(() => {
        if (autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
        }
        
        autoPlayIntervalRef.current = setInterval(() => {
            setCurrentIndex(prevIndex => {
                // วน loop เมื่อถึงสไลด์สุดท้าย
                if (prevIndex >= maxIndex) {
                    return 0;
                }
                return prevIndex + 1;
            });
        }, slideSpeed);
    }, [maxIndex]);

    // เริ่ม auto play เมื่อ component mount หรือ activities เปลี่ยนแปลง
    useEffect(() => {
        if (activities.length > 0) {
            startAutoPlay();
        }
        
        return () => {
            if (autoPlayIntervalRef.current) {
                clearInterval(autoPlayIntervalRef.current);
            }
        };
    }, [activities.length, startAutoPlay]);

    const fetchActivities = async () => {
        try {
            setLoading(true);
            const res = await ActivityService.getAll();
            setActivities(res?.data || []);
        } catch (error) {
            console.error("Error fetching activities:", error);
        } finally {
            setLoading(false);
        }
    };

    const nextSlide = () => {
        // หยุด auto play ชั่วคราวเมื่อกดปุ่มเอง
        if (autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
        }
        
        if (currentIndex < maxIndex) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // วนกลับไปสไลด์แรกเมื่อกดปุ่ม next ที่สไลด์สุดท้าย
            setCurrentIndex(0);
        }
        
        // เริ่ม auto play ใหม่หลังจากกดปุ่ม
        setTimeout(startAutoPlay, 2000);
    };

    const prevSlide = () => {
        // หยุด auto play ชั่วคราวเมื่อกดปุ่มเอง
        if (autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
        }
        
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            // วนกลับไปสไลด์สุดท้ายเมื่อกดปุ่ม prev ที่สไลด์แรก
            setCurrentIndex(maxIndex);
        }
        
        // เริ่ม auto play ใหม่หลังจากกดปุ่ม
        setTimeout(startAutoPlay, 2000);
    };

    return (
        <div className="row p-3">
            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <>
                    <div className="text-center">
                        <h3 className="fw-bold mb-4">
                            <span className="border-bottom border-3 border-primary pb-1">เพลิดเพลินกับกิจกรรมชายหาดของเรา</span>
                        </h3>
                    </div>
                    <div className="position-relative my-4">
                        <div className="container-fluid px-0">
                            <Row className="mx-0">
                                <Col xs={12} className="px-0">
                                    {/* Swiper Container */}
                                    <div className="overflow-hidden position-relative">
                                        <Row
                                            className="flex-nowrap transition-transform"
                                            style={{
                                                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                                                transition: 'transform 300ms ease-in-out'
                                            }}
                                        >
                                            {activities.map((activity) => (
                                                <ActivityCard key={activity.id} activity={activity} />
                                            ))}
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevSlide}
                            className="position-absolute top-50 start-0 translate-middle-y bg-white p-2 rounded-circle shadow border-0 ms-2"
                            style={{
                                zIndex: 10,
                                cursor: 'pointer'
                            }}
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="position-absolute top-50 end-0 translate-middle-y bg-white p-2 rounded-circle shadow border-0 me-2"
                            style={{
                                zIndex: 10,
                                cursor: 'pointer'
                            }}
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Pagination Dots */}
                        {/* <div className="d-flex justify-content-center mt-3">
                            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                                <button
                                    key={index}
                                    className="mx-1 border-0 p-0"
                                    style={{
                                        height: '8px',
                                        width: '8px',
                                        borderRadius: '50%',
                                        backgroundColor: index === currentIndex ? '#0d6efd' : '#dee2e6'
                                    }}
                                    onClick={() => {
                                        setCurrentIndex(index);
                                        // หยุด auto play ชั่วคราวเมื่อกดเลือกสไลด์เอง
                                        if (autoPlayIntervalRef.current) {
                                            clearInterval(autoPlayIntervalRef.current);
                                        }
                                        // เริ่ม auto play ใหม่หลังจากเลือกสไลด์
                                        setTimeout(startAutoPlay, 2000);
                                    }}
                                />
                            ))}
                        </div> */}
                    </div>
                </>
            )}
        </div>
    )
}

export default Activity;