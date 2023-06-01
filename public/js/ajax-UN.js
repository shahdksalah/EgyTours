$(document).ready(function () {
    $("#uname").on('keyup', function (e) {
        e.preventDefault();
        var data = $('#uname').val();
        $.ajax({
            url: '/checkUN',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ Username: data }),
            success: function (response) {
                $('#result').html('Username is ' + response);

                if (response == 'taken') {
                    $('#result').css("color", "red");
                }
                else {
                    $('#result').css("color", "green");
                }
            },
            error:function(err){

            }
        });
    });
});