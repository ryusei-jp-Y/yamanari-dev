(() => {
  const navs = document.querySelectorAll("[data-orbit-nav]");

  navs.forEach((nav) => {
    const state = nav.querySelector(".c-orbitNav_state");
    const toggle = nav.querySelector(".c-orbitNav_toggle");

    if (!state || !toggle) {
      return;
    }

    let clickOpen = false;
    const canHover = globalThis.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? false;

    const openMenu = ({ hover = false, clicked = false } = {}) => {
      if (clicked) {
        clickOpen = true;
      }

      if (hover) {
        nav.dataset.hoverOpen = "true";
      }

      nav.dataset.menuOpen = "true";
      state.checked = true;
    };

    const closeMenu = () => {
      clickOpen = false;
      delete nav.dataset.hoverOpen;
      delete nav.dataset.menuOpen;
      state.checked = false;
    };

    const openOnHover = (event) => {
      if (!canHover || event?.pointerType === "touch") {
        return;
      }

      openMenu({ hover: true });
    };

    const closeOnLeave = () => {
      delete nav.dataset.hoverOpen;

      if (!clickOpen) {
        delete nav.dataset.menuOpen;
        state.checked = false;
      }
    };

    toggle.addEventListener("pointerenter", openOnHover);
    toggle.addEventListener("mouseenter", openOnHover);
    toggle.addEventListener("mouseover", openOnHover);
    toggle.addEventListener("mousemove", openOnHover);
    nav.addEventListener("pointerleave", closeOnLeave);
    nav.addEventListener("mouseleave", closeOnLeave);

    state.addEventListener("change", () => {
      clickOpen = state.checked;

      if (state.checked) {
        nav.dataset.menuOpen = "true";
        return;
      }

      closeMenu();
    });
  });
})();
