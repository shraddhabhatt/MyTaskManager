$(document).ready(function() {
  console.log("entered user.js");

  $("#register-btn").on("click", function(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    var username = $("#r_username").val().trim();
    var email = $("#r_email").val();
    var password = $("#r_password").val().trim();
    var phonenumber = $("#r_phonenumber").val().trim();

    if (!email || !password || !phonenumber) {
      return;
    }

    var newUser = {
      // name from name input
      username: username,
      // role from role input
      email: email,
      // age from age input
      password: password,

      phonenumber: phonenumber
    };
    console.log(newUser);
    // send an AJAX POST-request with jQuery
    $.post("/api/register", newUser, function(result) {
      console.log("RESULT :: " + result.id);
      window.location.href = "/login";
    });

    // empty each input box by replacing the value with an empty string
    $("#r_username").val("");
    $("#r_email").val("");
    $("#r_password").val("");
    $("#r_phonenumber").val("");

  });

  $("#login-btn").on("click", function(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    var email = $("#email").val();
    var password = $("#password").val().trim();
    var queryUrl;
    sessionStorage.setItem("email", email);

    if (!email || !password) {
      return;
    } else {
      queryUrl = "/api/login/" + email + "/" + password;
    }
    // send an AJAX POST-request with jQuery
    $.get(queryUrl, function(result) {
      console.log("RESUTSSSSSS :: " + result.email);
      if (result) {
        console.log("RESULT :: " + result.id);
        window.location.href = "/task";
      }

    });

    // empty each input box by replacing the value with an empty string
    $("#email").val("");
    $("#password").val("");

  });
});
