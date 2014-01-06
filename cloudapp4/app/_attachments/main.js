// Kevin Fry
// ASD 1312
// Main Javascript File

$(document).on("pageinit", "#homePage", function () {
    //event.preventDefault();
    console.log('homePage loaded');

    $.couch.db("thisweeksad").view("thisweeksad/stores", {
        success: function (data) {
            //console.log(data);
            $('#storeSearchList').empty();
            $.each(data.rows, function (index, value) {
                var item = (value.value || value.doc);
                $('#storeSearchList').append(
                    $('<li>').append(
                        $('<a>')
                        .attr("href", "store.html?store=" + data.rows[index].key)
                        //.attr("href", "#storePage")
                        //.attr("data-key", data.rows[index].key)
                        .text(item.nameofstore)
                    )
                );
            });
            $('#storeSearchList').listview('refresh');
            //return false;
        }
    });


});

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
$(document).on("pageinit", "#browseStores", function () {
    //event.preventDefault();
    console.log('browseStores loaded');

    $.couch.db("thisweeksad").view("thisweeksad/stores", {
        success: function (data) {
            //console.log(data);
            $('#browseStoresSearchList').empty();
            $.each(data.rows, function (index, value) {
                var item = (value.value || value.doc);
                $('#browseStoresSearchList').append(
                    $('<li>').append(
                        $('<a>')
                        .attr("href", "store.html?store=" + data.rows[index].key)
                        //.attr("href", "#storePage")
                        //.attr("data-key", data.rows[index].key)
                        .text(item.nameofstore)
                    )
                );
            });
            $('#browseStoresSearchList').listview('refresh');
            return false;
        }
    });


});


