import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ClassCard from '../components/ClassCard';

const ClassListPage = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await api.get('/classes');
                setClasses(response.data);
            } catch (error) {
                console.error('Failed to fetch classes:', error);
            }
        };

        fetchClasses();
    }, []);

    return (
        <div className="p-4">
            <h2 className="mb-4">Available Classes</h2>
            <div className="grid">
                {classes.map((classInfo) => (
                    <ClassCard key={classInfo._id} classInfo={classInfo} />
                ))}
            </div>
        </div>
    );
};

export default ClassListPage;
