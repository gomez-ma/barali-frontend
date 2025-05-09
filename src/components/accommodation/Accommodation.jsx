import React, { useEffect, useState } from "react";
import AccommodationService from "../../services/api/accommodation/accommodation.service";
import AccommodationCard from "./AccommodationCard";
import { Spinner } from "react-bootstrap";

const Accommodation = () => {
    const [accommodations, setAccommodations] = useState([]); // แก้ไขชื่อ state function
    const [loading, setLoading] = useState(true); // เริ่มต้นเป็น true เพื่อแสดง loading ทันที

    useEffect(() => {
        fetchAccommodations();
    }, []);

    const fetchAccommodations = async () => {
        try {
            setLoading(true);
            const res = await AccommodationService.getAll();
            setAccommodations(res?.data || []); // แก้ไขชื่อ function ให้ถูกต้อง
        } catch (error) {
            console.error("Error fetching accommodations:", error); // ใช้ console.error แทน console.log
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row p-3">
            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <>
                    <div>
                        <h3 className="fw-bold mb-4">
                            <span className="border-bottom border-3 border-primary pb-1">ที่พักแนะนำ</span>
                        </h3>
                    </div>
                    {accommodations.length > 0 ? (
                        accommodations.map((acc) => (
                            <AccommodationCard
                                key={acc.id}
                                accommodation={acc}
                            />
                        ))
                    ) : (
                        <div className="text-center col-12">
                            <p className="text-danger">
                                ไม่สามารถโหลดข้อมูลห้องพักได้
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Accommodation;