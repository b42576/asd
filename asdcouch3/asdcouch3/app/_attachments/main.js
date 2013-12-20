// Kevin Fry
// ASD 1312
// Main Javascript File


$( document ).on( "pageinit", "#homePage", function() {
	$("#homeSearchInput").change(function(){
		var homeSerchInputText = $("#homeSearchInput").val();
		
	});
	$.ajax({
		"url": "_view/stores",
		"dataType": "json",
		"success": function(data) {
			$('#storelist').empty();
			$.each(data.rows, function(index, store){
				var nameofstore = store.value.nameofstore;
				var address = store.value.address;
				var zip = store.value.zip;	
				$('#storelist').append(
					$('<li>').append(
						$('<a>').attr("href", "#")
							.text(nameofstore)
					)
				);
			});
			$('#storelist').listview('refresh');
		}
	});
});
