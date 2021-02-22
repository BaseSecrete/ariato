Ariato.Dialog = function(node) {
  node.setAttribute("hidden", true)
  node.addEventListener("open", this.open.bind(this))
  node.addEventListener("close", this.close.bind(this))
  node.addEventListener("keydown", this.keydown.bind(this))
}

Ariato.Dialog.open = function(elementOrId) {
  var dialog = elementOrId instanceof Element ? elementOrId : document.getElementById(elementOrId)
  dialog && dialog.dispatchEvent(new CustomEvent("open"))
}

Ariato.Dialog.close = function(button) {
  var dialog = Ariato.Dialog.current()
  if (dialog && dialog.node.contains(button))
    dialog.close()
}

Ariato.Dialog.closeCurrent = function() {
  var dialog = Ariato.Dialog.current()
  dialog && dialog.close()
}

Ariato.Dialog.replace = function(elementOrId) {
  Ariato.Dialog.closeCurrent()
  Ariato.Dialog.open(elementOrId)
}

Ariato.Dialog.close = function(button) {
  var dialog = Ariato.Dialog.current()
  if (dialog && dialog.node.contains(button))
    dialog.close()
}

Ariato.Dialog.list = []

Ariato.Dialog.current = function() {
  return this.list[this.list.length - 1]
}

Ariato.Dialog.prototype.open = function(event) {
  Ariato.Dialog.list.push(this)
  document.addEventListener("focus", this.bindedLimitFocusScope = this.limitFocusScope.bind(this), true)
  this.initiator = document.activeElement
  this.node.removeAttribute("hidden")

  this.lockScrolling()
  this.createBackdrop()
  this.createFocusStoppers()
  this.focusFirstDescendant(this.node)
}

Ariato.Dialog.prototype.close = function(event) {
  document.removeEventListener("focus", this.bindedLimitFocusScope, true)
  this.node.setAttribute("hidden", true)
  this.removeFocusStoppers()
  this.removeBackdrop()
  this.unlockScrolling()
  this.initiator.focus()
  Ariato.Dialog.list.pop()
}

Ariato.Dialog.prototype.keydown = function(event) {
  if (event.key == "Escape")
    this.close()
}

Ariato.Dialog.prototype.focusFirstDescendant = function(parent) {
  var focusable = ["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"]

  for (var i = 0; i < parent.children.length; i++) {
    var child = parent.children[i]
    if (focusable.indexOf(child.nodeName) != -1 && !child.disabled && child.type != "hidden") {
      child.focus()
      return child
    }
    else {
      var focus = this.focusFirstDescendant(child)
      if (focus) return focus
    }
  }
}

Ariato.Dialog.prototype.limitFocusScope = function(event) {
  if (this == Ariato.Dialog.current())
    if (!this.node.contains(event.target))
      this.focusFirstDescendant(this.node)
}

Ariato.Dialog.prototype.lockScrolling = function() {
  document.body.style.position = "fixed";
  document.body.style.top = "-" + window.scrollY + "px";
}

Ariato.Dialog.prototype.unlockScrolling = function() {
  var scrollY = document.body.style.top
  document.body.style.position = ""
  document.body.style.top = ""
  window.scrollTo(0, parseInt(scrollY || "0") * -1)
}

Ariato.Dialog.prototype.createFocusStoppers = function() {
  this.node.parentNode.insertBefore(this.focusStopper1 = document.createElement("div"), this.node)
  this.focusStopper1.tabIndex = 0

  this.node.parentNode.insertBefore(this.focusStopper2 = document.createElement("div"), this.node.nextSibling)
  this.focusStopper2.tabIndex = 0
}

Ariato.Dialog.prototype.removeFocusStoppers = function() {
  this.focusStopper1 && this.focusStopper1.parentNode.removeChild(this.focusStopper1)
  this.focusStopper2 && this.focusStopper2.parentNode.removeChild(this.focusStopper2)
}

Ariato.Dialog.prototype.createBackdrop = function() {
  this.backdrop = document.createElement("div")
  this.backdrop.classList.add("dialog-backdrop")
  this.node.parentNode.insertBefore(this.backdrop, this.node)
  this.backdrop.appendChild(this.node)
}

Ariato.Dialog.prototype.removeBackdrop = function() {
  this.backdrop.parentNode.insertBefore(this.node, this.backdrop)
  this.backdrop.parentNode.removeChild(this.backdrop)
  this.backdrop = null
}

Ariato.Alertdialog = Ariato.Dialog
