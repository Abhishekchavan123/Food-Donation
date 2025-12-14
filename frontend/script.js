async function sendMail(){
    // Get user email from localStorage if available (used as fallback)
    let userEmail = '';
    try {
        const userData = localStorage.getItem('de_authUser');
        if (userData) {
            const user = JSON.parse(userData);
            userEmail = user.email || '';
        }
    } catch(e) {
        console.warn('Could not get user email from localStorage');
    }
    
    const baseEmailData = {
       from_name: document.getElementById("donorName").value,
       from_email: userEmail || "no-email@donation.com", // Use user email or placeholder
       from_phone: document.getElementById("phone").value,
       food_type: document.getElementById("foodType").value,
       quantity: document.getElementById("quantity").value,
       expiry_date: document.getElementById("expiry").value,
       description: document.getElementById("description").value,
       from_address: document.getElementById("address").value,
       from_pickup_time: document.getElementById("pickupTime").value,
    };

    // Fetch all registered NGO emails
    let recipients = [];
    try {
        const res = await fetch('http://localhost:4000/api/ngos/register');
        const data = await res.json();
        recipients = (data?.ngos || [])
            .map(r => r.email)
            .filter(Boolean);
    } catch(fetchErr) {
        console.warn('Could not fetch NGO emails:', fetchErr);
    }

    // Always send at least to the current user/admin so no email is lost
    if (!recipients.length && userEmail) {
        recipients.push(userEmail);
    }

    if (!recipients.length) {
        throw new Error('No recipients found to notify');
    }

    // Send one email per recipient; EmailJS template must have a {{to_email}} variable
    const sendResults = await Promise.allSettled(
        recipients.map(toEmail => emailjs.send(
            "service_zqczqzn",
            "template_w8mdbuw",
            { ...baseEmailData, to_email: toEmail }
        ))
    );

    const successCount = sendResults.filter(r => r.status === 'fulfilled').length;
    if (!successCount) {
        const firstError = sendResults.find(r => r.status === 'rejected');
        const errMsg = firstError?.reason?.text || firstError?.reason?.message || 'Unknown error';
        throw new Error('Failed to send any email: ' + errMsg);
    }

    return { sent: successCount, total: recipients.length };
}
