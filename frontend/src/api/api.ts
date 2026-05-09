const BASE_URL = 'http://localhost:5000/api';

export const fetchEmployees = async () => {
  const response = await fetch(`${BASE_URL}/employees`);
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return response.json();
};

export const fetchStats = async () => {
  const response = await fetch(`${BASE_URL}/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }
  return response.json();
};

export const clockIn = async (employeeId: string) => {
  const response = await fetch(`${BASE_URL}/attendance/clock-in/${employeeId}`);
  if (!response.ok) {
    throw new Error('Failed to clock in');
  }
  return response.json();
};

export const fetchTodayLogs = async (employeeId: string) => {
  const response = await fetch(`${BASE_URL}/attendance/today/${employeeId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch logs');
  }
  return response.json();
};

export const clockOut = async (employeeId: string) => {
  const response = await fetch(`${BASE_URL}/attendance/clock-out/${employeeId}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to clock out');
  }
  return response.json();
};

export const startBreak = async (employeeId: string) => {
  const response = await fetch(`${BASE_URL}/attendance/break-start/${employeeId}`, { method: 'POST' });
  if (!response.ok) throw new Error('Failed to start break');
  return response.json();
};

export const endBreak = async (employeeId: string) => {
  const response = await fetch(`${BASE_URL}/attendance/break-end/${employeeId}`, { method: 'POST' });
  if (!response.ok) throw new Error('Failed to end break');
  return response.json();
};




