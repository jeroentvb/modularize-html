const pictures = document.querySelectorAll('picture')

for (let i = 0; i < pictures.length; i++) {
  pictures[i].children[0].remove()
}
