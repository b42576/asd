// JavaScript Document

////////////////////////////////////////////////////////////////////////////////
// why
////////////////////////////////////////////////////////////////////////////////
// dojo has localstorage
// ext commercial license
// yahoo like a sandbox - yui3 - jquery mimic - getting better
// yql yahoo query language like sql
// developer.yahoo.com/yui/theater
// jquery - support popularity
/*

simple jQuery.css() .ajax() .html() ...
efficient - fast, even faster in updated libraries
w3c won't work in ie
shorter code in jquery
api.jquery.com
learningjquery.com
yayquery.com
#jQuery on irc.freenode.net

*/

$(document.ready(function(){

});

$(function(){

});

////////////////////////////////////////////////////////////////////////////////
// factory
////////////////////////////////////////////////////////////////////////////////
$();
//
$();
/*
$(document.ready(function(){

});

$(function(){
  $('#nav li'); // returns obj
  $('$nav li').fadeOut(); // returns obj
  $('$nav li').fadeOut().fadeIn(); // returns obj
  
  
});
unless the object returns a non-object, you can continue to add additional functions
*/

////////////////////////////////////////////////////////////////////////////////
// selectors
////////////////////////////////////////////////////////////////////////////////
$("#myid") $(".myclass") $("p")
    id          class    element

$("#myid > .topnav:first a[href][rel]")
    id        class        element
       child               filters
ancestor-descendant relationship
> child - direct
+ sublings after element
~ siblings before or after the element

$("div, p") xor selects all divs and ps if they exist

$("img[title]") <- search all images with a title in it
$("a[href^=http://]") <-  ^= search the beginning of the attributes value
$("img[src$=.jpg]") <-  $= search the end of the attributes value
$("img[src*=puppy]") <-  *= search anywhere of the attributes value
$("img[src!=kitchen]") <-  != search anywhere where the attributes value is not seen
$("img[src=img/myimg.jpg]") <-  = match specific case
$("#content a[href^=http://][href*=google.com]")
filters / element matching
$("selector:filter") syntax filters :first :last :first-child :only-child :last-child :even :odd :header
$("li:first") $("li:even")
:eq(n) equals number
:gt(n) greater than
:lt(n) lessthan
:nth-child(n) $("div:nth-child(3n+1")
:parent :empty :has(selector) :not(.navs)
:contains('text string') :hidden :visible :animated

:input
:button
:password
:submit
:reset
:checkbox
:radio
:text

$("div:parent:not(.mine):last")
$("div:not(.mine):last:parent")

////////////////////////////////////////////////////////////////////////////////
// css, classes, and attributes
////////////////////////////////////////////////////////////////////////////////
$().css("string") returns the value
$().css("string","string") sets a value
$().css(object) sets a json/array object
$().addClass("string")
$().removeClass("string")
$().toggleClass("string")
$().hasClass("string") // returns bool
$().attr("string")
$().attr("string","string")
$().attr(object)
$().removeAttr("string") // removes attribute completely
box model
topleft margin border padding width // all return number
$().height() //returns numeric size
$().width()
$().innerHeight() // returns size incliding padding but not border
$().innerWidth()
$().outterHeight(bool) //returns size including padding and border
$().outterWidth(bool) // bool true, the value will also include the margin default FALSE

$().position().top //based on non-static
$().offset().left //based on document

$().scrollTop() //get
$().scrollLeft()
$().scrollTop(50) //set
$().scrollLeft(50)

////////////////////////////////////////////////////////////////////////////////
// traversing
////////////////////////////////////////////////////////////////////////////////
$("div").addClass("nav").find("p").css({color:"red"});
target.add
$("div").add("p")
$("div").find("p") // finds
.filter(".myclass");
.not(".myclass")
$("div.myclass") == $("div").filter(".myclass")
$("div.myclass") !== $("div").not(".myclass")
.contents()
.children(s)
.siblings(s)
.closest(s)
.parent(s)
.parents(s)
.offsetParent()
.parentsUntil(s)

.next(s) .nextAll(s) .prev(s) .prevAll(s) .nextUntil(s) .prevUntil(s)
.slice(start,end) .eq(i) .has(s)

$("div").map(function(i,elem){
  if $(elem).css("position") === "absolute" ) {
    return elem;
  }
});

