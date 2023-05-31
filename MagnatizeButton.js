class MagnatizedButton {
  /**
   *
   * @param {{
   * element: Element,
   * senstivity: number
   * }} options
   */
  constructor({ element, senstivity = 0.3 }) {
    this.senstivity = senstivity;
    this.element = element;
    this.pointerLoc = {
      x: 0,
      y: 0,
    };
    const style = getComputedStyle(this.element);
    const translation = style.translate.split(" ").map((item) => parseFloat(item.replace(/[^\d\.]*/g, "")));

    this.initialTranslation = {
      x: isNaN(translation[0]) ? 0 : translation[0],
      y: isNaN(translation[1]) ? 0 : translation[1],
    };
    this.hover = false;

    this.#init();
  }

  #init() {
    window.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      this.pointerLoc.x = e.clientX;
      this.pointerLoc.y = e.clientY;
    });

    this.element.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "touch") return;

      this.hover = true;
    });

    this.element.addEventListener("pointerleave", () => {
      this.hover = false;
      const transformString = `${this.initialTranslation.x}px ${this.initialTranslation.y}px`;

      this.element.style.translate = transformString;
    });

    this.#animate();
  }

  #animate() {
    if (this.hover) {
      // Calculate center position of button
      const rect = this.element.getBoundingClientRect();
      const elementCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      // Calculate distance between cursor and center
      const delta = {
        x: this.pointerLoc.x - elementCenter.x,
        y: this.pointerLoc.y - elementCenter.y,
      };

      // const distance = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2));
      const newTranslation = {
        x: this.initialTranslation.x + delta.x * this.senstivity,
        y: this.initialTranslation.y + delta.y * this.senstivity,
      };
      const translate = `${newTranslation.x}px ${newTranslation.y}px`;

      this.element.style.translate = translate;
    }
    requestAnimationFrame(() => this.#animate());
  }
}
export default MagnatizedButton;
