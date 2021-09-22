Ariato = {}

Ariato.launchWhenDomIsReady = function(root) {
  if (document.readyState != "loading") {
    Ariato.launch(root)
    Ariato.launch(root, "aria-roledescription")
    Ariato.launch(root, "data-ariato")
  }
  else
    document.addEventListener("DOMContentLoaded", function() { Ariato.launchWhenDomIsReady(root) } )
}

Ariato.launch = function(root, attribute, parent) {
  attribute || (attribute = "role")
  var elements = (root || document).querySelectorAll("[" + attribute + "]")
  for (var i = 0; i < elements.length; i++)
    Ariato.start(elements[i], attribute, parent)
}

Ariato.mount = function() {
}

Ariato.start = function(element, attribute, parent) {
  var names = element.getAttribute(attribute).split(" ")
  for (var i = 0; i < names.length; i++) {
    var name = names[i].charAt(0).toUpperCase() + names[i].slice(1) // Capitalize
    var func = Ariato.stringToFunction("Ariato." + name) || Ariato.stringToFunction(name)
    if (func instanceof Function)
      Ariato.instanciate(func, element, parent)
  }
}

Ariato.instanciate = function(func, element, parent) {
  try {
    controller = Object.create(func.prototype)
    controller.parent = parent
    controller.node = element
    Ariato.initialize(controller, element)
    func.call(controller, element)
  } catch (ex) {
    console.error(ex)
  }
}

Ariato.stringToFunction = function(fullName) {
  var func = window, names = fullName.split(".")
  for (var i = 0; i < names.length; i++)
    if (!(func = func[names[i]]))
      return null
  return func
}

Ariato.initialize = function(controller, container) {
  Ariato.listenEvents(container, controller)
  Ariato.assignRoles(container, controller)
}

Ariato.listenEvents = function(root, controller) {
  var elements = root.querySelectorAll("[data-event]")
  for (var i = 0; i < elements.length; i++) {
    elements[i].getAttribute("data-event").split(" ").forEach(function(eventAndAction) {
      var array = eventAndAction.split("->")
      Ariato.listenEvent(controller, elements[i], array[0], array[1])
    })
  }
}

Ariato.listenEvent = function(controller, element, event, action) {
  if (controller[action] instanceof Function)
    element.addEventListener(event, controller[action].bind(controller))
}

Ariato.findRoles = function(container) {
  var roles = {}, elements = container.querySelectorAll("[data-role]")
  for (var i = 0; i < elements.length; i++) {
    var name = elements[i].getAttribute("data-role")
    roles[name] ? roles[name].push(elements[i]) : roles[name] = [elements[i]]
  }
  return roles
}

Ariato.assignRoles = function(container, controller) {
  controller.roles = Ariato.findRoles(container)
  for (var name in controller.roles)
    if (controller.roles[name].length == 1)
      controller[name] = controller.roles[name][0]
}
