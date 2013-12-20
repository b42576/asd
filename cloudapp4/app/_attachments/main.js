// Kevin Fry
// ASD 1312
// Main Javascript File


$( document ).on( "pageinit", "#homePage", function() {
	//event.preventDefault();
	console.log('homePage loaded');
	
	$.couch.db("thisweeksad").view("thisweeksad/stores", {
		success: function(data){
			//console.log(data);
			$('#storeSearchList').empty();
			$.each(data.rows, function(index,value){
				var item = (value.value || value.doc);
				$('#storeSearchList').append(
					$('<li>').append(
						$('<a>')
						.attr("href", "store.html?store="+data.rows[index].key)
						//.attr("href", "#storePage")
						//.attr("data-key", data.rows[index].key)
						.text(item.nameofstore)
					)
				);
			});
			$('#storeSearchList').listview('refresh');
			return false;
		}
	});
	

});

var urlVars = function(urlData) {
	//var urlData = $($.mobile.activePage).data("url");
	console.log(urlData);
	var urlParts = urlData.split("?");
	console.log('urlParts: '+urlParts);
	var urlPairs = urlParts[1].split("&");
	console.log(urlPairs);
	var urlValues = {};
	for (var pair in urlPairs) {
		var keyValue = urlPairs[pair].split("=");
		var key = decodeURIComponent(keyValue[0]);
		var value=decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	return urlValues;
};

$( document ).on( "pageinit", "#storePage", function() {
	//event.preventDefault();
	console.log('storePage loaded');
	var urlData = $(this).data("url");
	console.log(urlData);
	//var urlData = $($.mobile.activePage).data("url");
	var store = urlVars(urlData)["store"];
	console.log(store);
	//var thiskey = $(this).data('key');
	//var key = "store:" + thiskey;
	var key = "store:" + store;
	console.log(key);
	$.couch.db("thisweeksad").openDoc(key, {
		success: function(data){
			console.log(data);
			//'<button class="edit" data-key="' + localStorage.key(i) + '">Edit</button>'
			//$('#storeDetailsList').empty();
			//console.log(data['nameofstore']);
			$('#nameofstoredisplay').html(""+data['nameofstore']+"");
			$('#addressdisplay').html(data['address']+"<br />"+data['city']+", "+data['state']+" "+data['zip']);
			$('#phonedisplay').html(data['phone']);
			//$('#hours').append('<li>'+data['hours']+'</li>');
			$('#hoursdisplay').empty();
			$.each(data['hours'], function(index,value){
				var dayofweek = index;
				var dayshours = value;
				$('#hoursdisplay').append(
					$('<li>').html('<strong>'+dayofweek+':</strong> '+dayshours)
				);
			});
			$('#hoursdisplay').listview('refresh');
			//return false;
			$('#storePageDetails').append(
					$('<button>')
					.attr("class", "edit")
					//.attr("href", "#storePage")
					.attr("data-key", key)
					.text('Edit')
				);
			$('#storePageDetails').append(
					$('<button>')
					.attr("class", "delete")
					//.attr("href", "#storePage")
					.attr("data-key", key)
					.text('Delete')
				);
			
			
		}
	});

});


$( document ).on( "pageinit", "#addStorePage", function() {
    
	$('#addStoreButton').on('click', function () {
        //e.preventDefault();
		var betterkey = 'store:' + $.couch.newUUID();
        var objStore = {};
        objStore._id = betterkey;
        objStore.nameofstore = $('#nameofstore').val();
        objStore.address = $('#address').val();
        objStore.city = $('#city').val();
        objStore.state = $('#state').val();
        objStore.zip = $('#zip').val();
        objStore.phone = $('#phone').val();
        //objStore.hours = '{'+ $('#hours').val() +'}';
        objStore.hours = {};
        var hourRows = $('#hours').val().split(",");
		$.each(hourRows, function(index,value){
			var daysAndHours = value.split(":");
			var dayofweek = daysAndHours[0];
			var dayshours = daysAndHours[1];
			objStore.hours.dayofweek = dayshours;
		});
        var encodedJSON = JSON.stringify(objStore);
        console.log(encodedJSON);
        $.couch.db("thisweeksad").saveDoc(objStore, {
            success: function(data) {
                console.log('success:'+data);
            },
            error: function(status) {
                console.log('fail:'+status);
            }
        });
        return false;
    });

});


