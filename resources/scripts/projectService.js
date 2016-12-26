$('#create-project-btn').click(function() {
    var createProjectForm = $("#create-project-form");
    // createProjectForm.on('submit', function(event) {
    //     event.preventDefault();
    // }); 
    createProjectForm.submit();
});
