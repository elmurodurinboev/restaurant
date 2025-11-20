document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tab_content"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContents() {
    tabsContent.forEach((tab) => {
      tab.classList.remove("show");
      tab.classList.add("hide", "fade");
    });

    tabs.forEach((tabBtn) => {
      tabBtn.classList.remove("tabheader__item_active");
    });
  }

  function showContent(index = 0) {
    tabsContent[index].classList.remove("hide");
    tabsContent[index].classList.add("show", "fade");
    tabs[index].classList.add("tabheader__item_active");
  }

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("tabheader__item")) {
      tabs.forEach((tab, index) => {
        if (tab === target) {
          hideTabContents();
          showContent(index);
        }
      });
    }
  });

  hideTabContents();
  showContent();

  // Loader

  const loaderWrapper = document.querySelector(".loader--wrapper");

  setTimeout(() => {
    loaderWrapper.style.display = "none";
  }, 1500);

  // For Timer

  const deadline = "2025-12-31";

  function getTimeRemaining(endTime) {
    let days, hours, minutes, seconds;
    const time = Date.parse(endTime) - Date.parse(new Date()); //millisecund

    if (time < 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(time / (1000 * 60 * 60 * 24));
      hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((time / (1000 * 60)) % 60);
      seconds = Math.floor((time / 1000) % 60);
    }

    return {
      totalTime: time,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function formatNumber(number) {
    if (number < 10) {
      return `0${number}`;
    }
    return number;
  }

  function setTime(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      const time = getTimeRemaining(endTime);

      days.textContent = formatNumber(time.days);
      hours.textContent = formatNumber(time.hours);
      minutes.textContent = formatNumber(time.minutes);
      seconds.textContent = formatNumber(time.seconds);

      if (time.totalTime <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setTime(".timer", deadline);

  // Modal
  const openModalBtns = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalContent = document.querySelector(".modal__content"),
    closeModalBtn = document.querySelector(".modal__close");

  function openModal() {
    modalContent.classList.remove("close_modal_fade");
    modalContent.classList.add("modal_fade");
    modal.classList.remove("hide");
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
    clearTimeout(modaleTimerId);
  }

  function closeModal() {
    modalContent.classList.remove("modal_fade");
    modalContent.classList.add("close_modal_fade");
    setTimeout(() => {
      modal.classList.remove("show");
      modal.classList.add("hide");
      document.body.style.overflow = "";
    }, 200);
  }

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  closeModalBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
  const modaleTimerId = setTimeout(openModal, 5000);
});
