$(document).ready(function() 
{
   console.log("entered user.js");
   var currentuser = sessionStorage.getItem('email');
   console.log("CURRENT USER :: "+currentuser);

  
 $("#addtask-btn").on("click", function(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body or a title
      var taskname = $("#taskname").val().trim();
      var taskdate = moment($("#taskdate").val().trim()).format('MM/DD/YYYY');
      var tasktime = $("#tasktime").val().trim();
      var taskmessage = $("#messagebox").val();
      var dateTime = moment(taskdate + ' ' + tasktime).format('MM/DD/YYYY HH:mm');
      console.log("##### DATES ::: "+dateTime+"  ::  "+tasktime);
      if (!taskname || !taskdate) {
        return;
      }

      var queryUrl = "/api/login/"+currentuser;
      
      var newTask = {
            task_text: taskname,
            task_date: dateTime,
            task_message: taskmessage,
            email: currentuser
        };
        console.log(newTask);
        // send an AJAX POST-request with jQuery
        $.post("/api/task/new", newTask, function() {
        
      //  window.location.href = "/task";
        });
      
      // empty each input box by replacing the value with an empty string
      $("#taskname").val("");
      $("#taskdate").val("");
      $("#tasktime").val("");  
      $("#taskmessage").val(""); 
    
   });

});