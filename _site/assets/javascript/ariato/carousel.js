Ariato.Carousel = function() {
  this.currentSlide() || this.showSlide(this.slides()[0])
  this.node.addEventListener("keydown", this.keydown.bind(this))

  var nextButton = this.node.querySelector("[data-carousel=next]")
  nextButton && nextButton.addEventListener("click", this.clicked.bind(this))

  var previousButton = this.node.querySelector("[data-carousel=previous]")
  previousButton.addEventListener("click", this.clicked.bind(this))
}

Ariato.Carousel.prototype.slides = function() {
  return this.node.querySelectorAll("[aria-roledescription=slide]")
}

Ariato.Carousel.prototype.currentSlide = function() {
  return this.node.querySelector("[aria-current=slide]")
}

Ariato.Carousel.prototype.showSlide = function(slide) {
  var slides = this.slides()

  for (var i = 0; i < slides.length; i++)
    if (slides[i] == slide)
      slides[i].setAttribute("aria-current", "slide")
    else
      slides[i].removeAttribute("aria-current")
}

Ariato.Carousel.prototype.nextSlide = function(slide) {
  var slides = this.slides()
  this.currentSlide()
  for (var i = 0; i < slides.length; i++) {
    if (slides[i] == slide)
      slides[i].setAttribute("aria-current", "slide")
    else
      slides[i].removeAttribute("aria-current")
  }
}

Ariato.Carousel.prototype.nextSlide = function(slide) {
  var current = this.currentSlide()
  return current && current.nextElementSibling
}

Ariato.Carousel.prototype.previousSlide = function(slide) {
  var current = this.currentSlide()
  return current && current.previousElementSibling
}

Ariato.Carousel.prototype.keydown = function(event) {
  switch(event.key) {
    case "ArrowLeft":
      this.showSlide(this.previousOrLastSlide())
      break
    case "ArrowRight":
      this.showSlide(this.nextOrFirstSlide())
      break
  }
}

Ariato.Carousel.prototype.clicked = function(event) {
  switch(event.currentTarget.getAttribute("data-carousel")) {
    case "next":
      this.showSlide(this.previousOrLastSlide())
      break
    case "previous":
      this.showSlide(this.nextOrFirstSlide())
      break
  }
}

Ariato.Carousel.prototype.previousOrLastSlide = function(event) {
  var slide = this.previousSlide()
  if (slide)
    return slide
  else {
    var slides = this.slides()
    return slides[slides.length-1]
  }
}

Ariato.Carousel.prototype.nextOrFirstSlide = function(event) {
  var slide = this.nextSlide()
  if (slide)
    return slide
  else {
    var slides = this.slides()
    return slides[0]
  }
}
