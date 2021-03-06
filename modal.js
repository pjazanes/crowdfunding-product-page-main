const INTRODUCTION_SECTION = document.querySelector(".introduction-section"),
  BACK_THIS_PROJECT_BTN =
    INTRODUCTION_SECTION.querySelector(".back-this-project"),
  BOOKMARK_CONTAINER = INTRODUCTION_SECTION.querySelector(
    ".bookmark-this-container"
  ),
  BOOKMARK_IMG = BOOKMARK_CONTAINER.querySelector("img"),
  BOOKMARK_TEXT = BOOKMARK_CONTAINER.querySelector(".bookmark-text"),
  ABOUT_SECTION = document.querySelector(".about-section"),
  PLEDGE_BTN_LIST = ABOUT_SECTION.querySelectorAll(
    ".about-section-card-button"
  ),
  MODAL_PROJECT = document.querySelector(".modal.project"),
  CLOSE_MODAL_PROJECT = MODAL_PROJECT.querySelector(".close-modal"),
  MODAL_CARD_RADIO_LIST = MODAL_PROJECT.querySelectorAll(
    ".modal-content-card-select"
  ),
  PLEDGE_SUBMIT_LIST = MODAL_PROJECT.querySelectorAll(".pledge-submit"),
  MODAL_SUCCESS = document.querySelector(".modal.success"),
  MODAL_SUCCESS_BTN = MODAL_SUCCESS.querySelector(".success-button"),
  MAIN_HEADER = document.querySelector(".main-header"),
  MAIN_NAV_BTN = MAIN_HEADER.querySelector(".main-nav-button"),
  MAIN_NAV_BTN_ICON = MAIN_NAV_BTN.querySelector("img"),
  MOBILE_NAV = MAIN_HEADER.querySelector(".mobile-nav-container");

let lastSelect = "";

function paintModalSuccess() {
  MODAL_PROJECT.classList.remove("showing-modal");
  MODAL_SUCCESS.classList.add("showing-modal");
  topFunction();
  MODAL_SUCCESS_BTN.addEventListener("click", handleCloseModal);
}

function handleSubmit() {
  paintModalSuccess();
}

function removePledgeSection(node) {
  const CONTAINER = node.closest(".modal-content-card-container");
  const PLEDGE_SECTION = CONTAINER.querySelector(
    ".modal-content-pledge-container"
  );
  PLEDGE_SECTION.classList.remove("showing");
}

function showPledgeSection(node) {
  const CONTAINER = node.closest(".modal-content-card-container");
  const PLEDGE_SECTION = CONTAINER.querySelector(
    ".modal-content-pledge-container"
  );
  PLEDGE_SECTION.classList.add("showing");
}

function styleUnselectedPledge(node) {
  node
    .closest(".modal-content-card-container")
    .classList.remove("selected-card");
}

function styleSelectedPledge(node) {
  node.closest(".modal-content-card-container").classList.add("selected-card");
}

function handleRadio(event) {
  const RADIO = event.target;
  if (RADIO.checked === true) {
    styleSelectedPledge(RADIO);
    showPledgeSection(RADIO);
    if (lastSelect !== "") {
      //remove selected card style
      styleUnselectedPledge(lastSelect);
      removePledgeSection(lastSelect);
    }
    lastSelect = RADIO; //store most recent selected node
  }
}

function styleSelectedPledgeById(btnId) {
  switch (true) {
    case btnId === "bamboo-pledge-btn":
      MODAL_PROJECT.querySelector("#bamboo-select").checked = true;
      styleSelectedPledge(MODAL_PROJECT.querySelector("#bamboo-select"));
      showPledgeSection(MODAL_PROJECT.querySelector("#bamboo-select"));
      lastSelect = MODAL_PROJECT.querySelector("#bamboo-select");
      break;
    case btnId === "black-edition-pledge-btn":
      MODAL_PROJECT.querySelector("#black-edition-select").checked = true;
      styleSelectedPledge(MODAL_PROJECT.querySelector("#black-edition-select"));
      showPledgeSection(MODAL_PROJECT.querySelector("#black-edition-select"));
      lastSelect = MODAL_PROJECT.querySelector("#black-edition-select");
      break;
    default:
      break;
  }
}

