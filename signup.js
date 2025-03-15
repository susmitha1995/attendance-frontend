const backendURL = "https://attendance-backend-production-da89.up.railway.app/signup";

async function signup() {
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

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response from server:", data);

    if (data.status === "success") {
      alert("Signup successful! Please log in.");
      window.location.href = "login.html"; // Redirect to login page
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    alert("Error: Could not sign up!");
  }
}