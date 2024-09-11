// Function to click all available showtime buttons
function clickAllShowtimeButtons() {
  // Select all elements with the class .showtime-pill-container._available
  const buttons = document.querySelectorAll('.showtime-pill-container._available .showtime-pill');
  
  // Iterate over each button and click it
  buttons.forEach((button, index) => {
    setTimeout(() => {
      // Click the button
      button.click();

      // Handle popup if present
      setTimeout(() => {
        const popupClose = document.querySelector('.popup-close');
        if (popupClose) {
          popupClose.click();
        }

        // Take screenshot after handling the popup
        html2canvas(document.body, {
          onrendered: function(canvas) {
            // Convert the canvas to an image and download it
            var link = document.createElement('a');
            link.href = canvas.toDataURL("image/png");
            link.download = `screenshot_${index}.png`;  // Unique filename for each screenshot
            link.click();
          }
        });
      }, 2000);  // Adjust the delay for popup handling
    }, index * 3000); // Space out the clicks to allow page interaction, adjust as needed
  });
}

// Inject html2canvas script
var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js';
document.head.appendChild(script);

// Once the script is loaded, call the function to click all buttons
script.onload = clickAllShowtimeButtons;
