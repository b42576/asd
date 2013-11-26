// Kevin Fry
// ASD 1312
// Main Javascript File


window.addEventListener("DOMContentLoaded", function () {
    var storelist = Array("==Select Store==", "Acme", "ShopRite", "SuperFresh", "Giant", "Weis", "PathMark", "Target", "WalMart");
    var locatebylist = Array("==Locate By==", "Department", "Aisle", "Location");
    var departmentlist = Array("==Select Department==", "Grocery", "Health &amp; Beauty", "General Merchandice", "Dairy", "Produce", "Meat", "Hot/Prepared Foods", "Deli", "Bakery");
    var aislelist = Array("==Select Aisle==", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30");
    var locationlist = Array("==Select Location==", "Front", "Back", "Front End", "Entrance", "Left", "Right", "Front Right", "Front Left", "Back Right", "Back Left");

    function makeList(formid, listarray) {
        var selectItem = document.getElementById(formid);
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
