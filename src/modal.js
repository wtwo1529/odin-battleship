class Modal {
  constructor(div, playAgain) {
    this._show = this._show.bind(this);
    this._close = this._close.bind(this);

    this.htmlElement = div;
    this.button = this.htmlElement.querySelector(".play-again-btn");

    this.setBtn(this.button, playAgain);
    this._close();
  }
  _show(title) {
    console.log(this.htmlElement.show);
    const h1 = this.htmlElement.querySelector("h1");
    h1.innerText = `${title}`;
    this.htmlElement.showModal();
  }
  _close() {
    console.log(this.htmlElement);
    this.htmlElement.close();
  }
  setBtn(btn, cb) {
    btn.addEventListener("click", (e) => {
      cb();
      this._close();
    });
  }
}

export default Modal;
