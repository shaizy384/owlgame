// customTracking.js

let sessionData = {};

// Check if the secret key is provided
if (!window.secretKey) {
  console.error('No secret key provided!');
  // You could also add a fallback secret key or stop the script from running
} else {
  sessionData.secret_key = window.secretKey; // Use the dynamic secret key
}

async function getUserLocation() {
  try {
    // First API call to get IP address from ipify
    const response = await fetch('https://api.ipify.org/?format=json');
    const data = await response.json();
    console.log("API response:", data.ip);

    if (response.ok) {
      const visitTime = new Date();
      const formattedVisitTime = visitTime.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      // Initialize session data with IP from ipify
      sessionData = {
        ...sessionData,
        ip_address: data.ip,
        user_agent: navigator.userAgent,
        page_url: window.location.href,
        domain_url: window.location.hostname,
        visit_time: formattedVisitTime,
        left_time: null, // Initially null
        session_id: generateSessionId(), // Unique session ID
      };

      console.log("Session data initialized:", sessionData);

      // Store session ID to sessionStorage to reuse on reloads
      sessionStorage.setItem('session_id', sessionData.session_id);

      // Send session data directly to your database API
      await sendSessionData('start');
    } else {
      console.error('Failed to fetch user location:', data.message);
    }
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
  }
}

function generateSessionId() {
  // Generate a simple unique session ID (You can replace this with a more robust approach if needed)
  return 'session-' + Math.random().toString(36).substr(2, 9);
}

async function sendSessionData(type) {
  try {
    const apiUrl = 'https://ewebsftp.com/GoogelAnalytics/Visitor/save_visitor_data';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData),
      keepalive: true,
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(`Session ${type} data successfully sent to the API:`, responseData);
      if (responseData?.data?.visit_time) {
        sessionData.visit_time = responseData?.data?.visit_time;
      }
    } else {
      console.error(`Failed to send session ${type} data:`, response.statusText);
    }
  } catch (error) {
    console.error(`Error sending session ${type} data:`, error);
  }
}

window.onload = function () {
  getUserLocation();

  // Capture session ID from sessionStorage if it exists
  const storedSessionId = sessionStorage.getItem('session_id');
  if (storedSessionId) {
    sessionData.session_id = storedSessionId;
  }
};

// Handle page unload or beforeunload events
window.addEventListener('beforeunload', async function (event) {
  // event.preventDefault();

  const sessionEndTime = new Date();
  const formattedLeftTime = sessionEndTime.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  // Update session data with left time
  sessionData.left_time = formattedLeftTime;

  // Send session data when the page is about to unload
  try {
    await sendSessionData('end');
  } catch (error) {
    console.error('Error sending session data on unload:', error);
  }

  // Default action for beforeunload
  // event.returnValue = '';
});

// To avoid sending redundant data, use sessionStorage to track if a session was already initiated
window.addEventListener('load', function () {
  const storedSessionId = sessionStorage.getItem('session_id');
  if (storedSessionId) {
    sessionData.session_id = storedSessionId;
  } else {
    sessionStorage.setItem('session_id', sessionData.session_id);
  }
});
