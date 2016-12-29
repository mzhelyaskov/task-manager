$(function () {
    var $pagination = $('#projects-pagination');
    var defaultOpts = {
        totalPages: 1,
        visiblePages: 1,
        initiateStartPageClick: true,
        onPageClick: function (event, page) {
            $.ajax({
                method: 'GET',
                data: {
                    query: '',
                    page : page
                },
                url: '/projects/projects-for-page',
                success: function (data) {
                    console.log(data);
                    console.log(data.totalPages);
                    console.log(Math.min(7, data.totalPages));
                    var currentPage = $pagination.twbsPagination('getCurrentPage');
                    $pagination.twbsPagination('destroy');
                    $pagination.twbsPagination($.extend({}, defaultOpts, {
                        initiateStartPageClick: false,
                        startPage: currentPage,
                        totalPages: data.totalPages,
                        visiblePages: Math.min(7, data.totalPages)
                    }));
                    $('#projects-container').html(data.projectsHtml);
                }
            });
        }
    };
    $pagination.twbsPagination(defaultOpts);

    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            return this.optional(element) || regexp.test(value);
        },
        "Should contains only uppercase character"
    );

    var projectFromValidationOptions = {
        submitHandler: submitHandler,
        rules: {
            name: {
                required: true
            },
            key: {
                required: true,
                minlength: 3,
                maxlength: 8,
                regex: /^[A-Z]+$/
            },
            typeId: {
                required: true
            },
            description: {
                required: true
            },
            lead: {
                required: true
            }
        }
    };

    $('#createProjectModal').on('show.bs.modal', function () {
        var modal = $(this);
        $.ajax({
            method: 'GET',
            url: "/projects/new-project-form"
        }).done(function(data) {
            modal.html(data);
            $('#create-project-btn').click(createProject);
            $('#project-key').keydown(upperCaseInputValue);
        });
    });

    function submitHandler(form) {
        $.ajax({
            type: "POST",
            url: '/projects',
            data: $(form).serialize(),
            success: function(formHtml) {
                if (formHtml) {
                    $('#createProjectModal').html(formHtml);
                    $('#create-project-btn').click(createProject);
                    $('#project-key').keydown(upperCaseInputValue);
                } else {
                    location.reload();
                }
            }
        });
    }

    function createProject() {
        var newProjectForm = $("#create-project-form");
        newProjectForm.validate(projectFromValidationOptions);
        newProjectForm.submit();
    }

    function upperCaseInputValue(event) {
        var char = String.fromCharCode(event.keyCode);
        if (/[A-Z]/.test(char) && !(event.shiftKey) && !(event.ctrlKey) && !(event.metaKey) && !(event.altKey)) {
            event.preventDefault();
            event.target.value = event.target.value + char.toUpperCase();
        }
    }
});