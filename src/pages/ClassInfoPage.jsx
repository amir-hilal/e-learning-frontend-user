import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import classService from '../services/classService';
import WithdrawModal from '../components/WithdrawModal';

const ClassInfoPage = () => {
    const { id } = useParams();
    const [classInfo, setClassInfo] = useState(null);
    const [files, setFiles] = useState([]);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchClassInfo = async () => {
            try {
                const data = await classService.getClassInfo(id);
                setClassInfo(data);
                setFiles(data.files);

                // Check if the user is enrolled in this class
                const enrolledClasses = await classService.getEnrolledClasses();
                const enrolled = enrolledClasses.some((enrollment) => enrollment.class._id === id);
                setIsEnrolled(enrolled);
            } catch (error) {
                console.error('Failed to fetch class info:', error);
                toast.error('Failed to fetch class info');
            }
        };

        fetchClassInfo();
    }, [id]);

    const handleEnroll = async () => {
        try {
            await classService.enrollInClass(id);
            toast.success('Enrolled successfully');
            setIsEnrolled(true);
        } catch (error) {
            console.error('Failed to enroll:', error);
            toast.error('Failed to enroll');
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleWithdrawSuccess = () => {
        setIsEnrolled(false);
        closeModal();
        toast.success('Withdrawal form submitted');
    };

    if (!classInfo) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h2 className="mb-4">{classInfo.title}</h2>
            <p>{classInfo.description}</p>
            <p><strong>Instructor:</strong> {classInfo.instructor}</p>
            {isEnrolled ? (
                <button onClick={openModal} className="p-3 border-none surface-700 text-white border-round cursor-pointer">
                    Apply for Withdrawal
                </button>
            ) : (
                <button onClick={handleEnroll} className="p-3 border-none surface-700 text-white border-round cursor-pointer">
                    Enroll
                </button>
            )}
            <h3 className="mt-4">Files</h3>
            <div className="grid">
                {files.map((file) => (
                    <div key={file} className="col-12 md:col-6 lg:col-4 p-3">
                        <div className="surface-card shadow-2 p-4 border-round">
                            <p>{file}</p>
                            <button onClick={() => classService.downloadFile(file)} className="p-2 border-none surface-700 text-white border-round cursor-pointer">
                                Download
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <WithdrawModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                classId={id}
                onWithdrawSuccess={handleWithdrawSuccess}
            />
        </div>
    );
};

export default ClassInfoPage;
