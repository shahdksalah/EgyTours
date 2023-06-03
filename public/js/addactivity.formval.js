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
        document.getElementById('error-header').innerHTML = "You must upload 3 images";
        error = true;
    }




})