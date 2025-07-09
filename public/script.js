document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Login Successful!');
            // Redirect to a dashboard or home page
            window.location.href = '/about.html'; // Adjust this as needed
        } else {
            alert(result.message || 'Login Failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
});
