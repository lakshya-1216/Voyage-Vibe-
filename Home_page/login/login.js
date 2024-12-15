// Login Button Functionality
document.getElementById("loginBtn").addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Please fill in both username and password.");
        return;
    }

    // Send the login credentials to the backend
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert(`Welcome back, ${username}!`);
            window.location.href = "../index.html";  // Redirect to home page
        } else {
            alert(data.message);  // Show the error message from the backend
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    });
});

// Signup Button Functionality
document.getElementById("signupBtn").addEventListener("click", function () {
    // Redirect to the Signup Page
    window.location.href = "../login/signup/signUp.html";
});
