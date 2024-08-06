import React from 'react';
import { Link } from 'react-router-dom';

const ClassCard = ({ classInfo }) => {
    return (
        <div className="col-12 md:col-6 lg:col-4 p-3">
            <Link to={`/classes/${classInfo._id}`}>
                <div className="surface-card shadow-2 p-4 border-round cursor-pointer">
                    <h3 className="text-2xl">{classInfo.title}</h3>
                    <p>{classInfo.description}</p>
                    <p><strong>Instructor:</strong> {classInfo.instructor}</p>
                </div>
            </Link>
        </div>
    );
};

export default ClassCard;
