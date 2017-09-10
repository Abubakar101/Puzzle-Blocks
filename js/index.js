// In Jquery
const $body = $("body");
const $container = $(".container");
const $block = $("#block");
const $blocks = $(".blocks");
const $empty = $("#twenty");
const $greetings = $(".greetings");
const $nameForm = $(".nameForm");
const $input = $(".nameInput");
const $button = $("#btn");

let first = true;
let firstClickInnerHTML = "";
let secondClickInnerHTML = "";
let firstTarget = "";
let secondTarget = "";
let temp = "";
let gameStarted = true;

shuffleInnerHtml();
//randomizing the innerHTML values......
function shuffleInnerHtml() {
  if (!gameStarted) return;
  for (let i = 0; i < $blocks.length; i++) {
    let random = ~~(Math.random() * $blocks.length);
    let a = $blocks.eq(random),
      b = $blocks.eq(i);
    let tmp = a.html();
    a.html(b.html());
    b.html(tmp);
  }
  gameStarted = false;
}
$body.click(function(e) {
  // Greeting page, call action for buttons "Play", "Instructions" and "About"
  // then with their clicks so the page they want to look at it....
  buttons(e);
  function buttons(e) {
    if (e.target.id === "play") {
      $greetings.css("display", "none");
      $nameForm.css("display", "flex");
    } else if (e.target.id === "instructions") {
      $greetings.css("display", "none");
      const $writtenInstructions = $(".writtenInstructions");
      $writtenInstructions.css("display", "block");
    } else if (e.target.id === "about") {
      $greetings.css("display", "none");
      const $aboutMe = $(".aboutMe");
      $aboutMe.css("display", "block");
    }
  }
  // Saving Input value - Name and appending value into div next to puzzle game.....
  e.preventDefault();
  if ($input.val().length > 1) {
    $(".personName").append($input.val());
    $input.val("");
    $nameForm.css("display", "none");
    $container.css("display", "block");
  }
  // First Click
  if (first) {
    firstTarget = e.target;
    firstClickInnerHTML = e.target.innerHTML;
    secondClickInnerHTML = "";
    e.target.className === "blocks" && (e.target.classList = "clicked");
    first = false;
  } else if (
    (firstClickInnerHTML !== "" || e.target.id !== "twenty") &&
    firstClickInnerHTML != e.target.innerHTML
  ) {
    // Second Click
    secondTarget = e.target;
    secondClickInnerHTML = e.target.innerHTML;
    e.target.className === "blocks" && (firstTarget.classList = "blocks");
    first = true;
    // click values should move next to each other
    if (
      secondClickInnerHTML === "" &&
      (firstTarget.id == Number(secondTarget.id) - 1 ||
        firstTarget.id == Number(secondTarget.id) + 1 ||
        firstTarget.id == Number(secondTarget.id) - 5 ||
        firstTarget.id == Number(secondTarget.id) + 5)
    ) {
      // Swapping Values;
      if (firstClickInnerHTML !== "" && e.target.innerHTML === "") {
        firstTarget.innerHTML = secondClickInnerHTML;
        secondTarget.innerHTML = firstClickInnerHTML;
      }
    }
    firstClickInnerHTML = "";
  }
  // winning conditions - ID has to match with the inner HTML i.e., #1 === 1(innerHTML)...same for all 20 divs
  winner();
  function winner() {
    for (let i = 0; i < $blocks.length - 1; i++) {
      if ($blocks.eq(i).html() != $blocks.eq(i).attr("id")) {
        return false;
      }
    }
    $container.css("display", "none");
    const $data = $(".data");
    $data.css("display", "flex");
  }
});