$(document).on("pageinit", "#storePage", function () {

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
        success: function (data) {
            console.log(data);
            //'<button class="edit" data-key="' + localStorage.key(i) + '">Edit</button>'
            //$('#storeDetailsList').empty();
            //console.log(data['nameofstore']);
            $('#nameofstoredisplay').html("" + data['nameofstore'] + "");
            $('#addressdisplay').html(data['address'] + "<br />" + data['city'] + ", " + data['state'] + " " + data['zip']);
            $('#phonedisplay').html(data['phone']);
            //$('#hours').append('<li>'+data['hours']+'</li>');
            $('#hoursdisplay').empty();
            $.each(data['hours'], function (index, value) {
                var dayofweek = index;
                var dayshours = value;
                $('#hoursdisplay').append(
                    $('<li>').html('<strong>' + dayofweek + ':</strong> ' + dayshours)
                );
            });
            $('#hoursdisplay').listview('refresh');
            //return false;
            $('#storePageDetails').append(
                $('<a>')
                .attr("class", "edit")
                .attr("href", "edit_store.html?" + key)
                .attr("data-key", key)
                .text('Edit')
            );
            $('#storePageDetails').append(
                $('<a>')
                .attr("class", "postdelete")
                .attr("id", "postdelete")
            //.attr("href", "#")
                .attr("data-key", key)
                .text('Delete')
            );

            $('#postdelete').on('click', function () {
                console.log('post delete clicked');
                var thiskey = $(this).data('key');
                // ask to delete key

                $.couch.db("thisweeksad").openDoc(key, {
                    success: function (data) {
                        var docToDelete = {};
                        docToDelete._id = data._id;
                        docToDelete._rev = data._rev;
                        console.log(docToDelete);
                        if (confirm('Are you sure you want to delete this store?')) {
                            //$.couch.db.removeDoc(doc, options)
                            //var encodedJSON = JSON.stringify(docToDelete);
                            //console.log(encodedJSON);
                            $.couch.db("thisweeksad").removeDoc(docToDelete, {
                                success: function (data) {
                                    console.log('delete successful: ' + data);
                                    var deleteMessage = '<h2>Store Deleted</h2>';
                                    deleteMessage += '<p>The store has been deleted.</p>';
                                    $('#storePageDetails').html(deleteMessage);
                                }
                            })
                        } else {
                            // Do nothing!
                        }
                    }
                });
                return false;
            }); //end postdelete


        }
    });

});
$(document).on("pageinit", "#editStorePage", function () {
    //event.preventDefault();
    console.log('editStorePage loaded');
    //var urlData = $(this).data("url");
    //console.log(urlData);
    var urlData = $($.mobile.activePage).data("url");
    var store = urlVars(urlData)["store"];
    console.log('edit store page store:' + store);
    //var thiskey = $(this).data('key');
    //var key = "store:" + thiskey;
    var key = "store:" + store;
    console.log(key);
    $.couch.db("thisweeksad").openDoc(key, {
        success: function (data) {
            console.log(data);
            //'<button class="edit" data-key="' + localStorage.key(i) + '">Edit</button>'
            //$('#storeDetailsList').empty();
            //console.log(data['nameofstore']);
            $('#editnameofstore').val("" + data['nameofstore'] + "");
            $('#editaddress').val(data['address']);
            $('#editcity').val(data['city']);
            $('#editstate').val(data['state']);
            $('#editzip').val(data['zip']);
            $('#editphone').val(data['phone']);
            //$('#hours').append('<li>'+data['hours']+'</li>');
            $('#edithours').empty();
            var hoursData = '';
            var total = data['hours'].length;
            $.each(data['hours'], function (index, value) {
                //var daysAndHours = value.split(":");
                var dayofweek = index;
                var dayshours = value;
                if (index === "Saturday") {
                    hoursData += dayofweek + ': ' + dayshours;
                } else {
                    hoursData += dayofweek + ': ' + dayshours + ',\n';
                }
                //hoursData += dayofweek + ': ' + dayshours + ',\n';
                //objStore.hours.dayofweek = dayshours;
            });

            $("#edithours").val(hoursData);
            //$('#hoursdisplay').listview('refresh');
            //return false;
            /*
            $('#editStoreForm').append(
            $('<button>')
            .attr("class", "postedit")
            //.attr("href", "#storePage")
            .attr("data-key", key)
            .text('Edit')
            );
            $('#editStoreForm').append(
            $('<button>')
            .attr("class", "postdelete")
            //.attr("href", "#storePage")
            .attr("data-key", key)
            .text('Delete')
            );
            */
            $('#editStoreButton').attr("data-key", key);
            $('#editStoreButton').on('click', function () {
                var thiskey = $(this).data('key');
                console.log(thiskey);
                var objStore = {};
                objStore._id = thiskey;
                objStore._rev = data._rev;
                objStore.nameofstore = $('#editnameofstore').val();
                objStore.address = $('#editaddress').val();
                objStore.city = $('#editcity').val();
                objStore.state = $('#editstate').val();
                objStore.zip = $('#editzip').val();
                objStore.phone = $('#editphone').val();
                //objStore.hours = '{'+ $('#hours').val() +'}';
                objStore.hours = {};
                var hourRows = $('#edithours').val().split(",");
                //objStore.hours = {};
                //var hourRows = $('#hours').val().split(",");
                $.each(hourRows, function (index, value) {
                    var daysAndHours = value.split(":");
                    var dayofweek = daysAndHours[0].trim();
                    var dayshours = daysAndHours[1].trim();
                    //objStore.hours.dayofweek = dayshours;
                    if (dayofweek == 'Sunday') { objStore.hours.Sunday = dayshours; }
                    if (dayofweek == 'Monday') { objStore.hours.Monday = dayshours; }
                    if (dayofweek == 'Tuesday') { objStore.hours.Tuesday = dayshours; }
                    if (dayofweek == 'Wednesday') { objStore.hours.Wednesday = dayshours; }
                    if (dayofweek == 'Thursday') { objStore.hours.Thursday = dayshours; }
                    if (dayofweek == 'Friday') { objStore.hours.Friday = dayshours; }
                    if (dayofweek == 'Saturday') { objStore.hours.Saturday = dayshours; }
                });
                var encodedJSON = JSON.stringify(objStore);
                console.log(encodedJSON);
                $.couch.db("thisweeksad").saveDoc(objStore, {
                    success: function (data) {
                        console.log('success:' + data);
                    },
                    error: function (status) {
                        console.log('fail:' + status);
                    }
                });
                return false;
            });

            $('.postdelete').on('click', function () {
                console.log('post delete clicked');
                var thiskey = $(this).data('key');
                // ask to delete key

                $.couch.db("thisweeksad").openDoc(key, {
                    success: function (data) {
                        var docToDelete = {};
                        docToDelete._id = data._id;
                        docToDelete._rev = data._rev;
                        console.log(docToDelete);
                        if (confirm('Are you sure you want to delete this store?')) {
                            //$.couch.db.removeDoc(doc, options)
                            var encodedJSON = JSON.stringify(docToDelete);
                            console.log(encodedJSON);
                            $.couch.db.removeDoc(encodedJSON, {
                                success: function (data) {
                                    console.log('delete successful: ' + data);
                                }
                            })
                        } else {
                            // Do nothing!
                        }
                    }
                });
                return false;
            }); //end postdelete

        }
    });



});



$(document).on("pageinit", "#addStorePage", function () {

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
        $.each(hourRows, function (index, value) {
            var daysAndHours = value.split(":");
            var dayofweek = daysAndHours[0].trim();
            var dayshours = daysAndHours[1].trim();
            //objStore.hours.dayofweek = dayshours;
            if (dayofweek == 'Sunday') { objStore.hours.Sunday = dayshours; }
            if (dayofweek == 'Monday') { objStore.hours.Monday = dayshours; }
            if (dayofweek == 'Tuesday') { objStore.hours.Tuesday = dayshours; }
            if (dayofweek == 'Wednesday') { objStore.hours.Wednesday = dayshours; }
            if (dayofweek == 'Thursday') { objStore.hours.Thursday = dayshours; }
            if (dayofweek == 'Friday') { objStore.hours.Friday = dayshours; }
            if (dayofweek == 'Saturday') { objStore.hours.Saturday = dayshours; }
        });
        var encodedJSON = JSON.stringify(objStore);
        console.log(encodedJSON);
        $.couch.db("thisweeksad").saveDoc(objStore, {
            success: function (data) {
                console.log('success:' + data);
            },
            error: function (status) {
                console.log('fail:' + status);
            }
        });
        return false;
    });

});