$(document).ready(function() 
{

    $("#reg-form").on("submit", function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body or a title
      var username = $("#username").val().trim();
      var email = $("#email").val();
      var password = $("#password").val().trim();

      if (!email || !password) {
        return;
      }
      var newUser = {
        // name from name input
        username: username,
        // role from role input
        email: email,
        // age from age input
        password: password
      };
      console.log(newUser);
      // send an AJAX POST-request with jQuery
      $.post("/api/register", newUser, function() {
      window.location.href = "/login";
    });

      // empty each input box by replacing the value with an empty string
      $("#username").val("");
      $("#email").val("");
      $("#password").val("");  
    
   });
});
