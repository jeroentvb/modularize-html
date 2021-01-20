const pictures = document.querySelectorAll('picture')

for (let i = 0; i < pictures.length; i++) {
  const children = pictures[i].children

  for (let j = 0; j < children.length; j++) {
    if (children[j].srcset && children[j].srcset.includes('.webp')) {
      children[j].remove()
    }
  }
}
