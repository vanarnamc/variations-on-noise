document.addEventListener("DOMContentLoaded", function() {
  var words = document.querySelectorAll('.word');
  var body = document.querySelector('body');
  var currentWord = 0;

  function cycleWords() {
      // Remove 'visible' class from the current word
      words[currentWord].classList.remove('visible');

      // Increment the word index
      currentWord = (currentWord + 1) % words.length;

      // Add 'visible' class to the new current word
      words[currentWord].classList.add('visible');

      // Toggle the inverted class on the body to change colors
      body.classList.toggle('inverted');
  }

  // Start the cycle with the first word
  words[currentWord].classList.add('visible');

  // Set an interval for how often to cycle words (and change colors)
  setInterval(cycleWords, 550); // Change word every 550 milliseconds
});