$("#myid p")
  .find("span")
  .css({color:"white"})
  .end()
  .css({color:"blue"})
;

////////////////////////////////////////////////////////////////////////////////
// content manipulators                          
////////////////////////////////////////////////////////////////////////////////
// the .innerHTML property 
.html() // get all the html contents of the set
.html("text") // replaces the html content
// no html
.text() // gets the text
.text("string") // replaces the content

$('p:first').append('<a href="#">link</a>').animate(); // animates p:first
$('<a href="#">link</a>').appendTo('#nav').animate(); // animates the link

target.prepend(content);
content.prependTo(target);

target.before(content);
content.insertBefore(target)
target.after(content);
content.insertAfter(target)

// wraps the element with the new element
$("a").wrap('<li></li>');
target.wrap(wrapper)
target.wrapAll(wrapper)
target.wrapInner(wrapper) //make sure there is a closing tag for each element

target.replaceWith(content)
content.replaceAll(target)
target.empty()
.remove()
.detach()
.clone(bool) // bool true also copies events throughout
$("p").clone().appendTo("#somediv").animate();   //targets the new stuff
$("a#mine").clone(true).appendTo("#somediv").animate();

$(function(){
  $('#add').bind('click', function(){
    $("input:file:first").clone(true).insertBefore("#add");
    return false;
  });
});

////////////////////////////////////////////////////////////////////////////////
// the event model                         
////////////////////////////////////////////////////////////////////////////////
focus
blur
change
resize
scroll
load
submit // form element submit enter type, enter key
keyup
keydown
mouseover
mouseout
mousedown
mouseup
mousemove // may be depreciated
click // 90% of code
dblclick
// dom creates all the events
$(target selector).bind(type, data, function)
$("a").click(function(){} );
$("#link").bind("click", {myvar:"test"}, function(e){
  return false
});

$("#mylink").bind('click', function(e){
  alert(e.type);
  return false;
}); // event object
type
target
currentTarget
relatedTarget
timeStamp // number of ms
which //keycode charcode
pageX / pageY
screenX / screenY
data
namspace
$(function(){
  $(window).bind('click', function(){
    alert('window');
    return false;
  } );
  $('#nav li').bind('click', function(){
    alert('nav li');
    return false;
  } );
  $('#nav').bind('click', function(){
    alert('nav');
    return false;
  } );
  $('#nav li a').bind('click', function(){
    var that = $(this);
    console.log( this ); // returns raw dom object not jquery object
    $(this).html('<em>i have been clicked</em>');
    return false;
  } );
  
  var fn = function(e){
    console.log(e);
    var that = $(this);
    that.html('you did something to me');
    that.css({});
    return false;
  };
});
capture bubble
a  b  c  d

e.stopPropagation();
e.preventDefault();
return false;

$(target).unbind(type, handler)
$("a").unbind('click').bind('click', fn);
// mouseover mouseout
// mouseenter mouseleave // use these
// focus  blur
// focusin focusout // use these
// 

$('<a href="#">Link</a>')
  .appendTo('#nav')
  .wrap('<li />')
  .bind('click', function(){
    console.log('nav event');
    $(this).parent().addClass('active');
    return false;
    })
  ;


////////////////////////////////////////////////////////////////////////////////
// advanced events                       
////////////////////////////////////////////////////////////////////////////////
.one()
$("#link").toggle(
  function(e){
  },
  function(e){
  }
);

$('$nav li a').live('click',function(){
  $('<li><a href="">Link</a></li>').appendTo('#nav');
  return false;
} )

$(target).live(type, data, function)
$("a").live("click",function(){});
$(parent).delegate(target, type, data, function)
$(parent).undelegate(target, type)

$(document).delegate('#nav li a','click', function(){
  $('<li><a href="">Link</a></li>').appendTo('#nav');
  return false;
} );


