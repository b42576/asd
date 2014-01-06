// Kevin Fry
// ASD 1312
// Main Javascript File

$(document).on("pageinit", "#userPage", function () {
    //event.preventDefault();
    console.log('userPage loaded');

    $.couch.session({
        success: function(data) {
        	console.log('session info');
            console.log(data);
            console.log(data.userCtx.name);
            var twausername = data.userCtx.name;
            $('#userInfo').html('<h2>Welcome <strong>'+twausername+'</strong>!</h2>');
        }
    });
    
    
});
