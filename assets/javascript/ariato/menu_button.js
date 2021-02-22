Ariato.MenuButton = function(node) {
  this.node = this.button = node
  this.menu = document.getElementById(this.button.getAttribute("aria-controls"))

  this.menu.addEventListener("keydown", this.keydown.bind(this))
  this.button.addEventListener("keydown", this.keydown.bind(this))
  
  this.button.addEventListener("click", this.clicked.bind(this))
  window.addEventListener("click", this.windowClicked.bind(this), true)
}

Ariato.MenuButton.prototype.clicked = function(event) {
  this.node.getAttribute("aria-expanded") == "true" ? this.close() :  this.open()
}

Ariato.MenuButton.prototype.windowClicked = function() {
  if (!this.node.contains(event.target) && this.node.getAttribute("aria-expanded") == "true")
    this.close()
}

Ariato.MenuButton.prototype.open = function() {
  this.button.setAttribute("aria-expanded", "true")
  this.menu.style.display = "block"
}

Ariato.MenuButton.prototype.close = function() {
  this.button.setAttribute("aria-expanded", "false")
  this.menu.style.display = null
}

Ariato.MenuButton.prototype.keydown = function(event) {
  switch(event.key) {
    case "Escape":
      this.close()
      break
    case "ArrowDown":
      event.preventDefault()
      this.focusNextItem()
      break
    case "ArrowUp":
      event.preventDefault()
      this.focusPreviousItem()
      break
    case "Tab":
      this.close()
    case "Home":
    case "PageUp":
      event.preventDefault()
      this.items()[0].focus()
      break
    case "End":
    case "PageDown":
      event.preventDefault()
      var items = this.items()
      items[items.length-1].focus()
      break
  }
}

Ariato.MenuButton.prototype.items = function() {
  return this.menu.querySelectorAll("[role=menuitem]")
}

Ariato.MenuButton.prototype.currentItem = function() {
  return this.menu.querySelector("[role=menuitem]:focus")
}

Ariato.MenuButton.prototype.nextItem = function() {
  var items = this.items()
  var current = this.currentItem()
  if (!current) return items[0]
  for (var i = 0; i < items.length; i++) {
    if (items[i] == current)
      return items[i+1]
  }
}

Ariato.MenuButton.prototype.previousItem = function() {
  var items = this.items()
  var current = this.currentItem()
  if (!current) return items[0]
  for (var i = 0; i < items.length; i++) {
    if (items[i] == current)
      return items[i-1]
  }
}

Ariato.MenuButton.prototype.focusNextItem = function() {
  var item = this.nextItem()
  item && item.focus()
}

Ariato.MenuButton.prototype.focusPreviousItem = function() {
  var item = this.previousItem()
  item && item.focus()
}
