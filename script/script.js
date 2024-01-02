// Add event listener to homepage Button to redirect to homepage
let homePageButton = $("#btn-start");

console.log(homePageButton);
console.log('click to go to homepage');

homePageButton.on("click", function (e) {
  e.preventDefault();
  // Redirect the user to the 'homepage.html' page
  if (window.location.hostname === "yuzbamaria.github.io") {
    // Redirect to the GitHub Pages URL
    location.href = "./homepage.html"
    // window.location.href =
      // "https://yuzbamaria.github.io/job_search_tracker/homepage.html";
      // "https://stevecalla.github.io/job_search_tracker/homepage.html";
  } else {
    // Redirect to the local development URL
    location.href = "./homepage.html"
    // window.location.href = "http://127.0.0.1:5501/job_search_tracker/homepage.html";
    // window.location.href = "http://localhost/job_search_tracker/dashboard.html";
  }
});
