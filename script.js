const CONTAINER = document.querySelector(".parallax");

const generateHandler =
  (element, proximity, cb) =>
  ({ x, y }) => {
    const bounds = 100;
    const elementBounds = element.getBoundingClientRect();
    const centerX = elementBounds.left + elementBounds.width / 2;
    const centerY = elementBounds.top + elementBounds.height / 2;
    const boundX = gsap.utils.mapRange(
      centerX - proximity,
      centerX + proximity,
      -bounds,
      bounds,
      x
    );
    const boundY = gsap.utils.mapRange(
      centerY - proximity,
      centerY + proximity,
      -bounds,
      bounds,
      y
    );
    cb(boundX / 100, boundY / 100);
  };

const UPDATE = (x, y) => {
  CONTAINER.style.setProperty(
    "--ratio-x",
    Math.floor(gsap.utils.clamp(-60, 60, x * 100))
  );
  CONTAINER.style.setProperty(
    "--ratio-y",
    Math.floor(gsap.utils.clamp(-60, 60, y * 100))
  );
};

document.addEventListener(
  "pointermove",
  generateHandler(CONTAINER, window.innerWidth * 0.5, UPDATE)
);

/////////////////////////////
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};
