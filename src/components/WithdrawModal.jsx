import React, { useState } from 'react';
import Modal from 'react-modal';
import api from '../services/api';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-40%',
        transform: 'translate(-50%, -50%)',
        width: '650px', // Adjust the width as needed
        height: '400px',
        padding: '20px',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)', // Black overlay
        backdropFilter: 'blur(10px)', // Blur effect
    },
};

const WithdrawModal = ({ isOpen, onRequestClose, classId, onWithdrawSuccess }) => {
    const [reason, setReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/withdrawals/apply', { classId, reason });
            onWithdrawSuccess();
            onRequestClose();
        } catch (error) {
            console.error('Failed to submit withdrawal form:', error);
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Withdraw from Class"
        >
            <h2>Withdraw from Class</h2>
            <form onSubmit={handleSubmit}>
                <div className="field mb-3">
                    <label htmlFor="reason">Reason for Withdrawal</label>
                    <textarea
                        id="reason"
                        rows={9}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="p-3 border-none surface-700 text-white border-round cursor-pointer"
                    disabled={isSubmitting}
                >
                    Submit
                </button>
            </form>
        </Modal>
    );
};

export default WithdrawModal;
