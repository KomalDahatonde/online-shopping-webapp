document.addEventListener("DOMContentLoaded", function() {
    // Get the login button
    var loginBtn = document.querySelector('.login-btn');
  
    // Get the login container
    var loginContainer = document.querySelector('.login-container');
  
    // Get the close button
    var closeBtn = document.querySelector('.close');
  
    // When the user clicks on the login button, display the login popup
    loginBtn.addEventListener('click', function() {
      loginContainer.style.display = 'flex';
    });
  
    // When the user clicks on the close button or outside of the login popup, hide it
    window.addEventListener('click', function(event) {
      if (event.target == loginContainer || event.target == closeBtn) {
        loginContainer.style.display = 'none';
      }
    });
  });
  