document.addEventListener("DOMContentLoaded", () => {
const form = document.querySelector("form");


    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Stop page from reloading

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:5000/signin/google", {

                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert("Sign-in successful!");
                window.location.href = "dashboard.html";
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Error signing in. Please try again.");
        }
    });

    // Google Sign-In
    window.onSignIn = (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        // Send the token to your server
        fetch("http://localhost:5000/signin/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_token })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Sign-in successful!");
                window.location.href = "dashboard.html";
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            alert("Error signing in with Google. Please try again.");
        });
    };
});
