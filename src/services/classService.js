import api from './api';

const getEnrolledClasses = async () => {
  try {
    console.log('before');
    const response = await api.get('/enrollments/my-enrollments');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch enrolled classes:', error);
    throw error;
  }
};

const getClassInfo = async (id) => {
  try {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch class info:', error);
    throw error;
  }
};

const enrollInClass = async (classId) => {
  try {
    const response = await api.post('/enrollments/enroll', { classId });
    return response.data;
  } catch (error) {
    console.error('Enrollment failed:', error);
    throw error;
  }
};

const applyWithdrawal = async (classId, reason) => {
  try {
    const response = await api.post('/withdrawals/apply', { classId, reason });
    return response.data;
  } catch (error) {
    console.error('Failed to submit withdrawal form:', error);
    throw error;
  }
};

const getUserWithdrawalForms = async () => {
  try {
    const response = await api.get('/withdrawals/my-withdrawals');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch withdrawal forms:', error);
    throw error;
  }
};

const getAllWithdrawalForms = async () => {
  try {
    const response = await api.get('/withdrawals');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch withdrawal forms:', error);
    throw error;
  }
};

const downloadFile = (file) => {
  window.open(`http://localhost:5000/api/files/view/${file}`, '_blank');
};

const classService = {
  getEnrolledClasses,
  getClassInfo,
  enrollInClass,
  applyWithdrawal,
  getUserWithdrawalForms, // Add this method
  getAllWithdrawalForms, // Add this method
  downloadFile,
};

export default classService;
