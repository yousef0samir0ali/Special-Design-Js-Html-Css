//Local Storage For Remot Colors
const mainColors = localStorage.getItem("colors-option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");
    if (ele.dataset.color === mainColors) {
      ele.classList.add("active");
    }
  });
}

// Toggle Spin Class On Icon And toggle Class Open On Setting Box
document.querySelector(".toggle-setting .fa").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".setting-box").classList.toggle("open");
};

//Change Color And Class Active
const colorList = document.querySelectorAll(".colors-list li");
colorList.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
    localStorage.setItem("colors-option", e.target.dataset.color);
    handleActive(e);
  });
});

// Change Background Image And Save Random Backgrounds In LocalStorage
let landingPage = document.querySelector(".landing-page");
let imageArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];
let optionInterval = true;
let mainInterval;
let localInterval = localStorage.getItem("local-intervla");
if (localInterval !== null) {
  document.querySelectorAll(".random-background button").forEach((but) => {
    but.classList.remove("active");
  });
  if (localInterval === "yes") {
    optionInterval = true;
    document.querySelector(".yes").classList.add("active");
  } else {
    optionInterval = false;
    document.querySelector(".no").classList.add("active");
  }
}
function interval() {
  mainInterval = setInterval(() => {
    let randomNumber = Math.floor(Math.random() * imageArray.length);
    landingPage.style.backgroundImage = `url(images/${imageArray[randomNumber]})`;
    // 'url(images/"' + imageArray[randomNumber] + '")'
  }, 1000);
}
if (optionInterval === true) {
  interval();
}

//Change Class Active From Random background
let randomBackgrund = document.querySelectorAll(".random-background button");
randomBackgrund.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.control === "yes") {
      optionInterval = true;
      interval();
      localStorage.setItem("local-intervla", e.target.dataset.control);
    } else {
      optionInterval = false;
      clearInterval(mainInterval);
      localStorage.setItem("local-intervla", e.target.dataset.control);
    }
  });
});

// Create Animation Skills Progress
let sectionSkills = document.querySelector(".skills");
window.onscroll = function () {
  let skillOffsetTop = sectionSkills.offsetTop;
  let skillOuterHeight = sectionSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.scrollY;

  if (windowScrollTop > skillOffsetTop - 300) {
    // windowScrollTop > skillOffsetTop + skillOuterHeight - windowHeight;
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    allSkills.forEach((prog) => {
      prog.style.width = prog.dataset.progress;
    });
  }
};

// Create Popup With The Image
let allImage = document.querySelectorAll(".gallery img");
allImage.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overLay = document.createElement("div");
    overLay.className = "popup-overlay";
    document.body.appendChild(overLay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      let imageHeading = document.createElement("h3");
      let imageText = document.createTextNode(img.alt);
      imageHeading.appendChild(imageText);
      popupBox.appendChild(imageHeading);
    }
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    // Create The Close Span
    let closeButton = document.createElement("span");
    closeButton.className = "close-button";
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    popupBox.appendChild(closeButton);
  });
});

// close popupBox
document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// beahavioral smooth to section from bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");
function scrollToSomeWhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

//Handel Active State
function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  event.target.classList.add("active");
}

//Show Or Hide Bullet Nav
let bullesControl = document.querySelectorAll(".option-box .bullets-option button");

bullesControl.forEach((bull) => {
  bull.addEventListener("click", (e) => {
    if (e.target.dataset.display === "yes") {
      document.querySelector(".nav-bullets").style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      document.querySelector(".nav-bullets").style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    handleActive(e);
  });
});
let localBullet = localStorage.getItem("bullets-option");
if (localBullet !== null) {
  bullesControl.forEach((bull) => {
    bull.classList.remove("active");
  });
  if (localBullet === "block") {
    document.querySelector(".nav-bullets").style.display = "block";
    document.querySelector(".option-box .bullets-option button.yes").classList.add("active");
  } else {
    document.querySelector(".nav-bullets").style.display = "none";
    document.querySelector(".option-box .bullets-option button.no").classList.add("active");
  }
}

//Reset Option
document.querySelector(".reset-option").onclick = function () {
  localStorage.clear();
  window.location.reload();
};

//Menu Bar
let menuBar = document.querySelector(".header-area .menu");
let linksBar = document.querySelector(".header-area .links");
menuBar.onclick = function (e) {
  this.classList.toggle("menu-active");
  linksBar.classList.toggle("open");
  e.stopPropagation();
};
document.onclick = function (e) {
  if (e.target !== linksBar && e.target !== menuBar) {
    if (linksBar.classList.contains("open")) {
      linksBar.classList.remove("open");
      menuBar.classList.remove("menu-active");
    }
  }
};
linksBar.onclick = function (e) {
  e.stopPropagation();
};
