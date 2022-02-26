function selectOption(selected) {
    selected.children[0].style.border = "3px solid #404EED"
    let figures = selected.parentElement.children
    for (let i of figures) {
        if (i != selected) {
            i.children[0].style.border = "0.1px solid #C4C4C4"
        }
    }
}