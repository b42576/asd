// Kevin Fry
// ASD 1312
// Main Javascript File

/*
$(document).on("pageinit", function () {
    var storelist = Array("Select Store", "Acme", "ShopRite", "SuperFresh", "Giant", "Weis", "PathMark", "Target", "WalMart");
    var locatebylist = Array("Select Locate By Type", "Department", "Aisle", "Location");
    var departmentlist = Array("Select Department==", "Grocery", "Health &amp; Beauty", "General Merchandice", "Dairy", "Produce", "Meat", "Hot/Prepared Foods", "Deli", "Bakery");
    var aislelist = Array("Select Aisle==", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30");
    var locationlist = Array("Select Location==", "Front", "Back", "Front End", "Entrance", "Left", "Right", "Front Right", "Front Left", "Back Right", "Back Left");

    function makeList(formid, listarray) {
        var selectItem = $(formid);
        for (var i = 0, j = listarray.length; i < j; i++) {
            var makeOption = document.createElement('option');
            var optionText = listarray[i];
            makeOption.setAttribute("value", optionText);
            makeOption.innerHTML = optionText;
            selectItem.appendChild(makeOption);
        }
    }

    function locationchange() {
        var LocateByChange = document.getElementById('locateby');
        var LocateByChangeValue = LocateByChange.value;
        var locatebyareaSelect = document.getElementById('locatebyarea');
        locatebyareaSelect.innerHTML = '';
        console.log(LocateByChangeValue);

        switch (LocateByChangeValue) {
            case "Department":
                makeList('locatebyarea', departmentlist);
                break;
            case "Aisle":
                makeList('locatebyarea', aislelist);
                break;
            case "Location":
                makeList('locatebyarea', locationlist);
                break;
            default: return false;
        }

    }

    makeList('store', storelist);
    makeList('locateby', locatebylist);
    //makeList('department', departmentlist);
    //makeList('aisle', aislelist);
    //makeList('location', locationlist);

    var LocateByC = document.getElementById('locateby');
    //var LocateByChange = document.getElementById('locateby').selectedIndex;
    //var LocateByChangeValue = document.getElementsByTagName('option')[LocateByChange].value;
    //console.log('in main function ' + LocateByChangeValue);
    LocateByC.addEventListener("click", locationchange);
});
*/

$(document).on("pageinit", function () {
    // populate form fields
    var storelist = Array("[geolocate]", "Acme", "ShopRite", "SuperFresh", "Giant", "Weis", "PathMark", "Target", "WalMart");
    var locatebylist = Array("Select Locate By Type", "Department", "Aisle", "Location");
    var departmentlist = Array("Grocery", "Health &amp; Beauty", "General Merchandice", "Dairy", "Produce", "Meat", "Hot/Prepared Foods", "Deli", "Bakery", "Customer Service");
    var aislelist = Array("n/a", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30");
    var locationlist = Array("Middle", "Front", "Back", "Front", "Entrance", "Left", "Right", "Front Right", "Front Left", "Back Right", "Back Left", "A", "B");

    // stores
    for (var i = 0, j = storelist.length; i < j; i++) {
        $('<option value="' + storelist[i] + '">' + storelist[i] + '</option>').appendTo('#store');
    };
    // locate by options
    for (var i = 0, j = departmentlist.length; i < j; i++) {
        $('<option value="' + departmentlist[i] + '">' + departmentlist[i] + '</option>').appendTo('#department');
    };
    // locate by aislelist
    for (var i = 0, j = aislelist.length; i < j; i++) {
        $('<option value="' + aislelist[i] + '">' + aislelist[i] + '</option>').appendTo('#aisle');
    };
    // locate by aislelist
    for (var i = 0, j = locationlist.length; i < j; i++) {
        $('<option value="' + locationlist[i] + '">' + locationlist[i] + '</option>').appendTo('#location');
    };
    // display items in localstorage first
    var getData = function () {
        for (var i = 0; i < localStorage.length; i++) {
            var displayItem = '';
            displayItem += '<li id="' + localStorage.key(i) + '"><ul>';
            var objProduct = JSON.parse(localStorage.getItem(localStorage.key(i)));
            displayItem += '    <li>Product / Category: ' + objProduct.prodcat + '</li>';
            displayItem += '    <li>Store: ' + objProduct.store + '</li>';
            displayItem += '    <li>Department: ' + objProduct.department + '</li>';
            displayItem += '    <li>Aisle: ' + objProduct.aisle + '</li>';
            displayItem += '    <li>Location: ' + objProduct.location + '</li>';
            displayItem += '    <li><button class="edit" data-key="' + betterkey + '">Edit</button></li>';
            displayItem += '</ul></li>';
            $('#display ul').append(displayItem);
        }

    };
    //getData();
    $('#submit').on('click', function (event) {
        var key = new Date().getTime();
        var betterkey = 'productLocator' + key;
        var objProduct = {};
        objProduct.prodcat = $('#prodcat').val();
        objProduct.store = $('#store').val();
        objProduct.department = $('#department').val();
        objProduct.aisle = $('#aisle').val();
        objProduct.location = $('#location').val();
        //console.log(objProduct);
        var encodedJSON = JSON.stringify(objProduct);
        console.log(encodedJSON);
        localStorage.setItem(betterkey, encodedJSON);
        //$("#display ul").append('<li>' + encodedJSON + '</li');
        var displayItem = '';
        displayItem += '<li id="' + betterkey + '"><ul>';
        displayItem += '    <li>Product / Category: ' + objProduct.prodcat + '</li>';
        displayItem += '    <li>Store: ' + objProduct.store + '</li>';
        displayItem += '    <li>Department: ' + objProduct.department + '</li>';
        displayItem += '    <li>Aisle: ' + objProduct.aisle + '</li>';
        displayItem += '    <li>Location: ' + objProduct.location + '</li>';
        displayItem += '    <li><button class="edit" data-key="' + betterkey + '">Edit</button></li>';
        displayItem += '</ul></li>';
        $('#display ul').append(displayItem);
        event.preventDefault();
    });
});

