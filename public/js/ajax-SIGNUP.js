$(document).ready(function () {
    $('#sub').on('click', function (e) {
        e.preventDefault();
        var data = $("#uname").val();
        var data1 = $("#femail").val();
        var data2 = $("#number").val();
        var data3 = $("#password").val();
        var data4 = $("#password-confirmation").val();
        var data5 = $("#type").val();
        $.ajax({
            url: '/signup',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ Username: data, Email: data1, Number: data2, Password: data3, PasswordConf: data4, Type: data5 }),
            success: function (response) {
                if (response.indexOf('html') == -1) {
                    response.forEach(alert => {
                        if (alert.msg.indexOf('Username') > -1) {
                            $("#unam").html(alert.msg);
                            $("#result").html("");
                            console.log("hi")
                        }
                        else if(alert.msg.indexOf('Email') > -1){
                            $("#em").html(alert.msg);
                        }
                        else if(alert.msg.indexOf('Phone') > -1){
                            $("#nu").html(alert.msg);
                        }
                        else if(alert.msg.indexOf('confirmation') > -1 || alert.msg.indexOf('match') > -1){
                            $("#pc").html(alert.msg);
                        }
                        else if(alert.msg.indexOf('Password') > -1){
                            $("#pa").html(alert.msg);
                        }
                    });
                }
                else{
                    location.reload();
                }
                

            },
            error: function (err) {

            }
        });

    })
})