const BASE_URL = 'http://localhost:5000/api';

// Helper to get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('tf_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const loginUser = async (employeeId: string, password: string) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ employeeId, password })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Login failed');
  }
  return response.json();
};

export const fetchEmployees = async () => {
  const response = await fetch(`${BASE_URL}/employees`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch employees');
  return response.json();
};

export const createEmployee = async (employeeData: any) => {
  const response = await fetch(`${BASE_URL}/employees`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(employeeData)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create employee');
  }
  return response.json();
};

export const deleteEmployee = async (id: string) => {
  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to delete employee');
  return response.json();
};

export const fetchStats = async () => {
  const response = await fetch(`${BASE_URL}/stats`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
};

export const clockIn = async (employeeId: string, latitude: number, longitude: number) => {
  const response = await fetch(`${BASE_URL}/attendance/clock-in/${employeeId}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ latitude, longitude })
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to clock in');
  }
  return response.json();
};

export const fetchTodayLogs = async (employeeId: string) => {
  const response = await fetch(`${BASE_URL}/attendance/today/${employeeId}`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch logs');
  return response.json();
};

export const clockOut = async (employeeId: string) => {
  const response = await fetch(`${BASE_URL}/attendance/clock-out/${employeeId}`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to clock out');
  }
  return response.json();
};

export const startBreak = async (employeeId: string) => {
  const response = await fetch(`${BASE_URL}/attendance/break-start/${employeeId}`, { 
    method: 'POST',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to start break');
  return response.json();
};

export const endBreak = async (employeeId: string) => {
  const response = await fetch(`${BASE_URL}/attendance/break-end/${employeeId}`, { 
    method: 'POST',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to end break');
  return response.json();
};

export const fetchSites = async () => {
  const response = await fetch(`${BASE_URL}/sites`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch sites');
  return response.json();
};

export const updateSiteCoordinates = async (siteId: string, latitude: number, longitude: number) => {
  const response = await fetch(`${BASE_URL}/sites/${siteId}/coordinates`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ latitude, longitude })
  });
  if (!response.ok) throw new Error('Failed to update site coordinates');
  return response.json();
};

export const fetchLiveTracking = async () => {
  const response = await fetch(`${BASE_URL}/tracking/live`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch tracking data');
  return response.json();
};
