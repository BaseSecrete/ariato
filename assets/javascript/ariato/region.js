/*
 * A region is a role="region" element which represents a panel of an accordion.
 * It is controlled by a button.
 */
Ariato.Region = function(node) {
  this.node = node
  var labelledBy = this.labelledBy()
  
  if (!labelledBy)
    return

  this.accordion = Ariato.Accordion.addRegion(this)
  labelledBy.addEventListener("click", this.buttonClicked.bind(this))
}

Ariato.Region.prototype.labelledBy = function() {
  return document.getElementById(this.node.getAttribute("aria-labelledby"))
}

Ariato.Region.prototype.buttonClicked = function(event) {
  this.accordion.showRegion(this)
}

Ariato.Region.prototype.show = function(event) {
  this.labelledBy().setAttribute("aria-expanded", true)
  this.node.removeAttribute("hidden")
}

Ariato.Region.prototype.hide = function(event) {
  this.labelledBy().setAttribute("aria-expanded", false)
  this.node.setAttribute("hidden", "")
}

Ariato.Region.prototype.expanded = function() {
  return !this.node.hasAttribute("hidden")
}