function pledgeSubmitEventListener(nodeList) {
  for (let node of nodeList) {
    node.addEventListener("click", handleSubmit);
  }
}

function modalCardRadioEventListener(nodeList) {
  for (let node of nodeList) {
    node.addEventListener("change", handleRadio);
  }
}

function handleCloseModal(event) {
  const currentCloseBtn = event.target;
  const currentlyOpenedModal = currentCloseBtn.closest(".modal");
  currentlyOpenedModal.classList.remove("showing-modal");
}

function modalContentEventListeners() {
  CLOSE_MODAL_PROJECT.addEventListener("click", handleCloseModal);
  modalCardRadioEventListener(MODAL_CARD_RADIO_LIST);
  pledgeSubmitEventListener(PLEDGE_SUBMIT_LIST);
}

function resetModalContentStyle(nodeList) {
  for (let node of nodeList) {
    node.checked = false;
    styleUnselectedPledge(node);
    removePledgeSection(node);
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function paintModal(ABOUT_BTN) {
  topFunction();
  resetModalContentStyle(MODAL_CARD_RADIO_LIST);
  modalContentEventListeners();
  MODAL_PROJECT.classList.add("showing-modal");
  styleSelectedPledgeById(ABOUT_BTN.id);
}

function handleSelectReward(event) {
  const BUTTON = event.target;
  paintModal(BUTTON);
}

function pledgeSelectRewardBtnEventListener(nodeList) {
  for (let node of nodeList) {
    node.addEventListener("click", handleSelectReward);
  }
}

function unstyleBookmarkContainer() {
  BOOKMARK_TEXT.style.color = "initial";
  BOOKMARK_TEXT.innerText = "Bookmark";
  BOOKMARK_IMG.src = "images/icon-bookmark.svg";
}

function styleBookmarkContainer() {
  BOOKMARK_TEXT.style.color = "var(--cyan-dark)";
  BOOKMARK_TEXT.innerText = "Bookmarked";
  BOOKMARK_IMG.src = "images/icon-bookmarked.svg";
}

function handleClickBookmark() {
  if (BOOKMARK_TEXT.innerText !== "Bookmarked") {
    styleBookmarkContainer();
  } else {
    unstyleBookmarkContainer();
  }
}

function handleClickProject() {
  paintModal(BACK_THIS_PROJECT_BTN);
}

function setIconToClose() {
  MAIN_NAV_BTN_ICON.src = "images/icon-close-menu.svg";
}

function setIconToHamburger() {
  MAIN_NAV_BTN_ICON.src = "images/icon-hamburger.svg";
}

function removeClassListOpened(...nodes){
  nodes.forEach(node => {
    node.classList.remove("opened");
  });
}

function addClassListOpened(...nodes){
 nodes.forEach(node => {
   node.classList.add("opened");
 });
}

function removeLinearGradientToMainNav() {
  MAIN_HEADER.style.backgroundImage = "unset";
}

function addLinearGradientToMainNav() {
  MAIN_HEADER.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0))";
}

function handleClickMainNav() {
  if (MAIN_NAV_BTN.classList.contains("opened")) {
    setIconToHamburger();
    removeLinearGradientToMainNav();
    removeClassListOpened(MAIN_NAV_BTN, MOBILE_NAV);
  } else {
    setIconToClose();
    addLinearGradientToMainNav();
    addClassListOpened(MAIN_NAV_BTN, MOBILE_NAV);
  }
}

function init() {
  MAIN_NAV_BTN.addEventListener("click", handleClickMainNav);
  BACK_THIS_PROJECT_BTN.addEventListener("click", handleClickProject);
  BOOKMARK_CONTAINER.addEventListener("click", handleClickBookmark);
  pledgeSelectRewardBtnEventListener(PLEDGE_BTN_LIST);
}

init();
