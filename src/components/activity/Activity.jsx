import { useEffect, useState } from "react";
import ActivityService from "../../services/api/activity/activity.service"
import ActivityCard from "./activityCard";
import { Spinner } from "react-bootstrap";

const Activity = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            setLoading(true);
            const res = await ActivityService.getAll();
            //console.log(res?.data);
            setActivities(res?.data || []);
        } catch (error) {
            console.error("Error fetching activities:", error);
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
                    <div className="text-center">
                        <h3 className="fw-bold mb-4">
                            <span className="border-bottom border-3 border-primary pb-1">เพลิดเพลินกับกิจกรรมชายหาดของเรา</span>
                        </h3>
                    </div>
                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <ActivityCard
                                key={activity.id}
                                activity={activity}
                            />
                        ))
                    ) : (
                        <div className="text-center col-12">
                            <p className="text-danger">
                                ไม่สามารถโหลดข้อมูลกิจกรรมได้
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
export default Activity