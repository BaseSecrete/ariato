Ariato.Accordion = function(node) {
  this.node = node
  node.ariaAccordion = this
  this.regions = []
}

Ariato.Accordion.addRegion = function(region) {
  var button = region.labelledBy()

  if (!button)
    return

  var accordion = region.node.parentElement.ariaAccordion || new Ariato.Accordion(region.node.parentElement)
  accordion.addRegion(region)
  return accordion
}

Ariato.Accordion.prototype.addRegion = function(region) {
  this.regions.push(region)
}

Ariato.Accordion.prototype.hideRegions = function() {
  for (var i = 0; i < this.regions.length; i++)
    this.regions[i].hide()
}

Ariato.Accordion.prototype.showRegion = function(region) {
  if (this.mutilpleAllowed())
    region.expanded() ? region.hide() : region.show()
  else {
    this.hideRegions()
    region.show()
  }
}

Ariato.Accordion.prototype.mutilpleAllowed = function() {
  return this.node.hasAttribute("data-allow-multiple")
}
