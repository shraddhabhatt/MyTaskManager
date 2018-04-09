   var currentuser = sessionStorage.getItem('email');
   console.log("CURRENT USER :: "+currentuser);
   var updating = false;
   var taskid;

  var getTaskData = function (taskname, userid){
      
      var queryURL = "api/task/"+taskname+"/"+userid;
      $.get(queryURL, function(data){
          
          var c_taskdate = moment(data.task_date).format('MM/DD/YYYY');
          var c_tasktime = moment(data.task_date).format('HH:mm');

          taskid = data.id;
          $("#taskname").val(data.task_text);
          $("#taskdate").val(c_taskdate);
          $("#tasktime").val(c_tasktime);
          $("#messagebox").val(data.task_message);
          data.isdone ? $("#checkboxisdone").prop('checked', true) : $("#checkboxisdone").prop('checked', false);
          Materialize.updateTextFields();
      
          updating = true;
       });
    }

  var viewData = function (){

        $('#tableData').empty();
        $.get("/api/posts", function(data){
         console.log(data);

         var table = $('#tableData')
                  
         data.forEach(function(chartInput){
         console.log("Data :: "+chartInput.UserId+" :: "+chartInput.task_text);
                    var ismanual = "manual";
                    var currenttask = chartInput.id;
                    if(chartInput.use_ai)
                       ismanual = "chat"
                    var row = $('<tr>')
                    var cell1 = $('<td>').text(chartInput.task_text);
                    var cell2 = $('<td>').text(chartInput.task_date);
                    var cell3 = $('<td>').text(ismanual);
                    var cell4 = $('<a onClick="getTaskData(\'' + chartInput.task_text + '\',\'' + chartInput.UserId + '\')" class="btn-floating btn-small waves-effect waves-light cyan"><i class="material-icons">edit</i></a>');
                    var cell5 = $('<a id=\'' + chartInput.id + '\' data-id=\'' + chartInput.task_text + '\' data-toggle="modal" data-target="confirmdialog" class="btn-floating btn-small waves-effect waves-light modal-trigger red"><i class="material-icons">clear</i></a>');
                
                    row.append(cell1);
                    row.append(cell2);
                    row.append(cell3);
                    row.append(cell4);
                    row.append(cell5);
                    table.append(row);
            });
      });
  }

 $("#addtask-btn").on("click", function(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body or a title
      var taskname = $("#taskname").val().trim();
      var taskdate = moment($("#taskdate").val().trim()).format('MM/DD/YYYY');
      var tasktime = $("#tasktime").val().trim();
      var taskmessage = $("#messagebox").val();
      var iscompleted = $("#checkboxisdone").is(':checked')
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
            isdone: iscompleted,
            email: currentuser
        };
        console.log(newTask);
        // send an AJAX POST-request with jQuery
        if (updating) {
            newTask.id = taskid;
            updateTask(newTask);
          }
          else {
            submitTask(newTask);
          }
    });
    
    $("#okBtn").on("click", function(event){
       var taskid = $("#hiddentaskid").val();
        console.log("TASK ID for Deletion : "+taskid);
        deleteTask(taskid);
    });
    
    function submitTask(newTask){
      $.post("/api/task/new", newTask, function(response) {
            
            viewData();
            clearview();
      
        });
    }

    function updateTask(newTask) {
        $.ajax({
          method: "PUT",
          url: "/api/task/edit",
          data: newTask
        }).then(function() {
            viewData();
            clearview();
        });
    }

      // This function does an API call to delete posts
      function deleteTask(id) {
        $.ajax({
          method: "DELETE",
          url: "/api/task/"+id
        })
          .then(function() {
            viewData();
          });
      }

    function clearview(){
            $("#taskname").val("");
            $("#taskdate").val("");
            $("#tasktime").val("");  
            $("#messagebox").val(""); 
    }
    
    function showModal(but, modal){  
            $('#' + modal).openModal(); 
            $('#' + modal + '_YesBtn').click(function(){ $('#' + modal).closeModal(); 
            document.location = but.href; 
      }); 
    }

    $(window).on('load',function() {
        viewData();
    });
  