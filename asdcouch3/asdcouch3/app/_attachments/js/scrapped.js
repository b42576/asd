// JavaScript Document
        /*
		$.getJSON('xhr/stores.json.js', function (data) {
			console.log('in getjson');
            $.each(data, function (i, value) {
				console.log('in each');
                $('<option value="' + value.store + '">' + value.store + '</option>').appendTo('#store');
            })
        });
		*/
        
		
/*        			$.ajax({
			url: 'http://www.SupermarketAPI.com/api.asmx/StoresByZip',
			data: { APIKEY: "f24e6fb811", ZipCode: "19128" },
			type: 'get',
			dataType: 'script',
			contentType: 'text/xml',
			crossDomain: true,
			async: false,
			success: function (data, status, jqXHR) {
				console.log('status: ',status);
				console.log('data: ',data);
				console.log('jqXHR: ',jqXHR);
				var jsonArray = JSON.parse(data);
				$.each(jsonArray, $.proxy(function(key, value){
					console.log(key, value);
				}));
			},
			error: function (jqX, stat, err) {
				console.log('error');
				console.log(jqX);
				console.log(stat);
				console.log(err);
			}
        });
			//url: 'xhr/stores.json',
			//type: 'get',
			//dataType: 'jsonp',
			// async: false,
			// http://fryintl.com/citysocial/api/rest/venues
			//data: { APIKEY: "f24e6fb811", ZipCode: "19128" },
			//crossDomain: true,
			//jsonp: false,
			//datatype: 'text/xml',
			//http://www.SupermarketAPI.com/api.asmx/StoresByZip?APIKEY=f24e6fb811&ZipCode=19128
	//http://www.SupermarketAPI.com/api.asmx/StoresByCityState?APIKEY=f24e6fb811&SelectedCity=Philadelphia&SelectedState=PA
			//http://www.SupermarketAPI.com/api.asmx/SearchByProductName?APIKEY=f24e6fb811&ItemName=Water

			*/
