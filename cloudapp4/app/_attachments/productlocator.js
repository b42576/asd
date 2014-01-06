// Kevin Fry
// ASD 1312
// Main Javascript File
$(document).on("pageinit", "#productLocatorPage", function () {
    // populate form fields
    //var storelist = Array("[geolocate]", "Acme", "ShopRite", "SuperFresh", "Giant", "Weis", "PathMark", "Target", "WalMart");
    var locatebylist = Array("Select Locate By Type", "Department", "Aisle", "Location");
    var departmentlist = Array("Grocery", "Health &amp; Beauty", "General Merchandice", "Dairy", "Produce", "Meat", "Hot/Prepared Foods", "Deli", "Bakery", "Customer Service");
    var aislelist = Array("n/a", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30");
    var locationlist = Array("Middle", "Front", "Back", "Front", "Entrance", "Left", "Right", "Front Right", "Front Left", "Back Right", "Back Left", "A", "B");
    $.couch.db("thisweeksad").view("thisweeksad/stores", {
        success: function (data) {
            //console.log(data);
            $('#store').empty();
            $.each(data.rows, function (index, value) {
                var item = (value.value || value.doc);
                $('#store').append('<option value="' + data.rows[index].key + '">' + item.nameofstore + '</option>');
                /*
                $('#storeSearchList').append(
                    $('<li>').append(
                        $('<a>')
                        .attr("href", "store.html?store=" + data.rows[index].key)
                        //.attr("href", "#storePage")
                        //.attr("data-key", data.rows[index].key)
                        .text(item.nameofstore)
                    )
                );
                */
            });
            //					$('#store').append('<option value="'+index+'">'+store.value.nameofstore+' '+store.value.address+'</option>');
            $('#store').selectmenu("refresh", true);
            return false;
        }
    });
    // stores

    /*
    for (var i = 0, j = storelist.length; i < j; i++) {
        $('<option value="' + storelist[i] + '">' + storelist[i] + '</option>').appendTo('#store');
    };
    */

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

    $('#addProductLocationButton').on('click', function () {
        //e.preventDefault();
    	var newCouchID = $.couch.newUUID();
        var betterkey = 'productlocation:' + newCouchID;
        var objProduct = {};
        objProduct._id = betterkey;
        objProduct.prodcat = $('#prodcat').val();
        objProduct.store = $('#store').val();
        var storeID = $('#store').val();
        console.log('storeID: '+storeID);
        objProduct.department = $('#department').val();
        objProduct.aisle = $('#aisle').val();
        objProduct.location = $('#location').val();
        var encodedJSON = JSON.stringify(objProduct);
        console.log(encodedJSON);
        var prodcattext = $('#prodcat').val();
        var storetext = $("#store option[value='"+storeID+"']").text();
        console.log('storetext: '+storetext);
        $.couch.db("thisweeksad").saveDoc(objProduct, {
            success: function (data) {
                console.log('success:' + data);
                $('.display').append(
                        $('<li>').append(
                            $('<a>')
                            .attr("href", "productlocator_edit.html?productlocation=" + newCouchID)
                            //.attr("href", "#storePage")
                            //.attr("data-key", data.rows[index].key)
                            .text(prodcattext + ' at ' + storetext)
                        )
                    );

            },
            error: function (status) {
                console.log('fail:' + status);
            }
        });
        return false;
    });

    $.couch.db("thisweeksad").view("thisweeksad/productlocations", {
        success: function (data) {
            //console.log(data);
            $('.display').empty();
            $.each(data.rows, function (index, value) {
                var item = (value.value || value.doc);
                var storeinfo = 'store:' + item.store;
                console.log(storeinfo);
                $.couch.db("thisweeksad").openDoc(storeinfo, {
                    success: function (data2) {
                        //console.log(data);
                        //'<button class="edit" data-key="' + localStorage.key(i) + '">Edit</button>'
                        //$('#storeDetailsList').empty();
                        //console.log(data['nameofstore']);
                        var returnData = {};
                        returnData.nameofstore = data2['nameofstore'];
                        //return data['nameofstore'] + "");		
                        $('.display').append(
                            $('<li>').append(
                                $('<a>')
                                .attr("href", "productlocator_edit.html?productlocation=" + data.rows[index].key)
                                //.attr("href", "#storePage")
                                //.attr("data-key", data.rows[index].key)
                                .text(item.prodcat + ' at ' + data2['nameofstore'])
                            )
                        );
                    }
                });



            });
            $('.display').listview('refresh');
            return false;
        }
    });

});
// end document on pageinit 
var urlVars = function (urlData) {
    //var urlData = $($.mobile.activePage).data("url");
    console.log(urlData);
    var urlParts = urlData.split("?");
    console.log('urlParts: ' + urlParts);
    var urlPairs = urlParts[1].split("&");
    console.log(urlPairs);
    var urlValues = {};
    for (var pair in urlPairs) {
        var keyValue = urlPairs[pair].split("=");
        var key = decodeURIComponent(keyValue[0]);
        var value = decodeURIComponent(keyValue[1]);
        urlValues[key] = value;
    }
    return urlValues;
};

$(document).on("pageinit", "#editProductLocatorPage", function () {
    // populate form fields
    //var storelist = Array("[geolocate]", "Acme", "ShopRite", "SuperFresh", "Giant", "Weis", "PathMark", "Target", "WalMart");
	console.log('editProductLocatorPage accessed');
	/* GET ITEM INFORMATION */
    //var locatebylist = Array("Select Locate By Type", "Department", "Aisle", "Location");
    var departmentlist = Array("Grocery", "Health &amp; Beauty", "General Merchandice", "Dairy", "Produce", "Meat", "Hot/Prepared Foods", "Deli", "Bakery", "Customer Service");
    var aislelist = Array("n/a", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30");
    var locationlist = Array("Middle", "Front", "Back", "Front", "Entrance", "Left", "Right", "Front Right", "Front Left", "Back Right", "Back Left", "A", "B");

    for (var i = 0, j = departmentlist.length; i < j; i++) {
        $('<option value="' + departmentlist[i] + '">' + departmentlist[i] + '</option>').appendTo('#editdepartment');
    };
    // locate by aislelist
    for (var i = 0, j = aislelist.length; i < j; i++) {
        $('<option value="' + aislelist[i] + '">' + aislelist[i] + '</option>').appendTo('#editaisle');
    };
    // locate by aislelist
    for (var i = 0, j = locationlist.length; i < j; i++) {
        $('<option value="' + locationlist[i] + '">' + locationlist[i] + '</option>').appendTo('#editlocation');
    };
    var urlData = $(this).data("url");
    //var urlData = $($.mobile.activePage).data("url");
    var productlocation = urlVars(urlData)["productlocation"];
    console.log('edit store page store:' + productlocation);
    //var thiskey = $(this).data('key');
    //var key = "store:" + thiskey;
    var key = "productlocation:" + productlocation;
    console.log(key);

	//remove selected one
	//  $('option:selected', 'select[name="options"]').removeAttr('selected');
	//Using the value
	//  $('select[name="options"]').find('option[value="3"]').attr("selected",true);
	//Using the text
	//  $('select[name="options"]').find('option:contains("Blue")').attr("selected",true);
    $.couch.db("thisweeksad").openDoc(key, {
        success: function (data) {
            console.log(data);
            // .removeAttr('selected').find('option:first').attr('selected', 'selected');
            //$('#editstore').find('option[value="store:'+data['store']+'"]').attr('selected', 'selected');
            //$('#editstore').find('option[value="store:'+data['store']+'"]').attr("selected",true);
            //$('#editstore').listview('refresh');
            $('#editprodcat').val(data['prodcat']);
            $.couch.db("thisweeksad").view("thisweeksad/stores", {
                success: function (data2) {
                    //console.log(data);
                    $('#editstore').empty();
                    $.each(data2.rows, function (index, value) {
                        var item = (value.value || value.doc);
                        if (data['store'] == data2.rows[index].key){
                        	$('#editstore').append('<option value="' + data2.rows[index].key + '" selected>' + item.nameofstore + '</option>');
                        } else {
                        	$('#editstore').append('<option value="' + data2.rows[index].key + '">' + item.nameofstore + '</option>');
                        }
                        
                    });
                    $('#editstore').selectmenu("refresh", true);
                    //return false;
                }
            });
            $('#editdepartment').val(data['department']);
            $('#editdepartment').selectmenu("refresh", true);
            
            $('#editaisle').val(data['aisle']);
            $('#editaisle').selectmenu("refresh", true);
            
            $('#editlocation').val(data['location']);
            $('#editlocation').selectmenu("refresh", true);
            
            $('#editProductLocationButton').attr("data-key", key);
            $('#editProductLocationButton').on('click', function () {
                //e.preventDefault();
            	var thiskey = $(this).data('key');
            	console.log(thiskey);
                //
            	var objProduct = {};
                objProduct._id = thiskey;
                objProduct._rev = data._rev;
                objProduct.prodcat = $('#editprodcat').val();
                objProduct.store = $('#editstore').val();
                objProduct.department = $('#editdepartment').val();
                objProduct.aisle = $('#editaisle').val();
                objProduct.location = $('#editlocation').val();
                var encodedJSON = JSON.stringify(objProduct);
                console.log(encodedJSON);
                $.couch.db("thisweeksad").saveDoc(objProduct, {
                    success: function (data) {
                        console.log('success:' + data);
                        var returnHTML = '<h2>The record has been updated!</h2>';
                        returnHTML += '<p>Go back to <a href="productlocator.html" data-ajax="false" >product locations</a>.</p>';
                        $('#editProductLocatorPageSection').html(returnHTML);
                        return false;
                    },
                    error: function (status) {
                        console.log('fail:' + status);
                    }
                });
                //
                //return false;
            });

            $('#deleteProductLocationButton').attr("data-key", key);
            $('#deleteProductLocationButton').on('click', function () {
                //e.preventDefault();
            	var thiskey = $(this).data('key');
                $.couch.db("thisweeksad").openDoc(thiskey, {
                    success: function (data2) {
                        var docToDelete = {};
                        docToDelete._id = data2._id;
                        docToDelete._rev = data2._rev;
                        console.log(docToDelete);
                        if (confirm('Are you sure you want to delete this product location?')) {
                            //$.couch.db.removeDoc(doc, options)
                            //var encodedJSON = JSON.stringify(docToDelete);
                            //console.log(encodedJSON);
                            $.couch.db("thisweeksad").removeDoc(docToDelete, {
                                success: function (data3) {
                                    console.log('delete successful: ' + data3);
                                    var returnHTML = '<h2>The record has been deleted!</h2>';
                                    returnHTML += '<p>Go back to <a href="productlocator.html" data-ajax="false" >product locations</a>.</p>';
                                    $('#editProductLocatorPageSection').html(returnHTML);
                                    return false;
                                }
                            });
                        } else {
                            // Do nothing!
                        }
                    }
                });
                return false;
            });
            return false;
        }
    //return false;
    });

});
//end document on pageinit