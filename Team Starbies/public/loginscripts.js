document.addEventListener("DOMContentLoaded", function () {
  const pwShowHide = document.querySelectorAll(".fa-eye-slash");

  pwShowHide.forEach((eyeSlash) => {
      eyeSlash.addEventListener("click", togglePasswordVisibility);
  });

  function togglePasswordVisibility(event) {
      let eyeIcon = event.target;
      let pwField = eyeIcon.previousElementSibling; // Get the password input field
      const isPassword = pwField.type === "password";

      // Toggle between password and text type
      pwField.type = isPassword ? "text" : "password";

      // Toggle the eye icon
      const eyeIconClass = isPassword ? "fa-eye" : "fa-eye-slash";
      eyeIcon.classList.toggle("fa-eye-slash");
      eyeIcon.classList.toggle("fa-eye");

      // Apply the .eye-icon class to the eye icon
      eyeIcon.classList.add("eye-icon");
  }

  function submitLoginForm(event) {
      event.preventDefault(); // Prevent the default form submission
      // Your login logic goes here

      // Redirect to the dashboard after successful login
      window.location.href = 'dashboard.html';
  }
});
