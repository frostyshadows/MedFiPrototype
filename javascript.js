/**
 * Created by sherryuan on 2017-11-09.
 */
$(function () {
    var approved = false;

    $("#notification_button").click(function() {
        if (!approved) {
            window.open("profile_with_notification.html", "_self");
            approved = true;
        } else {
            window.open("profile_with_approval.html", "_self");
        }
    });

// When the user clicks on the button, open the modal
    $("#become_super_reviewer_button").onclick = function() {
        $("#super_reviewer_info").style.display = "block";
    };

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        $("#super_reviewer_info").style.display = "none";
    };

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == $("#super_reviewer_info")) {
            $("#super_reviewer_info").style.display = "none";
        }
    };
});