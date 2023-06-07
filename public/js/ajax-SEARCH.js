$(document).ready(function () {
    $("#searchbar").on('keyup', function (e) {
        e.preventDefault();
        var data = $('#searchbar').val();
        $.ajax({
            url: '/searchHandler',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ Name: data }),
            success: function (response) {
                console.log(response.length);
                var html = '';
                let length = response.length;
                if (length > 10) {
                    length = 10;
                }
                else if (response == "") {
                    $("#searchResults").html("");
                    return;
                }

                for (let index = 0; index < parseInt(length); index++) {
                    const item = response[index];
                    if (item.RoomTypes) {
                        html += (`<a id='searchItem' href='/hotels/${item.Name}'>${item.Name}<span id='s'> hotel</span></a>`);
                    }
                    if (item.Advantage) {
                        html += (`<a id='searchItem' href='/activities/${item.Name}'>${item.Header}<span id='s'> activity</span></a>`);
                    }

                }

                $("#searchResults").html(html);

            },
            error: function (err) {

            }
        });
    });
});
