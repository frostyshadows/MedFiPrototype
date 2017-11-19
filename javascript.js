/**
 * Created by sherryuan on 2017-11-09.
 */

$(function () {

    /* Notification from the front page */
    var approved_key = "approved";
    if (localStorage.getItem(approved_key) == undefined) {
        localStorage.setItem(approved_key, false);
    }

    $("#notification_button").click(function() {
        if (localStorage.getItem(approved_key) == "false") {
            // if user hasn't been approved yet, show the page with the first "Become a Super Reviewer notification"
            window.open("profile_with_notification.html", "_self");
        } else {
            // if user's already approved, we know to show the notification telling them they're approved
            window.open("profile_with_approval.html", "_self");
        }
    });

    /* Search from front page */

    $("#search_button").click(function () {
        window.open("Interface1/ResultPage.html", "_self");
    });

    /* Modal box for becoming a Super Reviewer */

    // When the user clicks on the button, open the modal
    $("#become_super_reviewer_button").click(function() {
        $("#super_reviewer_info")[0].style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    $(".close").click(function() {
        $("#super_reviewer_info")[0].style.display = "none";
    });

    // When user clicks on continue, close the modal and open the Google Form
    $("#continue_button").click(function() {
        $("#super_reviewer_info")[0].style.display = "none";
        localStorage.setItem(approved_key, true);
    });

    // When user clicks on cancel, close the modal
    $("#cancel_button").click(function() {
        $("#super_reviewer_info")[0].style.display = "none";
    });
	
	$("#cancel_button1").click(function() {
    $("#myModal1")[0].style.display = "none";
    });
	$("#cancel_button2").click(function() {
    $("#myModal")[0].style.display = "none";
    });
	
	$("#submit_button").click(function() {
    $("#myModal")[0].style.display = "none";
    });


    /* home page button */
    $(".home_page").click(function() {
        if (window.location.pathname.indexOf("Interface1") == -1) {
            window.open("index.html", "_self");
        } else {
            window.open("../index.html", "_self");
        }
    });
	
	var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var modal1 = document.getElementById('myModal1');
// Get the button that opens the modal
var btn1 = document.getElementById("myBtn1");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn1.onclick = function() {
    modal1.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal1.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}

    $("#profile_button")
        .mouseenter(function () {
        console.log("entered profile button");
        $("#profile_hover")[0].style.opacity = "1";
    })
        .mouseleave(function () {
        console.log("left profile button");
        $("#profile_hover")[0].style.opacity = "0";
    });
});