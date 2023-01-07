class Modal {

    constructor(modalSelector, showButtonSelector, closeButtonSelector) {
        this.modal = document.querySelector(modalSelector);
        this.showButton = document.querySelector(showButtonSelector);
        this.closeButton = document.querySelector(closeButtonSelector);

        this.handleShowButtonClick = this.handleShowButtonClick.bind(this);
        this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);

        this.showButton.addEventListener("click", this.handleShowButtonClick);
        this.closeButton.addEventListener("click", this.handleCloseButtonClick);
    }

    handleShowButtonClick(event) {
        event.preventDefault();
        this.modal.style.display = "block";
    }

    handleCloseButtonClick(event) {
        event.preventDefault();
        this.modal.style.display = "none";
    }

    removeShowCloseListeners() {
        this.showButton.removeEventListener("click", this.handleShowButtonClick);
        this.closeButton.removeEventListener("click", this.handleCloseButtonClick);
    }

}

class DoctorVisitModal extends Modal {

    constructor(onModalFormSubmit) {
        super("#new-visit-form", "#btn_create_visit", "#close_new_visit");

        this.onModalFormSubmit = onModalFormSubmit;

        this.form = this.modal.querySelector("form");
        this.doctorSelect = this.modal.querySelector("#doctor-type-select");
        this.optionalInputs = this.modal.querySelector(".optional-inputs");

        this.changeDoctorType = this.changeDoctorType.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleShowButtonClick(event) {
        super.handleShowButtonClick(event);
        this.doctorSelect.addEventListener("change", this.changeDoctorType);
        this.form.addEventListener("submit", this.handleFormSubmit);
    }

    handleCloseButtonClick(event) {
        super.handleCloseButtonClick(event);
        this.doctorSelect.removeEventListener("change", this.changeDoctorType);
        this.form.removeEventListener("submit", this.handleFormSubmit);
        this.setCardiologInputs();
        this.doctorSelect.value = "cardiolog";
    }

    handleFormSubmit(event) {
        console.log(event);
        const data = event;
        this.onModalFormSubmit(data);
    }

    changeDoctorType(event) {
        const nextDoctorType = event.target.value;
        switch (nextDoctorType) {
            case "cardiolog":
                this.setCardiologInputs();
                break;
            case "stomatolog":
                this.setStomatologInputs();
                break;
            case "terapevt":
                this.setTerapevtInputs();
                break;
            default:
                console.error("unknown doctor type", nextDoctorType);
        }
    }

    setCardiologInputs() {
        this.optionalInputs.innerHTML = `
            <div class="col">
                <input type="number" class="form-control" placeholder="Вік">
            </div>
            <div class="col">
                <input type="number" class="form-control" placeholder="Звичайний тиск">
            </div>
            <div class="col">
                <input type="number" class="form-control" placeholder="Індекс маси тіла">
            </div>
            <div class="col">
                <textarea type="text" class="form-control" placeholder="Змінні захворювання серцево-судинної системи"></textarea>
            </div>
        `;
    }

    setStomatologInputs() {
        this.optionalInputs.innerHTML = `
            <div class="col">
                <input type="date" class="form-control" placeholder="Дата останнього відвідування">
            </div>
        `;
    }

    setTerapevtInputs() {
        this.optionalInputs.innerHTML = `
            <div class="col">
                <input type="number" class="form-control" placeholder="Вік">
            </div>
        `;
    }

}

class Card {

    constructor(cardData) {
        this.cardData = cardData;
        this.card = document.createElement("div");
        this.card.classList.add("main-section__card");
    }

    render(container) {
        this.card.innerHTML = `
            <div>top block</div>
            <div>
                <div>name</div>
                <div>doctor name</div>
            </div>
        `;
        container.append(this.card);
    }

    remove() {
        this.card.remove();
    }

}

class CardsController {

    constructor() {
        this.cards = [];
        this.cardsContainer = document.querySelector(".main-section__cards-container");

        this.doctorVisitModal = new DoctorVisitModal();
    }

    addNewCard(newCardData) {
        const card = new Card(newCardData);
        card.render(this.cardsContainer);
        this.cards.push(card);
    }

}

window.cardsController = new CardsController();
