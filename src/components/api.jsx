const API_BASE_URL = 'http://localhost:5000/api';

export const adminLogin = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

export const fetchPackages = async () => {
  const response = await fetch(`${API_BASE_URL}/packages`);
  return response.json();
};

export const addPackage = async (packageData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/packages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(packageData),
  });
  if (!response.ok) throw new Error('Failed to add package');
  return response.json();
};

export const updatePackage = async (id, data) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update package');
  return response.json();
};

export const deletePackage = async (id) => {
  const token = localStorage.getItem('token'); // Include token if required for authentication
  const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`, // Optional: If your API requires authentication
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to delete package: ${errorMessage}`);
  }
};
