import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import WithdrawModal from '../components/WithdrawModal';
import classService from '../services/classService';

const ClassInfoPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector((state) => state.auth.user);

    const [classInfo, setClassInfo] = useState(null);
    const [files, setFiles] = useState([]);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [withdrawalStatus, setWithdrawalStatus] = useState(null);

    useEffect(() => {
        if (!user) return; // If user is null, do not proceed

        const fetchClassInfo = async () => {
            try {
                const data = await classService.getClassInfo(id);
                setClassInfo(data);
                setFiles(data.files);

                // Check if the user is enrolled in this class
                const enrolledClasses = await classService.getEnrolledClasses();
                const enrolled = enrolledClasses.some((enrollment) => enrollment.class._id === id);
                setIsEnrolled(enrolled);

                // Check for existing withdrawal form
                const response = await classService.getUserWithdrawalForms();
                const existingForm = response.find((form) => form.class._id === id);
                if (existingForm) {
                    setWithdrawalStatus(existingForm.status);
                }
            } catch (error) {
                console.error('Failed to fetch class info:', error);
                toast.error('Failed to fetch class info');
            }
        };

        fetchClassInfo();
    }, [id, user]);

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
            <h2 className="mb-4 cursor-pointer" onClick={() => navigate('/')}>&#10229;</h2>
            <h2 className="mb-4">{classInfo.title}</h2>
            <p>{classInfo.description}</p>
            <p><strong>Instructor:</strong> {classInfo.instructor}</p>
            {isEnrolled ? (
                <button
                    onClick={openModal}
                    className="p-3 border-none surface-700 text-white border-round cursor-pointer"
                    disabled={withdrawalStatus === 'pending'}
                >
                    {withdrawalStatus === 'pending' ? 'Withdrawal Pending' : 'Apply for Withdrawal'}
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
