$(document).ready(function () {
    $('#loginbut').on('click', function (e) {
        e.preventDefault();
        var data = $("#username").val();
        var data1 = $("#password1").val();
            $.ajax({
                url: '/login',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ Username: data, Password: data1 }),
                success: function (response) {
                    if (response==="up") {
                        $('#un').html("Username cannot be blank");
                        $('#pass').html("Password cannot be blank");
                    }
                    else if (response==="u") {
                        $('#un').html("");
                        $('#un').html("Username cannot be blank");
                    }
                    else if (response==="p") {
                        $('#un').html("");
                        $('#pass').html("Password cannot be blank");
                    }
                    else if(response==="invalid"){
                        $('#un').html("");
                        $('#pass').html("Password is not correct");
                    }
                    else if(response==="upinvalid"){
                        $('#un').html("Username is invalid");
                        $('#pass').html("Password is invalid");
                    }
                    else if(response==="uinvalid"){
                        $('#un').html("Username is invalid");
                        $('#pass').html("");
                    }
                    else if(response==='pinvalid'){
                        $('#un').html("");
                        $('#pass').html("Password is invalid");
                    }
                    else if(response==="not found"){
                        $('#un').html("");
                        $('#pass').html("This account does not exist");
                    }
                    else{
                        $('#un').html("");
                        $('#pass').html("");
                        $("body").html(response);
                    }

                },
                error: function (err) {

                }
            });
        
    })
})