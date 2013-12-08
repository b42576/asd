// Kevin Fry
// ASD 1312
// Main Javascript File

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
        var displayItem = '';
        imax = localStorage.length;
        for (var i = 0; i < imax; i++) {
            var thiskey = localStorage.key(i);
            var thisitem = localStorage.getItem(thiskey);
            if (!(thiskey ^= "productLocator")) {
                displayItem += '<li id="' + localStorage.key(i) + '"><ul>';
                //console.log();
                //console.log(localStorage.getItem(i));
                var objProduct = JSON.parse(thisitem);
                displayItem += '    <li>Product / Category: ' + objProduct.prodcat + '</li>';
                displayItem += '    <li>Store: ' + objProduct.store + '</li>';
                displayItem += '    <li>Department: ' + objProduct.department + '</li>';
                displayItem += '    <li>Aisle: ' + objProduct.aisle + '</li>';
                displayItem += '    <li>Location: ' + objProduct.location + '</li>';
                displayItem += '    <li>';
                displayItem += '        <button class="edit" data-key="' + localStorage.key(i) + '">Edit</button>';
                displayItem += '        <button class="delete" data-key="' + localStorage.key(i) + '">Delete</button>';
                displayItem += '    </li>';
                displayItem += '</ul></li>';
            }

        }
        $('#display ul.display').append(displayItem);

        //return false;

    };
    //getData();
    //$('#getData').on('click', function (e) {
    //    e.preventDefault();
    //    
    //});

    getData();

    $('.edit').on('click', function () {
        //e.preventDefault();
        var thiskey = $(this).data('key');
        console.log(thiskey);
        var thisitem = localStorage.getItem(thiskey);
        console.log(thisitem);
        var objProduct = JSON.parse(thisitem);
        console.log(objProduct);
        var prodcat = objProduct.prodcat;
        $('#prodcat').val(prodcat);
        var store = objProduct.store;
        //console.log(store);
        for (var i = 0, j = storelist.length; i < j; i++) {

            if (storelist[i] == store) {
                $('<option value="' + storelist[i] + '" selected>' + storelist[i] + '</option>').appendTo('#store');
            } else {
                $('<option value="' + storelist[i] + '">' + storelist[i] + '</option>').appendTo('#store');
            }
        };
        $('#department').val(objProduct.department);
        $('#aisle').val(objProduct.aisle);
        $('#location').val(objProduct.location);
        $('#submit').html('Edit Item');
    });

    $('#submit').on('click', function (e) {
        e.preventDefault();
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
        $('#display ul.display').append(displayItem);

    });
});

