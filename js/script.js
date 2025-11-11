document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tab_content"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContents() {
    tabsContent.forEach((tab) => {
      tab.classList.remove("show");
      tab.classList.add("hide");
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
        }
      });
    }
  });

  hideTabContents();
  showContent();
});
