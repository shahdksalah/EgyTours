$(document).ready(function () {
    $('#subBtn').on('click', function (e) {
        e.preventDefault();
        var data = $("#cardname").val();
        var data1 = $("#cardnum").val();
        var data2 = $("#cvv").val();
        var data3 = $("#expm").val();
        var data4 = $("#expy").val();

        $.ajax({
            url: '/paymentForm/payment',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ Name: data, Num: data1, CVV: data2, ExpM: data3, ExpY: data4 }),
            success: function (response) {
                console.log("IN AJAX");
                console.log(response);
                // if (response.length>1) {
                //     response.forEach(alert => {
                //         console.log(alert.msg);
                //         if (alert.msg.indexOf('name') > -1) {
                //             $("#nameerr").html(alert.msg);
                //         }
                //         else if (alert.msg.indexOf('number') > -1) {
                //             $("#numerr").html(alert.msg);
                //         }
                //         else if (alert.msg.indexOf('CVV') > -1) {
                //             $("#cvverr").html(alert.msg);
                //         }
                //         else if (alert.msg.indexOf('Month') > -1 || alert.msg.indexOf('match') > -1) {
                //             $("#merr").html(alert.msg);
                //         }
                //         else if (alert.msg.indexOf('Year') > -1) {
                //             $("#yerr").html(alert.msg);
                //         }
                //     });
                // }
                // else{
                    
                // }
                
                $("#body").html(response);


            },
            error: function (err) {
                console.log("agax: " + err);
            }
        });

    })
})