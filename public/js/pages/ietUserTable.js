define(['jquery', 'mylibs', 'sweetalert', 'clipboard'], function ($, mylibs, swal, Clipboard) {
    return {
        addEventHandlerPasswordField: function () {
            // Copy clipboard button
            var clipboard = new Clipboard('.copyPasswordButton', {
                text: function(trigger) {
                    return $(trigger).closest('tr').find('span.password').text();
                }
            });

            clipboard.on('success', function(e) {
                var $this = $(e.trigger);

                // Display tooltip and hide it after 1 second
                $this.tooltip('show', {
                    animation: true
                });
                setTimeout(function() {
                    $this.tooltip('hide', {
                        animation: true
                    });
                }, 1000);

                e.clearSelection();
            });

            clipboard.on('error', function(e) {
                var $this = $(e.trigger);
                $this.attr('title', 'Error!');

                // Display tooltip and hide it after 1 second
                $this.tooltip('show', {
                    animation: true
                });
                setTimeout(function() {
                    $this.tooltip('hide', {
                        animation: true
                    });
                }, 1000);

                $this.attr('title', 'Copied!');
            });

            // show/hide password
            $('.showPasswordCheckbox').once('change', function() {
                var $thisRow = $(this).closest('tr');
                $thisRow.find('span.passwordPlaceholder').toggle();
                $thisRow.find('span.password').toggle();
            });
        },
        enableFilterTablePlugin: function () {
            // Enable filter table plugin
            $('.searchabletable').filterTable({minRows: 0});
        },
        addEventHandlerDeleteUserRow: function () {
            $('.workspace').once('click', '.deleteuserrow', function () {
                var $this = $(this),
                    $thisRow = $this.closest('tr'),
                    url = require.toUrl('../ietusers');

                $this.button('loading');
                swal({
                        title: 'Are you sure?',
                        text: 'The user won\'t be deleted from the iet config file!',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#DD6B55',
                        confirmButtonText: 'Yes, delete it!',
                        closeOnConfirm: false
                    },
                    function (status) {
                        if (status === true) {
                            $.ajax({
                                url: url + '/delete_from_db',
                                beforeSend: mylibs.checkAjaxRunning(),
                                data: {
                                    "username": $thisRow.find('.username').text()
                                },
                                dataType: 'json',
                                type: 'post',
                                success: function (data) {
                                    if (data['code'] === 0) {
                                        swal.close();
                                        return mylibs.load_workspace(url);
                                    } else {
                                        swal({
                                            title: 'Error',
                                            type: 'error',
                                            text: data['message']
                                        }, function() {
                                            $this.button('reset');
                                        });
                                    }
                                },
                                error: function () {
                                    swal({
                                        title: 'Error',
                                        type: 'error',
                                        text: 'Something went wrong while submitting!'
                                    }, function() {
                                        $this.button('reset');
                                    });
                                }
                            });
                        } else {
                            $this.button('reset');
                        }
                    });
            });
        },
        addUserModal: function() {
            var $workspace = $('.workspace'),
                $addUserUsernameInput = $('#addUserUsernameInput'),
                $createUserModal = $('#createUserModal');

            $createUserModal.once('shown.bs.modal', function () {
                $addUserUsernameInput.focus();
            });

            // Add event handler for password generator
            $workspace.once('click', '#generatePasswordButton', function () {
                $('#addUserPasswordInput').val(mylibs.generatePassword());
            });

            // Add event handler for save button
            $workspace.once('click', '#savePasswordButton', function() {
                var $createUserModal = $('#createUserModal'),
                    $addUserUsernameInputParentDiv = $addUserUsernameInput.parent('div'),
                    usernameVal = $addUserUsernameInput.val(),
                    $addUserPasswordInput = $('#addUserPasswordInput'),
                    passwordVal = $addUserPasswordInput.val(),
                    $addUserPasswordInputParentDiv = $addUserPasswordInput.parent('div'),
                    url = require.toUrl('../ietusers'),
                    $showErrorInModal = $('#showErrorInModal'),
                    $button = $(this);

                // Validate input fields not empty
                if (usernameVal === '') {
                    $addUserUsernameInputParentDiv.addClass('has-error');
                } else {
                    $addUserUsernameInputParentDiv.removeClass('has-error').addClass('has-success');
                }
                if (passwordVal === '') {
                    $addUserPasswordInputParentDiv.addClass('has-error');
                } else {
                    $addUserPasswordInputParentDiv.removeClass('has-error').addClass('has-success');
                }

                // Only close modal on success
                if ($addUserPasswordInputParentDiv.hasClass('has-success') && $addUserUsernameInputParentDiv.hasClass('has-success')) {
                    $button.button('loading');
                    $.ajax({
                        url: url + '/add_to_db',
                        beforeSend: mylibs.checkAjaxRunning(),
                        data: {
                            "username": usernameVal,
                            "password": passwordVal
                        },
                        dataType: 'json',
                        type: 'post',
                        success: function (data) {
                            if (data['code'] === 0) {
                                setTimeout(function() {
                                    $createUserModal.modal('hide');

                                    // Remove success class, otherwise it is still displayed, if the user opens the modal again
                                    $addUserPasswordInputParentDiv.removeClass('has-error has-success');
                                    $addUserUsernameInputParentDiv.removeClass('has-error has-success');
                                    $addUserUsernameInput.val('');
                                    $addUserPasswordInput.val('');
                                    $showErrorInModal.html('');
                                }, 400);

                                $createUserModal.once('hidden.bs.modal', function() {
                                    return mylibs.load_workspace(url);
                                });
                            } else {
                                $addUserUsernameInputParentDiv.removeClass('has-success').addClass('has-error');
                                $addUserPasswordInputParentDiv.removeClass('has-success').addClass('has-error');
                                $showErrorInModal.html(data['message']);
                                $button.button('reset');
                            }
                        },
                        error: function () {
                            $showErrorInModal.html('Submit failed!');
                            $button.button('reset');
                        }
                    });
                }
            });

            // Remove errors if field is clicked
            $workspace.once('click', '#addUserPasswordInput, #addUserUsernameInput', function() {
                $(this).parent('div').removeClass('has-error')
            });
        }
    };
});