const backendURL = "https://attendance-backend-production-da89.up.railway.app/login";

async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please enter both username and password");
    return;
  }

  try {
    const response = await fetch(backendURL, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
  
    const data = await response.json(); // Parse the response body
    console.log("Response from server:", data);
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${data.message}`);
    }
  
    if (data.status === "success") {
      // Store the token in localStorage
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      window.location.href = "attendance.html"; // Redirect to attendance page
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    alert("Error: Could not log in!");
  }
}