

var form = document.getElementById("form");
form.addEventListener('submit', (e) => {
    var error = false;
    var name = document.getElementById('ActName');
    var header = document.getElementById('ActHeader');
    var type = document.getElementById('ActType');
    var imgs = document.getElementById('imgs');
    var adv = document.getElementById('adv');
    var brief = document.getElementById('Actbrief');
    var details = document.getElementById('Actdetails');
    var plan = document.getElementById('ActPlan');
    var cancel = document.getElementById('ActCancel');
    var duration = document.getElementById('ActTime');
    var pickup = document.getElementById('ActPickup');
    var max = document.getElementById('ActPart');
    var start = document.getElementById('starttime');
    var end = document.getElementById('endtime');
    var price = document.getElementById('price');
    var availdates = document.getElementById('ActDates');

    if (name.value === "") {
        document.getElementById('error-name').innerHTML = "You must enter city's name";
        error = true;
    }

    if (header.value === "") {
        document.getElementById('error-header').innerHTML = "You must enter activity's name";
        error = true;
    }

    if (type.value === "") {
        document.getElementById('error-type').innerHTML = "You must enter activity's type";
        error = true;
    }

    if (imgs.value === "") {
        document.getElementById('error-imgs').innerHTML = "You must upload 3 images";
        error = true;
    }
 
    if (adv.value === "") {
        document.getElementById('error-adv').innerHTML = "You must enter activity's advantage";
        error = true;
    }

    if (brief.value === "") {
        document.getElementById('error-brief').innerHTML = "You must enter activity's brief description";
        error = true;
    }

    if (details.value === "") {
        document.getElementById('error-details').innerHTML = "You must enter activity's detailed description";
        error = true;
    }

    if (plan.value === "") {
        document.getElementById('error-plan').innerHTML = "You must enter activity's plan";
        error = true;
    }

    if (cancel.value === "") {
        document.getElementById('error-cancel').innerHTML = "You must enter activity's cancellation details";
        error = true;
    }

    if (duration.value === "") {
        document.getElementById('error-duration').innerHTML = "You must enter activity's duration details";
        error = true;
    }

    if (pickup.value === "") {
        document.getElementById('error-pickup').innerHTML = "You must enter activity's pickup details";
        error = true;
    }

    if (max.value === "") {
        document.getElementById('error-max').innerHTML = "You must enter activity's max number of participants";
        error = true;
    }

    if (start.value === "") {
        document.getElementById('error-start').innerHTML = "You must enter activity's start time";
        error = true;
    }

    if (end.value === "") {
        document.getElementById('error-end').innerHTML = "You must enter activity's end time";
        error = true;
    }

    if (price.value === "") {
        document.getElementById('error-price').innerHTML = "You must enter activity's price";
        error = true;
    }

    if (availdates.value === "") {
        document.getElementById('error-dates').innerHTML = "You must enter activity's dates";
        error = true;
    }

    if (error == true) {
        e.preventDefault();
    }
    else {
        document.getElementById('error-name').innerHTML = "";
        document.getElementById('error-header').innerHTML = "";
        document.getElementById('error-type').innerHTML = "";
        document.getElementById('error-imgs').innerHTML = "";
        document.getElementById('error-adv').innerHTML = "";
        document.getElementById('error-brief').innerHTML = "";
        document.getElementById('error-details').innerHTML = "";
        document.getElementById('error-plan').innerHTML = "";
        document.getElementById('error-cancel').innerHTML = "";
        document.getElementById('error-duration').innerHTML = "";
        document.getElementById('error-pickup').innerHTML = "";
        document.getElementById('error-max').innerHTML = "";
        document.getElementById('error-start').innerHTML = "";
        document.getElementById('error-end').innerHTML = "";
        document.getElementById('error-price').innerHTML = "";
        document.getElementById('error-dates').innerHTML = "";
    }






})
