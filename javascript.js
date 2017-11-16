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

    /* home page button */
    $(".home_page").click(function() {
        window.open("index.html", "_self");
    });

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