document.addEventListener('DOMContentLoaded', function() {
    var iframe = document.querySelector(".video-background iframe");
    var player = new Vimeo.Player(iframe);
    var muteText = document.getElementById("muteText");

    window.toggleMute = function() {
        player.getVolume().then(function(volume) {
            if (volume > 0) {
                player.setVolume(0);
                muteText.textContent = "[UNMUTE]";
            } else {
                player.setVolume(1);
                muteText.textContent = "[MUTE]";
            }
        });
    }

    window.toggleMenu = function() {
        var menuOverlay = document.getElementById("menuOverlay");
        if (menuOverlay) {
            if (menuOverlay.style.display === "none" || menuOverlay.style.display === "") {
                menuOverlay.style.display = "block";
            } else {
                menuOverlay.style.display = "none";
            }
        } else {
            console.error("menuOverlay element not found");
        }
    }

    window.toggleSubmenu = function(event) {
        event.preventDefault();

        var submenu = document.getElementById("submenu");
        var arrow = document.getElementById("arrow");

        if (submenu.style.display === "none" || submenu.style.display === "") {
            submenu.style.display = "block";
            arrow.style.transform = "rotate(-90deg)";
        } else {
            submenu.style.display = "none";
            arrow.style.transform = "rotate(0deg)";
        }
    }

    for (let video of document.getElementsByTagName("video")) {
        video.setAttribute("playsinline", "");
        video.setAttribute("muted", "");
        video.play();
    }

    $(document).ready(function() {
        $('.interview-speaker-image').each(function() {
            var $imageContainer = $(this).find('.image-container-interview');
            var parentWidth = $(this).width();
            var containerWidth = $imageContainer.width();

            if (containerWidth < parentWidth) {
                var newWidth = containerWidth + parentWidth * 0.1;
                $imageContainer.width(Math.min(newWidth, parentWidth));
            }
        });
    });
});