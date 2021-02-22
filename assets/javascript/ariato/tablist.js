Ariato.Tablist = function(node) {
  this.node = node
  var tabs = this.tabs()
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", this.click.bind(this))
    tabs[i].addEventListener("keydown", this.keydown.bind(this))
    tabs[i].addEventListener("keyup", this.keyup.bind(this))
  }
  tabs[0] && this.showTab(tabs[0])
}

Ariato.Tablist.prototype.click = function(event) {
  this.showTab(event.currentTarget)
}

Ariato.Tablist.prototype.tabs = function() {
  return this.node.querySelectorAll("[role=tab]")
}

Ariato.Tablist.prototype.activeTab = function() {
  return this.node.querySelector("[aria-selected=true]")
}

Ariato.Tablist.prototype.panels = function() {
  var tabs = this.tabs(), result = []
  for (var i = 0; i < tabs.length; i++)
    result.push(document.getElementById(tabs[i].getAttribute("aria-controls")))
  return result
}

Ariato.Tablist.prototype.showTab = function(tab) {
  this.hidePanels()
  tab.removeAttribute("tabindex")
  tab.setAttribute("aria-selected", "true")
  document.getElementById(tab.getAttribute("aria-controls")).style.display = null
  tab.focus()
}

Ariato.Tablist.prototype.hidePanels = function() {
  var tabs = this.tabs()
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].setAttribute("tabindex", "-1");
    tabs[i].setAttribute("aria-selected", "false");
  }

  var panels = this.panels()
  for (var i = 0; i < panels.length; i++)
    panels[i].style.display = "none"
}

Ariato.Tablist.prototype.keydown = function(event) {
  switch (event.key) {
    case "End":
      var tabs = this.tabs()
      event.preventDefault()
      this.showTab(this.tabs()[tabs.length - 1])
      break
    case "Home":
      event.preventDefault()
      this.showTab(this.tabs()[0])
      break
    case "ArrowUp":
      event.preventDefault()
      this.showPrevious()
      break
    case "ArrowDown":
      event.preventDefault()
      this.showNext()
      break
  }
}

Ariato.Tablist.prototype.keyup = function(event) {
  if (event.key == "ArrowLeft")
    this.showPrevious()
  else if (event.key == "ArrowRight")
    this.showNext(event)
  // TODO delete
}

Ariato.Tablist.prototype.showNext = function() {
  var tabs = this.tabs()
  var index = Array.prototype.indexOf.call(tabs, this.activeTab())
  tabs[index + 1] && this.showTab(tabs[index + 1])
}

Ariato.Tablist.prototype.showPrevious = function() {
  var tabs = this.tabs()
  var index = Array.prototype.indexOf.call(tabs, this.activeTab())
  tabs[index - 1] && this.showTab(tabs[index - 1])
}
