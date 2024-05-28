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

document.addEventListener('DOMContentLoaded', function () {
    let lastItem; // Variable to keep track of the last item in the list

    // Function to fetch and display noise data
    function fetchAndDisplayNoiseData() {
        const url = './noise-index.json'; // Path to the noise-index.json file

        fetch(url) // Fetch the JSON file
            .then(response => {
                if (!response.ok) { // Check if the response is OK and throw an error if not
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();  // Parse the JSON data
            })
            .then(data => createNoiseDivs(data)) // Process and display the data
            .catch(error => console.error('Error fetching or parsing the data:', error));
    }

    // Function to create and append div elements for each type of noise
    function createNoiseDivs(noiseData) {
        const container = document.getElementById('noise-container'); // Find the container where you want to add the new divs

        noiseData.Sheet1.forEach(noise => { // Iterate over each noise type in the Sheet1 array
            const noiseDiv = createNoiseDiv(noise);
            container.appendChild(noiseDiv); // Append the created div to the container
            lastItem = noiseDiv; // Update the last item
        });
    }

    function loadMoreItems() {
        // Fetch more noise data and append it to the list
        const url = './noise-index.json'; // Path to the noise-index.json file

        fetch(url) // Fetch the JSON file
            .then(response => {
                if (!response.ok) { // Check if the response is OK and throw an error if not
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();  // Parse the JSON data
            })
            .then(data => {
                // Process and append the new data
                data.Sheet1.forEach(noise => {
                    const noiseDiv = createNoiseDiv(noise);
                    lastItem.parentNode.insertBefore(noiseDiv, lastItem.nextSibling); // Append after the last item
                    lastItem = noiseDiv; // Update the last item
                });
            })
            .catch(error => console.error('Error fetching or parsing the data:', error));
    }

    // Function to create and append div elements for each type of noise
    function createNoiseDiv(noise) {
        const noiseDiv = document.createElement('div');
        noiseDiv.className = 'noise-info noise-div'; // Add the new class here

        const leftDiv = document.createElement('div');
        leftDiv.className = 'grid-left';
        noiseDiv.appendChild(leftDiv);

        const noiseTitle = createNoiseTitle(noise);
        leftDiv.appendChild(noiseTitle);

        const noiseDescription = createNoiseDescription(noise);
        noiseDescription.forEach(desc => leftDiv.appendChild(desc));

        let imageDiv;
        if (noise['Image']) {
            imageDiv = createImageDiv(noise);
            document.getElementById('image-container').appendChild(imageDiv);
        }

        const imageDescriptionDivs = createImageDescriptionDivs(noise);
        const imageDescriptionTitleDiv = createImageDescriptionTitleDiv();
        if (imageDiv) {
            imageDiv.appendChild(imageDescriptionTitleDiv);
            imageDescriptionDivs.forEach(div => imageDiv.appendChild(div));
        }
        noiseTitle.addEventListener('mouseover', function () {
            toggleVisibility(noiseDescription, imageDescriptionTitleDiv, imageDescriptionDivs, imageDiv, noiseTitle);
        });
        noiseTitle.addEventListener('click', function () {
            toggleVisibility(noiseDescription, imageDescriptionTitleDiv, imageDescriptionDivs, imageDiv, noiseTitle);
        });

        return noiseDiv;
    }

    function createNoiseTitle(noise) {
        const noiseTitle = document.createElement('div');
        noiseTitle.textContent = noise['Type of Noise'];
        noiseTitle.className = 'noise-title'; // Add a class for styling
        return noiseTitle;
    }

    function createNoiseDescription(noise) {
        // Splitting the description at each "\r" to create separate divs
        return noise['Description'].split('\r').map(part => {
            const partDiv = document.createElement('div');
            partDiv.textContent = part.trim();
            partDiv.className = 'noise-description-part'; // Style each part as a noise-description-part
            partDiv.style.display = 'none'; // Initially hide the description
            return partDiv;
        });
    }

    function createImageDescriptionDivs(noise) {
        const imageDescriptionParts = noise['Image Description'].split('\r');
        const imageDescriptionDivs = [];
        imageDescriptionParts.forEach(part => {
            const imageDescriptionDiv = document.createElement('div');
            imageDescriptionDiv.textContent = part;
            imageDescriptionDiv.className = 'image-description-index'; // Add a class for styling
            imageDescriptionDiv.style.display = 'none'; // Initially hide the image description
            imageDescriptionDivs.push(imageDescriptionDiv);
        });
        return imageDescriptionDivs;
    }

    function createImageDescriptionTitleDiv() {
        const imageDescriptionTitleDiv = document.createElement('div');
        imageDescriptionTitleDiv.textContent = '↑';
        imageDescriptionTitleDiv.className = 'image-description-index'; // Use the same class as the image descriptions
        imageDescriptionTitleDiv.style.display = 'none'; // Initially hide the image description title
        return imageDescriptionTitleDiv;
    }

    function createImageDiv(noise) {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'noise-images';
        imageDiv.style.display = 'none'; // Initially hide the images
        imageDiv.style.position = 'fixed'; // Position the images on the right side of the screen

        noise['Image'].split(',').forEach(imageName => { // Split the image names and create an img element for each
            const imageWrapper = document.createElement('div'); // Create a div for each image
            imageWrapper.className = 'image-wrapper'; // Add a class for styling if needed

            const image = document.createElement('img');
            image.src = `media/index-images/${imageName.trim()}.png`; // Adjust the path if necessary
            image.alt = noise['Type of Noise'] + ' image';
            image.className = 'noise-image';

            imageWrapper.appendChild(image); // Append the image to its wrapper
            imageDiv.appendChild(imageWrapper); // Append the wrapper to the imageDiv
        });

        return imageDiv;
    }

    function toggleVisibility(noiseDescription, imageDescriptionTitleDiv, imageDescriptionDivs, imageDiv, noiseTitle) {
        const allDescriptions = document.querySelectorAll('.noise-description-part, .noise-description');
        const allImageDescriptions = document.querySelectorAll('.image-description-index');
        const allImages = document.querySelectorAll('.noise-images');
        const allTitles = document.querySelectorAll('.noise-title');
        allDescriptions.forEach(desc => desc.style.display = 'none');
        allImageDescriptions.forEach(desc => desc.style.display = 'none');
        allImages.forEach(img => img.style.display = 'none');
        allTitles.forEach(title => title.style.color = ''); // Reset the color of all titles

        const isHidden = noiseDescription[0].style.display === 'none';
        noiseDescription.forEach(desc => desc.style.display = isHidden ? 'block' : 'none');
        imageDescriptionTitleDiv.style.display = isHidden ? 'block' : 'none'; // Show/hide the image description title
        imageDescriptionDivs.forEach(div => div.style.display = isHidden ? 'block' : 'none');
        imageDiv.style.display = isHidden ? 'flex' : 'none';
        noiseTitle.style.color = isHidden ? '#4376BB' : ''; // Change the color when description is visible
    }

    fetchAndDisplayNoiseData(); // Initial fetch and display

    // Create a sentinel at the bottom of the list
    const sentinel = document.createElement('div');
    document.body.appendChild(sentinel);

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        // If the sentinel is in the viewport, load more items
        if (entries[0].isIntersecting) {
            loadMoreItems();
        }
    }, { rootMargin: '0px', threshold: 1.0 });

    // Start observing the sentinel
    observer.observe(sentinel);

// Create a new Intersection Observer for the noise divs
const noiseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // If the div is in the viewport, trigger the toggleVisibility function
            const noiseTitle = entry.target.querySelector('.noise-title');
            const noiseDescription = Array.from(entry.target.querySelectorAll('.noise-description-part'));
            const imageDiv = document.querySelector('.noise-images');
            const imageDescriptionTitleDiv = imageDiv.querySelector('.image-description-index');
            const imageDescriptionDivs = Array.from(imageDiv.querySelectorAll('.image-description-index'));
            toggleVisibility(noiseDescription, imageDescriptionTitleDiv, imageDescriptionDivs, imageDiv, noiseTitle);
        }
    });
}, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

// Start observing the noise divs
document.querySelectorAll('.noise-div').forEach(div => noiseObserver.observe(div));
});