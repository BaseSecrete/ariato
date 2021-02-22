Ariato.ThemeSwitcher = function() {
  Ariato.ThemeSwitcher.initialize()
  this.node.addEventListener("click", this.change.bind(this))
}

Ariato.ThemeSwitcher.initialize = function() {
  if (!this.initialized) {
    console.log("initialize")
    this.initialized = true
    this.update()
  }
}

Ariato.ThemeSwitcher.update = function() {
  var name = localStorage.getItem("ariato-theme")
  document.documentElement.classList.forEach(function(theme) {
    theme.startsWith("theme-") && document.documentElement.classList.remove(theme)
  })
  document.documentElement.classList.add("theme-" + name)

  var buttons = document.querySelectorAll("[data-ariato='ThemeSwitcher']")
  for (var i = 0; i < buttons.length; i++)
    buttons[i].setAttribute("aria-pressed", buttons[i].getAttribute("data-theme") == name)
}

Ariato.ThemeSwitcher.prototype.change = function(event) {
  var name = event.currentTarget.getAttribute("data-theme")
  localStorage.setItem("ariato-theme", name)
  name && Ariato.ThemeSwitcher.update(name)
}