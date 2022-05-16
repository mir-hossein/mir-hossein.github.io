var mode = 2;

window.addEventListener("load", function(event) {
    var searchBox = document.getElementById("searchbox");
    searchBox.addEventListener("keydown", googleSearchKeyDown);
    
    searchByTag();
});
    
function setMode(value = 0) {
    if ( value!= 0 ) {
        mode = value;
    }
    
    var post_style = document.getElementsByClassName("post")[0].style;
    
    if ( mode == 1 ) {
        post_style.backgroundColor = "#313131";
        post_style.color = "white";     
        post_style.borderWidth = "1px";
        post_style.borderStyle = "solid";
    }
    else if ( mode == 2 ) {
        post_style.backgroundColor = "#f8f8f8";
        post_style.color = "#404040";
        post_style.borderWidth = "0px";
        post_style.borderStyle = "solid";
    }
    else {
        mode = mode%3+1;
        
        setMode();
    }
    
    document.getElementById("mode_counter").textContent = mode.toString();
    
    // checkSearchAvailability();
}

function changeMode() {
    mode++;
    
    setMode();
}

function separator(value = 0) {
    var sep_solid = document.getElementsByClassName("separator-solid");
    var sep_double = document.getElementsByClassName("separator-double");
    
    if ( value == 0 ) {
        for (i = 0 ; i < sep_solid.length ; i++) {
            sep_solid[i].style["border-bottom"] = "1px dashed darkgrey";
        }
        
        for (i = 0 ; i < sep_double.length ; i++) {
            sep_double[i].style["border-bottom"] = "1px dashed darkgrey";
        }
    }
    else if ( value == 1 ) {
        for (i = 0 ; i < sep_solid.length ; i++) {
            sep_solid[i].style["border-bottom"] = "1px solid darkgrey";
        }
        
        for (i = 0 ; i < sep_double.length ; i++) {
            sep_double[i].style["border-bottom"] = "3px double darkgrey";
        }
    }
    else {
        alert("Invalid value");
    }
}

function reverse(text) {
    return text.split("").reverse().join("");
}

function showEmail() {
    var Email = "idVOqxUb4BXWXFjbRdEb1l1Vx8WWYpUdhdlV6NmM582YtxGd";
    var Email_Element = document.getElementById("E-mail-Address");
    
    if ( Email_Element.style.display == "none" || Email_Element.style.display == "") {
        Email_Element.style.display = "inline";
        Email_Element.value = reverse(atob(reverse(atob(reverse(Email)))));
        Email_Element.focus();
        Email_Element.select();
    }
    else {
        Email_Element.style.display = "none";
        Email_Element.value = "";
    }
}

function searchByTag(type = 0) {
    var all_hashes = document.location.hash.slice(1);
    var hashes = all_hashes.split("&");
    var tag_exists = false;
    var i = 0;
    
    for ( i = 0 ; i < hashes.length ; i++ )
        if( hashes[i].substring(0, 4) == "tag=" ) {
            tag_exists = true;
            break;
        }
    
    if ( tag_exists == false )
        return 0;

    var tag = decodeURIComponent(hashes[i].replace("tag=",""));
    var all_tags = document.getElementsByClassName("tags");
    var found = false;

    if ( tag.length > 0 ) {
        for (var i = 0 ; i < all_tags.length ; i++)
            all_tags[i].parentNode.parentNode.style = "display: none;";
        
        for (var i = 1 ; i < document.getElementsByClassName("separator-solid").length ; i++)
            document.getElementsByClassName("separator-solid")[i].style = "display: none;";
           
        for (var i = 0 ; i < all_tags.length ; i++)
            if ( all_tags[i].textContent.toLowerCase().startsWith(tag.toLowerCase()) ) {
                all_tags[i].parentNode.parentNode.style = "display: inherit;";
                found = true;
            }
    }
    else
    {
        for (var i = 0 ; i < all_tags.length ; i++)
            all_tags[i].parentNode.parentNode.style = "display: inherit;";
    }
    
    
    if ( found == false && type == 0) {
        for (var i = 0 ; i < all_tags.length ; i++)
            all_tags[i].parentNode.parentNode.style = "display: inherit;";
        
        if ( tag.trim().length > 0 )
            alert("Not found! All posts will be displayed.");
    }

}

function extendSearchbox() {
    document.getElementById("searchbox").setAttribute("size", 15);
}

function defaultSearchbox() {
    document.getElementById("searchbox").setAttribute("size", 8);
}

function searchIt() {
    var temp = "tag=";
    temp += document.getElementById("searchbox").value.trim();
    
    document.location.hash = temp;
    
    searchByTag(1);
}

function googleSearchKeyDown(event) {
    if ( event.key == "Enter" )
        googleSearch();
}

function googleSearch() {
    var query = document.getElementById("searchbox").value.trim();
    var googleAddress = "https://www.google.com/search?q=site%3Ahttps%3A%2F%2Fmir-hossein.github.io%2F+";
    
    googleAddress += query; 
    
    document.location = googleAddress; 
}

/*
function showSearchHelp() {
    alert("Search Pattern: query%\n" +
          "Some tags are hidden.\n" +
          "Case-insensitive\n" +
          "The Search will be done automatically.\n\n" +
          "Example: CVE-2022\n" +
          "Example: RCE");
}

function checkSearchAvailability() {
    var index = document.location.toString().lastIndexOf("/");
    
    var page = document.location.toString().substr(index+1);
    page = page.replace(document.location.hash, "");
    
    if ( page.length > 0 && !page.startsWith("index.html") )
        document.getElementsByClassName("navigation-bar-items no-hover")[0].style = "display: none;";  
}
*/
