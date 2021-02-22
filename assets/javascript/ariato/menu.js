Ariato.Menu = function(node) {
  var button = this.labelledBy()
  button && new Ariato.MenuButton(button)
}

Ariato.Menu.prototype.labelledBy = function() {
  return document.getElementById(this.node.getAttribute("aria-labelledby"))
}
