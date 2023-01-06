const closeNewVisitBtn = document.querySelector("#close_new_visit");
const newVisitForm = document.querySelector("#new_visit_form");
const createVisitBtn = document.querySelector("#btn_create_visit")

closeNewVisitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    newVisitForm.style.display = "none"
})

createVisitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    newVisitForm.style.display = "block"
})

