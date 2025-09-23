// Handle Donor Donation Form
document.addEventListener("DOMContentLoaded", () => {
  const donateForm = document.getElementById("donateForm");
  if (donateForm) {
    donateForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const donationData = {
        item: document.getElementById("item").value,
        quantity: document.getElementById("quantity").value,
        location: document.getElementById("location").value,
      };

      try {
        await createDonation(donationData); // from api.js
        alert("✅ Donation submitted successfully!");
        window.location.href = "/auth/ngo_dashboard.html"; 
      } catch (err) {
        alert("❌ Failed to submit donation");
      }
    });
  }

  // NGO Dashboard: Show Pending Donations
  const donationList = document.getElementById("donationList");
  if (donationList) {
    loadDonations();
  }

  async function loadDonations() {
    const donations = await getDonations(); // from api.js
    donationList.innerHTML = "";

    donations.forEach((don) => {
      if (don.status === "pending") {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${don.item}</td>
          <td>${don.quantity}</td>
          <td>${don.location}</td>
          <td>
            <button onclick="updateStatus('${don._id}', 'accepted')">Accept</button>
            <button onclick="updateStatus('${don._id}', 'rejected')">Reject</button>
          </td>
        `;
        donationList.appendChild(row);
      }
    });
  }

  // Update Status
  window.updateStatus = async (id, status) => {
    await updateDonationStatus(id, status); // from api.js
    loadDonations();
  };
});
