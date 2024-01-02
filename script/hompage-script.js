const apiKey = "GN3fBk50uO/Bo4r+mFcxFA==q2Wkb58IWKjctbbi";

const button = $(".btn");
const container = $(".container-quote");

// Initialize the array to store user input objects
var userInputArray = JSON.parse(localStorage.getItem("userInputArray")) || [];

// Function to fetch and display a quote
function fetchAndDisplayQuote() {
  fetch("https://api.api-ninjas.com/v1/quotes?category=inspirational", {
    headers: {
      "X-Api-Key": apiKey,
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(function (data) {
      // Assuming the API response has a 'results' property
      // Creating the element
      var headerEL = $("<div>");
      var h2El = $("<h2>");
      var pEl = $("<p>");
      var citeEl = $("<cite>");
      const divEl = $("<div>");

      // adding the attributes or class
      headerEL.addClass("card-header");
      h2El.addClass("blockquote mb-3 text-center");
      pEl.addClass("blockquote-footer mb-3 text-center");
      container.addClass("shadow");

      // Adding text
      headerEL.text(data[0].category);
      h2El.text(data[0].quote);
      citeEl.text(data[0].author);

      // Append to the respective element
      pEl.append(citeEl);
      container.append(divEl);
      divEl.append(h2El);
      divEl.append(pEl);
    })
    .catch((error) => console.error("Error fetching or parsing data:", error));
}

// Setting an interval for auto-reload (e.g., every 1 min =  60 * 1000)
var time = 60 * 1000;
var reloadInterval = setInterval(autoReload, time);

// Auto-reload function
function autoReload() {
  // It will empty the container prior to adding the new quote
  container.empty();
  // Fetch and display a new quote
  fetchAndDisplayQuote();
}
$(document).ready(function () {
  autoReload();
});

//checking for the valid url see line 95
function isValidUrl(url) {
  // Regular expression for a simple URL validation
  const urlPattern =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  return urlPattern.test(url);
}

// Function to handle form submission
function submitForm() {
  var isEmpty = false;

  // Capturing the latest value of the input after clicking the submit button
  const positionValue = $("#position").val();
  const companyValue = $("#company-name").val();
  const locationValue = $("#job-location").val();
  const postingValue = $("#job-posting").val();
  const jobStageValue = $("#job-stage").val();
  const jobTypeValue = $("#job-type").val();

  // Checking if any of the form fields are empty
  $(".form-control").each(function () {
    if ($(this).val().trim() === "") {
      isEmpty = true;
      return false; // This will exit the loop if any input field is empty
    }
  });

  // if (isEmpty || jobStageValue === "default" || jobTypeValue === "default" || !isValidUrl(positionValue)) {
  if (
    isEmpty ||
    jobStageValue === "default" ||
    jobTypeValue === "default" ||
    !isValidUrl(postingValue)
  ) {
    $("#myModal").modal("show");
    closeBtn();
  } else {
    // Create an object representing the user input
    const userInputObject = {
      position: positionValue,
      company: companyValue,
      location: locationValue,
      posting: postingValue,
      jobStage: jobStageValue,
      jobType: jobTypeValue,
    };

    // Add the user input object to the array
    userInputArray.push(userInputObject);

    // Update localStorage with the new userInputArray
    localStorage.setItem("userInputArray", JSON.stringify(userInputArray));

    // Show the success alert modal
    $("#mySuccessModal").modal("show");
    closeBtn();

    // Clear form inputs
    $(".form-control").val("");

    // Reset the selection option to default values
    $("#job-stage").prop("selectedIndex", 0);
    $("#job-type").prop("selectedIndex", 0);
  }
}

// Event handler for key press
$(".form-control").on("keydown", function (event) {
  if (event.key === "Enter") {
    // event.preventDefault();
    submitForm();
    displayOnPage();
    console.log(userInputArray);
  }
});

// Event handler for submit button
$("#submit-button").on("click", function () {
  submitForm();
  displayOnPage();

  console.log(userInputArray);
});

// Event listener for the clear button
$("#clear-button").on("click", function () {
  // Clear all the input fields
  $(".form-control").val("");
  // Reset the selection option to default values
  $("#job-stage").prop("selectedIndex", 0);
  $("#job-type").prop("selectedIndex", 0);
});

// Function for closeBtn
function closeBtn() {
  // Event handler for modal close button click
  $(".btn-secondary").on("click", function () {
    $("#myModal").modal("hide");
    $("#mySuccessModal").modal("hide");
  });
}

// Function to display the current submitted info on the page
function displayOnPage() {
  if (userInputArray.length > 0) {
    // Display the most recent user input
    const lastIndex = userInputArray.length - 1;

    // Mapping of icons to form input fields
    const iconMap = {
      position: '<i class="fa-solid fa-clipboard-user" id="position-icon"></i>',
      company: '<i class="fa-regular fa-building"></i>',
      location: '<i class="fa-solid fa-map-location-dot"></i>',
      // posting: '<i class="fa-solid fa-signs-post"></i>',
      jobStage: '<i class="fa-solid fa-stairs"></i>',
      jobType: '<i class="fa-solid fa-briefcase"></i>',
    };

    // Displaying the user input with icons

    // clear the existing content
    $("#position-title").empty();

    // adding the new content
    $("#position-title").append(
      `${iconMap.position} Position: ${userInputArray[lastIndex].position}`
    );
    // for readiblilty the above code can be writtten as below without using backticks (`). (`) backticks sign are use to create template literals, which provide a convenient way to concatenate strings and variables in a readable and flexible manner.

    // $("#position-title").append(iconMap.position + "Position: " + userInputArray[lastIndex].position);

    $("#company-title").empty();
    $("#company-title").append(
      `${iconMap.company} Company Name: ${userInputArray[lastIndex].company}`
    );

    $("#location-title").empty();
    $("#location-title").append(
      `${iconMap.location} Job Location: ${userInputArray[lastIndex].location}`
    );
    // $("#posting-title").append(
    //   `${iconMap.posting} Posting: ${userInputArray[lastIndex].posting}`
    // );

    $("#job-stage-title").empty();
    $("#job-stage-title").append(
      `${iconMap.jobStage} Job Stage: ${userInputArray[lastIndex].jobStage}`
    );
    $("#job-type-title").empty();
    $("#job-type-title").append(
      `${iconMap.jobType} Job Type: ${userInputArray[lastIndex].jobType}`
    );
    $("#job-posting-btn").attr("href", userInputArray[lastIndex].posting);
    $("#job-posting-btn").attr("target", "_blank");

    // reset the card
  }
  $("#reset-card-btn").on("click", function () {
    $("#position-title").empty();
    $("#position-title").append(`${iconMap.position} Position:`);

    $("#company-title").empty();
    $("#company-title").append(`${iconMap.company} Company Name:`);

    $("#location-title").empty();
    $("#location-title").append(`${iconMap.location} Job Location: `);

    $("#job-stage-title").empty();
    $("#job-stage-title").append(`${iconMap.jobStage} Job Stage: `);

    $("#job-type-title").empty();
    $("#job-type-title").append(`${iconMap.jobType} Job Type:`);

    $("#job-posting-btn").attr("href", "");
  });

  // the below code will later

  // $("#position-title").text("Position: " + userInputArray[lastIndex].position);
  // $("#company-title").text("Company: " + userInputArray[lastIndex].company);
  // $("#location-title").text("Location: " + userInputArray[lastIndex].location);
  // $("#posting-title").text("Posting: " + userInputArray[lastIndex].posting);
  // $("#job-stage-title").text("JobStage: " + userInputArray[lastIndex].jobStage);
  // $("#job-type-title").text("JobType: " + userInputArray[lastIndex].jobType);
}

// Add event listener to dashboard button to redirect to dashboard
let dashboardButton = $("#btn-dashboard");
console.log(dashboardButton);
console.log('click to go to homepage');

dashboardButton.on("click", function () {
  // Redirect the user to the 'dashboard.html' page
  location.href = "./dashboard.html"
});
