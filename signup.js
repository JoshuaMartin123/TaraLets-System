document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const passwordError = document.getElementById("password-error");

    form.addEventListener("submit", (event) => {
        if (password.value !== confirmPassword.value) {
            passwordError.textContent = "Passwords do not match!";
            event.preventDefault(); // Stop form submission
        } else {
            passwordError.textContent = "";
            alert("Sign-up successful!");
        }
    });

    // Google Sign-In
    window.onSignIn = (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        // Send the token to your server
        fetch("http://localhost:5000/signup/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_token })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Sign-up successful!");
                window.location.href = "signin.html";
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            alert("Error signing up with Google. Please try again.");
        });
    };
});
