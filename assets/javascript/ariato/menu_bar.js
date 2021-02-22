Ariato.MenuBar = function() {
  this.node.addEventListener("keydown", this.keyDown.bind(this))
}

// Ariato defines role="menubar" but MenuBar in camel case is nicer
Ariato.Menubar = Ariato.MenuBar

Ariato.Menubar.prototype.keyDown = function(event) {
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault()
      if (event.target.hasAttribute("aria-haspopup"))
        this.openItem(event.target)
      else
        this.focusNextItem(event.target)
      break
    case "ArrowUp":
      event.preventDefault()
      if (event.target.hasAttribute("aria-haspopup"))
        this.openItem(event.target)
      else
        this.focusPreviousItem(event.target)
      break
    case "ArrowRight":
      // Open parent next menu
      // Open child menu
      // Focus next item
      this.openNextMenu(event.target)
      break
      if (event.target.hasAttribute("aria-haspopup"))
        this.openItem(event.target)
      else
        this.openNextMenu(this.findParentMenu(event.target))
    case "ArrowLeft":
      this.openPreviousMenu(event.target)
      break
    case "Escape":
      this.closeAllExcept()
      break
  }
}

Ariato.Menubar.prototype.closeAllExcept = function(item) {
  var menus = this.node.querySelectorAll("[role=menu]")
  for (var i = 0; i < menus.length; i++)
    menus[i].style.display = menus[i].contains(item) ? "block" : null
}

Ariato.Menubar.prototype.openItem = function(item) {
  var menu = item.parentElement.querySelector("[role=menu]")
  item.setAttribute("aria-expanded", true)
  var subItem = menu.querySelector("[role=menuitem]")
  if (subItem) {
    this.closeAllExcept(subItem)
    subItem.focus()
  } else {
    this.closeAllExcept(item)
    item.focus()
  }
}

Ariato.Menubar.prototype.openNextMenu = function(item) {
  var menu = this.findNextMenu(item)
  menu && this.openItem(menu.parentElement.querySelector("[role=menuitem]"))
}

Ariato.Menubar.prototype.openPreviousMenu = function(item) {
  var menu = this.findPreviousMenu(item)
  menu && this.openItem(menu.parentElement.querySelector("[role=menuitem]"))
}

Ariato.Menubar.prototype.focusNextItem = function(item) {
  var nextItem = this.findNextItem(item)
  nextItem && nextItem.focus()
}

Ariato.Menubar.prototype.focusPreviousItem = function(item) {
  var previousItem = this.findPreviousItem(item)
  previousItem && previousItem.focus()
}

Ariato.Menubar.prototype.findParentMenu = function(item) {
  var parent = item.parentElement
  var menuRoles = ["menu", "menubar"]
  while (parent && !menuRoles.includes(parent.getAttribute("role")))
    parent = parent.parentElement
  return parent
}

Ariato.Menubar.prototype.findNextItem = function(item) {
  var menu = this.findParentMenu(item)
  var items = menu.querySelectorAll("[role=menuitem]")
  for (var i = 0; i < items.length; i++)
    if (items[i] == item)
      return items[i+1]
}

Ariato.Menubar.prototype.findPreviousItem = function(item) {
  var menu = this.findParentMenu(item)
  var items = menu.querySelectorAll("[role=menuitem]")
  for (var i = 0; i < items.length; i++)
    if (items[i] == item)
      return items[i-1]
}

Ariato.Menubar.prototype.findNextMenu = function(item) {
  var menus = this.rootMenus()
  for (var i = 0; i < menus.length; i++)
    if (menus[i].contains(item))
      return menus[i+1]

  var parent = item.parentElement
  for (var i = 0; i < menus.length; i++)
    if (parent.contains(menus[i]))
      return menus[i+1]
}

Ariato.Menubar.prototype.findPreviousMenu = function(item) {
  var menus = this.rootMenus()
  for (var i = 0; i < menus.length; i++)
    if (menus[i].contains(item))
      return menus[i-1]

  var parent = item.parentElement
  for (var i = 0; i < menus.length; i++)
    if (parent.contains(menus[i]))
      return menus[i-1]
}

Ariato.Menubar.prototype.rootMenus = function() {
  return this.node.querySelectorAll("li > [role=menu]")
}
