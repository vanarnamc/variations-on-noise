var iframe = document.querySelector(".video-background iframe");
var player = new Vimeo.Player(iframe);
var muteText = document.getElementById("muteText");
function toggleMute() {
    player.getVolume().then(function (volume) {
        if (volume > 0) {
            player.setVolume(0);
            muteText.textContent = "[UNMUTE]";
        } else {
            player.setVolume(1);
            muteText.textContent = "[MUTE]";
        }
    });
}

function toggleMenu() {
    var menuOverlay = document.getElementById("menuOverlay"); // Move this line inside the function
    if (menuOverlay) { // Check if the element exists
        if (menuOverlay.style.display === "none") {
            menuOverlay.style.display = "block";
        } else {
            menuOverlay.style.display = "none";
        }
    } else {
        console.error("menuOverlay element not found");
    }
}

function toggleSubmenu(event) {
    event.preventDefault(); // Prevent the link from navigating

    var submenu = document.getElementById("submenu");
    var arrow = document.getElementById("arrow");

    if (submenu.style.display === "none") {
        submenu.style.display = "block";
        arrow.style.transform = "rotate(-90deg)";
    } else {
        submenu.style.display = "none";
        arrow.style.transform = "rotate(0deg)";
    }
}

for (video of document.getElementsByTagName("video")) {
    video.setAttribute("playsinline", "");
    video.setAttribute("muted", "");
    video.play();
}

$(document).ready(function() {
  // This code runs when the document is ready
  $('.interview-speaker-image').each(function() {
    var $imageContainer = $(this).find('.image-container-interview');
    var parentWidth = $(this).width(); // Width of the parent container
    var containerWidth = $imageContainer.width(); // Current width of the image container

    // Check if the container's width is less than 100% of its parent
    if (containerWidth < parentWidth) {
      // Calculate the new width, increase by 10%
      var newWidth = containerWidth + parentWidth * 0.1;

      // Set the new width, but ensure it does not exceed 100% of the parent width
      $imageContainer.width(Math.min(newWidth, parentWidth));
    }
  });
});
