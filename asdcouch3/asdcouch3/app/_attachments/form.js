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
    var populateStores = function (selected) {
        //var $el = $el();
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
        $('#productLocatorID').attr('value',thiskey);
        var thisitem = localStorage.getItem(thiskey);
        console.log(thisitem);
        var objProduct = JSON.parse(thisitem);
        console.log(objProduct);
        var prodcat = objProduct.prodcat;
        $('#prodcat').val(prodcat);
        var store = objProduct.store;
        //console.log(store);
        //var storeOption = $('<option></option>').attr("value", "option value").text(store);
        //$("#store").append(storeOption);
        $('#store').val(objProduct.store).selectmenu("refresh", true);
        //$(document).ready(function () {
        //    $("option[value='" + objProduct.store + "'] #store").attr('selected', 'selected');
        //});
        $('#department').val(objProduct.department).selectmenu("refresh", true);
        $('#aisle').val(objProduct.aisle).selectmenu("refresh", true);
        $('#location').val(objProduct.location).selectmenu("refresh", true);
        //$('button #submit').val('Edit Item');
        $('#submit').attr("id", "postedit");
        $('#formtype').html('Editing Item');
		
        $('#postedit').on('click', function (e) {
            // our updated object
            var objProduct = {};
            objProduct.prodcat = $('#prodcat').val();
            objProduct.store = $('#store').val();
            objProduct.department = $('#department').val();
            objProduct.aisle = $('#aisle').val();
            objProduct.location = $('#location').val();
            var encodedJSON = JSON.stringify(objProduct);
            localStorage.setItem(thiskey, encodedJSON);
			console.log(thiskey);
            //window.location.reload();
            return false;
        });
		return false;
    });

    $('.delete').on('click', function () {
        //e.preventDefault();
        var thiskey = $(this).data('key');
        localStorage.removeItem(thiskey);
        window.location.reload();
        return false;
    });

    $('.exportToJSON').on('click', function () {
        var displayItem = '{ "productLocations":';
        imax = localStorage.length;
        for (var i = 0; i < imax; i++) {
            var thiskey = localStorage.key(i);
            var thisitem = localStorage.getItem(thiskey);
            if (!(thiskey ^= "productLocator")) {

                displayItem += '{ "key":"' + localStorage.key(i) + '",';
                //console.log();
                //console.log(localStorage.getItem(i));
                var objProduct = JSON.parse(thisitem);
                displayItem += '    "prodcat": "' + objProduct.prodcat + '",';
                displayItem += '    "store": "' + objProduct.store + '",';
                displayItem += '    "department": "' + objProduct.department + '",';
                displayItem += '    "aisle": "' + objProduct.aisle + '",';
                displayItem += '    "location": "' + objProduct.location + '"}';
            }
            if ((!(thiskey ^= "productLocator")) && (!(imax == i))) { displayItem += ','; }
        }
        // need to remove the last , from the set
        displayItem += ']}';
        $('#exporttext').html(displayItem);
    });

    $('#submit').on('click', function () {
        //e.preventDefault();
		var betterkey;
		if ($('#productLocatorID').val() != ''){
			betterkey = $(this).data('key');;
		} else {
			var key = new Date().getTime();
        	betterkey = 'productLocator' + key;
		}
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
        window.location.reload();
        return false;
    });
	
	// getStoresXML
    $('#getStoresXML').on('click', function () {
        console.log('trying to get stores');
        $('#store').empty();
		//refreshing added :)
		$('#store').append('<option>Loading from XML</option>').selectmenu("refresh", true);
		$.ajax({
			type: 'GET',
			url: 'stores.xml',
			dataType: "xml",
			success: function(whatsreturned, status, jqXHR){
				$('#store').empty();
				console.log(whatsreturned,status,jqXHR);
				$(whatsreturned).find('Store').each(function(){
					var thisstorename = $(this).find('title').text();
					console.log(thisstorename);
				});
			},
			error: function (jqX, stat, err) {
				$('#store').empty();
				//console.log('error');
				//console.log(stat);
				//console.log(err);
				var whatsreturned = jqX['responseText'];
				//var json = $.xml2json(whatsreturned);
				//console.log(json);
				$(whatsreturned).find('Store').each(function(){
					var storename = $(this).find('Storename').text();
					$('#store').append('<option value="'+storename+'">'+storename+'</option>');
				});
			}
		});
		return false;
    });<!--end getStoresXML-->
	
	// getStoresJSON
    $('#getStoresJSON').on('click', function () {
        console.log('trying to get stores');
        $('#store').empty();
		//refreshing added :)
		$('#store').append('<option>Loading from JSON</option>').selectmenu("refresh", true);
		$.ajax({
			"url": "_view/stores",
			"dataType": "json",
			"success": function(data) {
				$('#storelist').empty();
				$.each(data.rows, function(index, store){
					var nameofstore = store.value.nameofstore;
					var address = store.value.address;
					var zip = store.value.zip;	
					$('#store').append('<option value="'+index+'">'+store.value.nameofstore+' '+store.value.address+'</option>');
				});
				$('#storelist').listview('refresh');
			}
		});
		return false;
    });<!--end getStoresJSON-->
	
	// getStoresCSV
    $('#getStoresCSV').on('click', function () {
        console.log('trying to get stores');
        $('#store').empty();
		//refreshing added :)
		$('#store').append('<option>Loading from CSV</option>').selectmenu("refresh", true);
		$.ajax({
			type: 'GET',
			url:'stores.txt',
			dataType: "text",
			success: function(whatsreturned, status, jqXHR){
				$('#store').empty();
				//console.log(this);
				//console.log(whatsreturned,status,jqXHR);
				var rows = whatsreturned.split(/\r\n|\n/);
				//var headers = rows[0].split(',');
				var info = []; 
				//ignore header row[0]
				var i=1;
				for(i; i<rows.length; i++)
				{
					var thisrow = rows[i].split(',');
					var thisstorename = thisrow[0];
					var thisstoreaddy = thisrow[1];
					var thisstorezip = thisrow[2];
					$('#store').append('<option value="'+thisstorename+'">'+thisstorename+'</option>');
				}
				$('#store').append('<option>Store Data Loaded from CSV</option>').selectmenu("refresh", true);
			} // end success function
		});
		return false;
    });<!--end getStoresCSV-->
});<!--end document on pageinit-->
