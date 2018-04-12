var currentuser = sessionStorage.getItem('email');
console.log("CURRENT USER :: "+currentuser);
   var updating = false;
   var noteid;

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
            
      showMap(latitude,longitude);
}
var showMap = function(latitude,longitude){

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
            
      var response = latitude + ',' + longitude;  // build string containing lat/long
      $("#notelocation").val(response);                     // write string to input field
}
var viewData = function (){
        
        $('#noteInput').empty();
        console.log("function called !! ");
        $.get("/api/notes", function(data){
            console.log(data);

            var table = $('#noteInput')
            
            data.forEach(function(chartInput){
              console.log(chartInput);
              var row = $('<tr>')
              var cell1 = $('<td>').text(chartInput.n_header);
              var cell2 = $('<td>').text(chartInput.n_content);
              var cell3 = $('<td>').text(chartInput.n_notedate);
              var cell4 = $('<a onClick="getNoteData(\'' + chartInput.n_header + '\',\'' + chartInput.UserId + '\')" class="btn-floating btn-small waves-effect waves-light cyan"><i class="material-icons">edit</i></a>');
              row.append(cell1);
              row.append(cell2);
              row.append(cell3);
              row.append(cell4);
              table.append(row);
            });
       
      });
}
$(window).on('load',function() {
    viewData();
});

var getNoteData = function(header,userid){

    var queryURL = "api/notes/"+header+"/"+userid;
    $.get(queryURL, function(data){
          
    var notedate = moment(data.n_notedate).format('MM/DD/YYYY');
    
    noteid = data.id;
    $("#notesheader").val(data.n_header);
    $("#notedate").val(notedate);
    $("#notelocation").val(data.n_location);
    $("#notescontent").val(data.n_content);

    var location = data.n_location;
    var latitude;      // set latitude variable
    var longitude;      // set longitude variable
         
    if(location != null){
        var coordinates = location.split(',');
        latitude = coordinates[0];
        longitude = coordinates[1];
        showMap(latitude,longitude);
    }

    var filename = data.n_image;

    /*if(filename != null){
        var imgpath = "../assets/uploaded_images/"+filename;
        $('#showimage').attr("src",imgpath);
        console.log("Image PAth ::"+imgpath);
    }*/
    Materialize.updateTextFields();
    updating = true;
  });
}

$("#addnote-btn").on("click", function(event) {
      event.preventDefault();
           
      // Wont submit the post if we are missing a body or a title
      var header = $("#notesheader").val().trim();
      var content = $("#notescontent").val().trim();
      var notedate = moment($("#notedate").val().trim()).format('MM/DD/YYYY');
      var location = $("#notelocation").val();
      var filepath = $("#filename").val().trim();
      var filename;

      if(filepath != null){
        var fields = filepath.split('\\');
        filename = fields[fields.length-1];
      }
      var newNote = {
        n_header: header,
        n_notedate: notedate,
        n_content: content,
        n_location: location,
        n_image: filename,
        email: currentuser
      };
      console.log(newNote);
      $('#imgpreview').attr("src","../public/assets/uploaded_images/"+filename);

      if(updating) {
        newNote.id = noteid;
        updateNote(newNote);
      }
      else {
        submitNote(newNote);
      }
          
 });

function submitNote(newNote){
      // send an AJAX POST-request with jQuery
      $.post("/api/notes/new", newNote, function(response) {
        console.log("response :: "+response);
        viewData();
        // window.location.href = "/notes";
    }); 
}

// Update Notes
function updateNote(newNote) {
    $.ajax({
          method: "PUT",
          url: "/api/notes/edit",
          data: newNote
    }).then(function() {
        viewData();
        clearView();
    });
}

// empty each input box by replacing the value with an empty string
function clearView(){
   
    $("#notesheader").val("");
    $("#notescontent").val("");
    $("#notedate").val(""); 
    $("#notelocation").val("");
    $("#filename").val("");
}