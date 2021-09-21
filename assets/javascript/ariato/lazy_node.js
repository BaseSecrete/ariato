Ariato.LazyNode = function() {
  this.observe() || this.load()
}

Ariato.LazyNode.prototype.load = function() {
  var request = new XMLHttpRequest()
  request.open("GET", this.node.getAttribute("data-url"), true)
  request.onerror = this.onError.bind(this)
  request.onload = this.onLoad.bind(this)
  request.send()
}

Ariato.LazyNode.prototype.onLoad = function(event) {
  var request = event.target
  if (request.status >= 200 && request.status < 400) {
    this.node.innerHTML = request.response
    Ariato.launchWhenDomIsReady(this.node)
    this.node.dispatchEvent(new Event("Ariato.LazyNode.success"))
  } else {
    this.node.dispatchEvent(new Event("Ariato.LazyNode.error"))
  }
}

Ariato.LazyNode.prototype.onError = function(event) {
  this.node.dispatchEvent(new Event("Ariato.LazyNode.error"))
}

Ariato.LazyNode.prototype.observe = function(event) {
  if (typeof(IntersectionObserver) == "undefined")
    return null

  var intersection = new IntersectionObserver(function(entries) {
    if (entries[0].intersectionRatio > 0) {
      intersection.unobserve(this.node)
      this.load()
    }
  }.bind(this))
  intersection.observe(this.node)
  return intersection
}
