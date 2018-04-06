var getLocation = function(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
     } else { 
        $("#notelocation").val("Geolocation is not supported by this browser.");
     }
}
var showPosition = function(position) {
      var latitude    = position.coords.latitude;       // set latitude variable
      var longitude   = position.coords.longitude;      // set longitude variable
            
      var mapcanvas   = document.createElement('div');    // create div to hold map
      mapcanvas.id = 'map';                   // give this div an id of 'map'
      mapcanvas.style.height = '300px';             // set map height
      mapcanvas.style.width = '100%';               // set map width
            
      document.querySelector('#map-container').appendChild(mapcanvas);  // place new div within the 'map-container' div
            
      var coords = new google.maps.LatLng(latitude,longitude);  // set lat/long object for new map
        
      var options = {                       // set options for map
         zoom: 15,
         center: coords,
         mapTypeControl: false,
         navigationControlOptions: {
         style: google.maps.NavigationControlStyle.SMALL
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP
      };
            
      var map = new google.maps.Map(document.getElementById("map"), options); // create new map using settings above

      var marker = new google.maps.Marker({           // place a marker at our lat/long
          position: coords,
          map:    map
      });
            
      var response = 'Latitude: ' + latitude + ' / Longitude: ' + longitude;  // build string containing lat/long
      console.log("LOCATION :: "+response);
      $("#notelocation").val(response);                     // write string to input field
}

$(document).ready(function() 
{
  console.log("entered user.js");

 $('.tap-target').tapTarget('open');

 $("#addnote-btn").on("click", function(event) {
      event.preventDefault();
      var currentuser = sessionStorage.getItem('email');
   
      console.log("image file path :: "+currentuser);

      // Wont submit the post if we are missing a body or a title
      var header = $("#notesheader").val().trim();
      var content = $("#notescontent").val().trim();
      var notedate = moment($("#notedate").val().trim()).format('MM/DD/YYYY');
      var location = { type: 'Point', coordinates: [39.807222,-76.984722]};
      var filepath = $("#input-file-now-custom-2");

      var newnote = {
       
        n_header: header,
        n_notedate: notedate,
        n_content: content,
        n_location: location,
        filepath: filepath,
        email: currentuser
      };
      console.log(newnote);
      // send an AJAX POST-request with jQuery
      $.post("/api/notes/new", newnote, function() {
      window.location.href = "/notes";
    });

      // empty each input box by replacing the value with an empty string
      $("#notesheader").val("");
      $("#notescontent").val("");
      $("#notedate").val("");  
    
   });

    $("#login-btn").on("click", function(event) {
      event.preventDefault();

      // Wont submit the post if we are missing a body or a title
      var email = $("#email").val();
      var password = $("#password").val().trim();
      var queryUrl;

      if (!email || !password) {
        return;
      }
      else
      {
         queryUrl = "/api/login/"+email+"/"+password;
      }
     // send an AJAX POST-request with jQuery
      $.get(queryUrl, function(result) {
        console.log("RESUTSSSSSS :: "+result);
        if(result){
          window.location.href = "/task";
        }

     });

      // empty each input box by replacing the value with an empty string
      $("#email").val("");
      $("#password").val("");  
    
   });
});