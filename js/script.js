/*
 *
 * TODO: Refactor required ?
 * 
 */

var mode = 0; // Disables dark-mode by default.

$(document).ready(function() {
  mode = $(".dark-mode").length; 
  $(".navbar  .btn-check")[1 - mode].checked = true;
  //setMode(1);  
  
  $("#li-searchbox-extended").hide();
  
  $("img:not([src*='icons/'])").click(function() {
    $("#full-size-img").attr("src", $(this).attr("src"));
    $("#full-size-modal").modal("show");
  });
  
  $("div + .highlight").prev().each(function() {
    $(this).css("background-color", "#272822");
  
    $(this).find("a").each(function() {
      $(this).text($(this).attr("href"));
      $(this).attr("title", $(this).attr("href"));
    });
  });
  
  $(".pre-highlight + .highlight > div").addClass("rounded-bottom");
  
  $(".pre-highlight").addClass("rounded-top ps-2");
  
  $(".highlight:not(.pre-highlight + .highlight) > :is(pre, div)").addClass("rounded-2 p-3");
  
  $("#li-searchbox").click(function() {
    $("#li-searchbox-extended").fadeIn();
    $(this).hide();
    $("#searchbox").focus();
  });
  
  $("#searchbox").blur(function() {
    $("#li-searchbox").fadeIn();
    $("#li-searchbox-extended").hide();
  });
  
  $("#searchbox").keydown(function() {
    if (event.keyCode === 13)
      googleSearch();
  });
  
  searchByTag();
});
  
function setMode(value = 0) {  
  mode = value === 0 ? ((mode)%2+1) : value;
  
  if (mode === 1)
    $(".main-content").addClass("dark-mode");
  else
    $(".main-content").removeClass("dark-mode");
  
  return;
}

function reverse(text) {
  return text.split("").reverse().join("");
}

function showEmail() {
  var xyz = reverse(atob(reverse(atob(reverse("idVOqxUb4BXWXFjbRdEb1l1Vx8WWYpUdhdlV6NmM582YtxGd")))));
  
  $("#E-mail-Address").toggleClass("d-none").attr("value", xyz).select().focus();
}

function searchByTag(type = 0) {
  var all_hashes = document.location.hash.slice(1);
  var hashes = all_hashes.split("&");
  var tag_exists = false;
  var i = 0;
  
  $("#end-of-posts").addClass("d-none");
  
  for (i = 0 ; i < hashes.length ; i++) {
    if (hashes[i].substring(0, 4) === "tag=") {
      tag_exists = true;
      
      break;
    }
  }
  
  if (tag_exists === false)
    return 0;

  var tag = decodeURIComponent(hashes[i].replace("tag=",""));
  var found = false;
  
  setColorByTag(tag);

  if (tag.length > 0) {
    $(".tags").parent().parent().addClass("d-none");
    
    $(".tags").each(function() {
      if ($(this)[0].textContent.toLowerCase().startsWith(tag.toLowerCase())) {
        $(this).parent().parent().removeClass("d-none");
        found = true;
      }
    });
  } else {
    $(".tags").parent().parent().removeClass("d-none");
    
    found = true;
  }
       
  if (found === false && type === 0) {
    $(".tags").parent().parent().removeClass("d-none");
    
    if (tag.trim().length > 0)
      alert("Not found! All posts will be displayed.");
  }
  
  $("#published-posts").addClass("d-none");
  $("#published-posts").nextUntil("#draft-posts").each(function() {
    if ($(this).css("display") !== "none") {
      $("#published-posts").removeClass("d-none");
      return;
    }
  });
  
  $("#draft-posts").addClass("d-none");
  $("#draft-posts").nextUntil("#end-of-posts").each(function() {
    if ($(this).css("display") !== "none") {
      $("#draft-posts").removeClass("d-none");
      return;
    }
  });
  
  if ($("#draft-posts").css("display") === "none" && $("#published-posts").css("display") === "none") {
    $("#end-of-posts").removeClass("d-none");
  }
}


function searchIt() { /* TODO: Refactor */
  var temp = "tag=";
  temp += $("#searchbox")[0].value.trim();
  
  document.location.hash = temp;  
  
  searchByTag(1);
}

function googleSearch() {
  var query = $("#searchbox")[0].value.trim();
  var googleAddress = "https://www.google.com/search?q=site%3Ahttps%3A%2F%2Fmir-hossein.github.io%2F+";
  
  googleAddress += query; 
  
  document.location = googleAddress; 
}

function setTag(tag) {
  document.location.hash = "tag="+tag;
  
  setColorByTag(tag);
}

function setColorByTag(tag) {
  if (tag === "فارسی")
    $("#selected-language").removeClass("border-warning border-primary").addClass("border-danger");
  else if (tag.toLowerCase() === "english")
    $("#selected-language").removeClass("border-warning border-danger").addClass("border-primary");
  else
    $("#selected-language").removeClass("border-danger border-primary").addClass("border-warning");
}
