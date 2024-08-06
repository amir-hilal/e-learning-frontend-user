import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classService from '../services/classService';
import ClassCard from '../components/ClassCard';

const DashboardPage = () => {
    const [enrolledClasses, setEnrolledClasses] = useState([]);

    useEffect(() => {
        const fetchEnrolledClasses = async () => {
            try {
                const data = await classService.getEnrolledClasses();
                setEnrolledClasses(data);
            } catch (error) {
                console.error('Failed to fetch enrolled classes:', error);
            }
        };

        fetchEnrolledClasses();
    }, []);

    return (
        <div className="p-4">
            <h2 className="mb-4">Dashboard</h2>
            <div className="grid">
                <Link to="/classes" className="col-6 p-3">
                    <div className="surface-card shadow-2 p-4 border-round text-center cursor-pointer">
                        View Classes
                    </div>
                </Link>
                <Link to="/profile" className="col-6 p-3">
                    <div className="surface-card shadow-2 p-4 border-round text-center cursor-pointer">
                        View Profile
                    </div>
                </Link>
            </div>
            <h3 className="mt-4">Enrolled Classes</h3>
            {enrolledClasses.length > 0 ? (
                <div className="grid">
                    {enrolledClasses.map((enrollment) => (
                        <ClassCard key={enrollment._id} classInfo={enrollment.class} />
                    ))}
                </div>
            ) : (
                <p>No enrolled classes.</p>
            )}
        </div>
    );
};

export default DashboardPage;
