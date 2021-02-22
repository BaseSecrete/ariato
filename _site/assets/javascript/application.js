function escapeCodeExamples() {
  var codes = document.querySelectorAll("[data-code-example]")
  for (var i = 0; i < codes.length; i++) {
    var preview = document.getElementById(codes[i].getAttribute("data-code-example"))
    codes[i].innerHTML = new Option(preview.innerHTML.replace(/\n    /g, "\n").replace(/^\n/, "").replace(/\n$/, "")).innerHTML
    Prism.highlightElement(codes[i])
  }
}

if (document.readyState != "loading")
  escapeCodeExamples()
else
  document.addEventListener("DOMContentLoaded", escapeCodeExamples)

Ariato.Application = {}

Ariato.Application.Toolbar = function(node) {
  this.updateGuideLines()
}

Ariato.Application.Toolbar.prototype.toggleGuideLines = function() {
  if (localStorage.getItem("guidelines"))
    localStorage.removeItem("guidelines")
  else
    localStorage.setItem("guidelines", true)

  this.updateGuideLines()
}

Ariato.Application.Toolbar.prototype.updateGuideLines = function() {
  var styleguide = document.getElementById("styleguide")
  if (localStorage.getItem("guidelines")) {
    this.guideLinesToggler.setAttribute("aria-pressed", true)
    styleguide.classList.add("guidelines")
  }
  else {
    this.guideLinesToggler.removeAttribute("aria-pressed")
    styleguide.classList.remove("guidelines")
  }
}

Ariato.launchWhenDomIsReady()
