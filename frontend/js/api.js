const API_BASE = "http://localhost:5000/api"; // change if hosted

// ===== AUTH =====
async function registerUser(userData) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}

async function loginUser(credentials) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

// ===== DONATIONS =====
async function createDonation(token, donationData) {
  const res = await fetch(`${API_BASE}/donations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(donationData),
  });
  return res.json();
}

async function getDonations(token) {
  const res = await fetch(`${API_BASE}/donations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

async function acceptDonation(token, donationId) {
  const res = await fetch(`${API_BASE}/donations/${donationId}/accept`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

async function completeDonation(token, donationId) {
  const res = await fetch(`${API_BASE}/donations/${donationId}/complete`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// ===== NGOs =====
async function registerNGO(ngoData) {
  const res = await fetch(`${API_BASE}/ngos/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ngoData),
  });
  return res.json();
}

async function getAllNGOs() {
  const res = await fetch(`${API_BASE}/ngos`);
  return res.json();
}

async function verifyNGO(token, ngoId) {
  const res = await fetch(`${API_BASE}/ngos/${ngoId}/verify`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// ===== ADMIN =====
async function getAdminDashboard(token) {
  const res = await fetch(`${API_BASE}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

async function getAllUsers(token) {
  const res = await fetch(`${API_BASE}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

async function deleteUser(token, userId) {
  const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
