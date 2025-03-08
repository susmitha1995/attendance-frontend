const backendURL = "http://localhost:3000/mark-attendance";

async function markAttendance() {
  const name = document.getElementById("doctorName").value.trim();
  if (!name) {
    alert("Please enter your name");
    return;
  }

  try {
    const response = await fetch(backendURL, {
      method: "POST",
      body: JSON.stringify({ name: name }),
      headers: { "Content-Type": "application/json" },
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