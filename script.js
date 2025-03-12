const backendURL = "http://localhost:3000/mark-attendance"; // Change to your deployed backend URL

async function markAttendance() {
  const name = document.getElementById("doctorName").value.trim();
  if (!name) {
    alert("Please enter your name");
    return;
  }

  // Retrieve token from localStorage
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Unauthorized! Please log in again.");
    return;
  }

  try {
    const response = await fetch(backendURL, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Send token in Authorization header
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response from server:", data);

    if (data.status === "success") {
      alert("Attendance Marked Successfully!");
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    alert("Error: Could not mark attendance!");
  }
}
