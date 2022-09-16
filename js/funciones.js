class jquery {
  constructor(prueba) {
    this.id = prueba;
  }
  addClass(nombre) {
    return document.querySelector(this.id).classList.add(nombre);
  }
  removeClass(nombre) {
    return document.querySelector(this.id).classList.remove(nombre);
  }
  on(evento, element, callback) {
    if (evento === "click") {
      document.onclick = function () {
        return this.body
          .querySelector(element)
          .addEventListener("click", callback);
      };
    }
    if (evento === "change") {
      document.onchange = function () {
        return this.body
          .querySelector(element)
          .addEventListener("change", callback);
      };
    }
  }
  click(callback){
    return document.querySelector(this.id).addEventListener("click", callback);
  }
  val(valor = 0) {
    if (valor == 0) {
      return document.querySelector(this.id).value;
    } else {
      return (document.querySelector(this.id).value = valor);
    }
  }
  attr(name, valor = 0) {
    if (valor == 0) {
      return document.querySelector(this.id).getAttribute(name);
    } else {
      return document.querySelector(this.id).setAttribute(name, valor);
    }
  }
  removeAttr(name) {
    return document.querySelector(this.id).removeAttribute(name);
  }
  submit(callback) {
    return document.querySelector(this.id).addEventListener("submit", callback);
  }
}
function $(params) {
  return new jquery(params);
}
