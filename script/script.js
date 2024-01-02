// Add event listener to homepage Button to redirect to homepage
let homePageButton = $("#btn-start");

console.log(homePageButton);
console.log('click to go to homepage');

homePageButton.on("click", function () {
  // Redirect the user to the 'homepage.html' page
  location.href = "./homepage.html"
});
