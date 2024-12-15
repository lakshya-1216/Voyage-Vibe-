document.getElementById("signupBtn").addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validate fields
    if (!username || !email || !password || !confirmPassword) {
        alert("All fields are required!");
        return;
    }

    // Check password match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    // Send the data to the backend
    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the backend
        if (data.status === "success") {
            alert("Signup successful!");
            window.location.href = "../login.html";  // Redirect to login page
        } else {
            alert(data.message);  // Show error message from backend
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    });
});
