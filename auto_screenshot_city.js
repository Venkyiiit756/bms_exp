// Function to click all available showtime buttons for specific dates and venues
function clickAllShowtimeButtons() {
  // Select all elements with the class .showtime-pill-container._available
  const buttons = document.querySelectorAll('.showtime-pill-container._available .showtime-pill');

  // Iterate over each button and click it
  buttons.forEach((button, index) => {
    setTimeout(() => {
      // Click the button
      button.click();

      // Handle popup if present and fetch new date and venue after the click
      setTimeout(() => {
        // Fetch the strVenName and strDate dynamically after clicking the button
        let venueName = document.getElementById('strVenName').innerText.trim().replace(/[\W_]+/g, "_");
        let showDate = document.getElementById('strDate').innerText.trim();

        // Replace 'Today' with 'st' in the date string
        if (showDate.includes('Today')) {
          showDate = showDate.replace('Today', 'st').trim();
        }

        // Make the date file-friendly by replacing special characters
        showDate = showDate.replace(/[\W_]+/g, "_");

        // Get the current date and time in India (IST)
        const currentDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(/[\W_]+/g, "_");

        // Handle popup if present
        const popupClose = document.querySelector('.popup-close');
        if (popupClose) {
          popupClose.click();
        }

        // Take screenshot after handling the popup and fetching the new date and venue
        html2canvas(document.body, {
          onrendered: function(canvas) {
            // Convert the canvas to an image and download it
            var link = document.createElement('a');
            link.href = canvas.toDataURL("image/png");

            // Create a unique file name using venue, show date, and current date and time
            const fileName = `${venueName}_${showDate}_${currentDate}_screenshot_${index}.png`;

            link.download = fileName;
            link.click();
          }
        });
      }, 2000);  // Adjust the delay for popup handling and fetching new data
    }, index * 3000); // Space out the clicks to allow page interaction, adjust as needed
  });
}

// Inject html2canvas script
var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js';
document.head.appendChild(script);

// Once the script is loaded, call the function to click all buttons
script.onload = clickAllShowtimeButtons;
