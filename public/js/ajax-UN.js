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
                $("#usererror").html("");
                $("#unam").html("");

                if (response == 'taken' || response=='invalid' || response=='too short') {
                    $('#result').css("color", "red");
                    $("#usererror").html("");
                    $("#unam").html("");
                }
                else if(response=='available'){
                    $('#result').css("color", "green");
                    $("#usererror").html("");
                    $("#unam").html("");
                }
                else{
                    $("#result").html("");
                }
            },
            error:function(err){

            }
        });
    });
});