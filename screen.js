// Extract venue name and show time

const showTime = document.querySelector('#movinfo') ? document.querySelector('#movinfo').textContent.trim() : 'Unknown Show Time';

// Print venue name and show time at the top
console.log(`Venue Name: ${strVenueName}`);
console.log(`Show Time: ${showTime}`);


// Initialize overall totals for all categories
let overallAvailableSeats = 0;
let overallBlockedSeats = 0;
let overallBlockedGross = 0;
let overallAvailableGross = 0;
let overallTotalGross = 0;

// Get all rows of the table
const rows = document.querySelectorAll('tr');
let currentPrice = '';
let currentCategory = '';
let currentBlockRows = 0;
let currentBlockSeatInfo = [];  // Array to store the count of div elements with class _available or _blocked in each row of the block

let categoryBlockedGross = 0;
let categoryAvailableGross = 0;
let categoryTotalGross = 0;
let categoryBlockedSeats = 0;
let categoryAvailableSeats = 0;

rows.forEach(row => {
  // Check if this row contains the price information
  const priceCell = row.querySelector('td.PriceB1 .seatP');
  if (priceCell) {
    // If we have found a new price row, log the previous block info (if applicable)
    if (currentBlockRows > 0) {
      //console.log(`Category: ${currentCategory}`);
      //console.log(`  Blocked seats: ${categoryBlockedSeats}, Available seats: ${categoryAvailableSeats}, Total seats: ${categoryBlockedSeats + categoryAvailableSeats}`);
      //console.log(`  Blocked gross: Rs. ${categoryBlockedGross}, Available gross: Rs. ${categoryAvailableGross}, Total gross: Rs. ${categoryTotalGross}`);
      
      // Add category sums to overall totals
      overallBlockedSeats += categoryBlockedSeats;
      overallAvailableSeats += categoryAvailableSeats;
      overallBlockedGross += categoryBlockedGross;
      overallAvailableGross += categoryAvailableGross;
      overallTotalGross += categoryTotalGross;
      
      // Reset category-level totals for the next category
      categoryBlockedGross = 0;
      categoryAvailableGross = 0;
      categoryTotalGross = 0;
      categoryBlockedSeats = 0;
      categoryAvailableSeats = 0;
    }

    // Extract the price and category from the seatP div
    const text = priceCell.textContent.trim();
    const regex = /Rs\. (\d+) (.+)/;  // Matches pattern "Rs. [PRICE] [CATEGORY]"
    const match = text.match(regex);

    if (match) {
      currentPrice = parseInt(match[1]);  // Ensure the price is a number
      currentCategory = match[2];
    } else {
      currentPrice = 200;  // Default price as a number
      currentCategory = text;  // The entire text is the category
    }

    // Reset the row count and seat info array for the new block
    currentBlockRows = 0;
    currentBlockSeatInfo = [];
  } else {
    // If we are inside a category block, increase the row count
    currentBlockRows++;

    // Check if the row contains the td with class SRow1
    const seatTd = row.querySelector('td.SRow1');

    if (seatTd) {
      // Count div elements with class _available and _blocked within the SRow1 td
      const availableSeats = seatTd.querySelectorAll('div.seatI > a._available').length;
      const blockedSeats = seatTd.querySelectorAll('div.seatI > a._blocked').length;

      // Store the counts in the current block's seat info array
      currentBlockSeatInfo.push({
        available: availableSeats,
        blocked: blockedSeats
      });

      // Calculate and accumulate gross values for the category
      const blockedGross = currentPrice * blockedSeats;
      const availableGross = currentPrice * availableSeats;
      const totalGross = currentPrice * (blockedSeats + availableSeats);
      
      // Accumulate seat counts and grosses
      categoryBlockedSeats += blockedSeats;
      categoryAvailableSeats += availableSeats;
      categoryBlockedGross += blockedGross;
      categoryAvailableGross += availableGross;
      categoryTotalGross += totalGross;
    }
  }
});

// Log the last block info after the loop ends
if (currentBlockRows > 0) {
  //console.log(`Category: ${currentCategory}`);
  //console.log(`  Blocked seats: ${categoryBlockedSeats}, Available seats: ${categoryAvailableSeats}, Total seats: ${categoryBlockedSeats + categoryAvailableSeats}`);
  //console.log(`  Blocked gross: Rs. ${categoryBlockedGross}, Available gross: Rs. ${categoryAvailableGross}, Total gross: Rs. ${categoryTotalGross}`);
  
  // Add category sums to overall totals
  overallBlockedSeats += categoryBlockedSeats;
  overallAvailableSeats += categoryAvailableSeats;
  overallBlockedGross += categoryBlockedGross;
  overallAvailableGross += categoryAvailableGross;
  overallTotalGross += categoryTotalGross;
}

// Final overall totals
console.log(`\nOverall Results:`);
console.log(`  Total Blocked Seats: ${overallBlockedSeats}`);
console.log(`  Total Available Seats: ${overallAvailableSeats}`);
console.log(`  Total Seats: ${overallBlockedSeats + overallAvailableSeats}`);
console.log(`  Overall Blocked Gross: Rs. ${overallBlockedGross}`);
console.log(`  Overall Available Gross: Rs. ${overallAvailableGross}`);
console.log(`  Overall Total Gross: Rs. ${overallTotalGross}`);