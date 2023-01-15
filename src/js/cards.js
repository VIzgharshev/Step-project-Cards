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
        this.addNewVisitBtn = document.querySelector("#add_new_visit_button");
        this.newVisitForm = document.querySelector("#new-visit-form");
        this.doctorSelect = this.modal.querySelector("#doctor-type-select");
        this.optionalInputs = this.modal.querySelector(".optional-inputs");
        this.changeDoctorType = this.changeDoctorType.bind(this);
        this.addNewVisitBtn.addEventListener("click", async () => {
            this.newVisitForm.style.display = "none";
            onModalFormSubmit(await this.sendDataServer());
        });
    }

    handleShowButtonClick(event) {
        super.handleShowButtonClick(event);
        this.doctorSelect.addEventListener("change", this.changeDoctorType);
    }

    handleCloseButtonClick(event) {
        super.handleCloseButtonClick(event);
        this.doctorSelect.removeEventListener("change", this.changeDoctorType);
        this.setCardiologInputs();
        this.doctorSelect.value = "cardiolog";
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
                <input type="number" class="form-control"  id="user-age-cardiolog" placeholder="Вік">
            </div>
            <div class="col">
                <input type="number" class="form-control" id="normal-pressure" placeholder="Звичайний тиск">
            </div>
            <div class="col">
                <input type="number" class="form-control" id="body-mass-index" placeholder="Індекс маси тіла">
            </div>
            <div class="col">
                <textarea type="text" class="form-control" id="cardiovascular-disease" placeholder="Змінні захворювання серцево-судинної системи"></textarea>
            </div>
        `;
    }

    setStomatologInputs() {
        this.optionalInputs.innerHTML = `
            <div class="col">
                <input type="date" class="form-control" id="date-visit" placeholder="Дата останнього відвідування">
            </div>
        `;
    }

    setTerapevtInputs() {
        this.optionalInputs.innerHTML = `
            <div class="col">
                <input type="number" class="form-control" id="user-age-terapevt" placeholder="Вік">
            </div>
        `;
    }

    getDoctorVisitData() {
        switch (this.doctorSelect.value) {
            case "cardiolog":
                return new VisitCardiologist();
            case "stomatolog":
                return new VisitDentist();
            case "terapevt":
                return new VisitTherapist();
        }
    }

    async sendDataServer() {
        let sendCardData = await fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(this.getDoctorVisitData()),
        })
        return await sendCardData.json()
    }
}

class Card {

    constructor(data, onCardDelete) {
        this.cardWrapper = null;
        this.cardContainer = null;
        this.headerNovisit = null;
        this.cardData = data;
        this.id = data.id;
        this.patientName = data.patientName;
        this.doctor = data.doctor;
        this.urgency = data.urgency;
        this.onCardDelete = onCardDelete;
    }

    get urgencyColor() {
        if (this.urgency === "Low") {
            return "#8AE3FF";
        } else if (this.urgency === "Normal") {
            return "#FDFF8A";
        } else if (this.urgency === "High") {
            return "#FF8A98";
        }
    }

    get doctorLabel() {
        if (this.doctor === "cardiolog") {
            return "Кардиолог";
        } else if (this.doctor === "stomatolog") {
            return "Стоматолог";
        } else if (this.doctor === "terapevt") {
            return "Терапевт";
        }
    }

    get patientNameOrPlaceholder() {
        if (this.patientName) {
            return this.patientName;
        }
        return "ім'я пацієнта не вказане";
    }

    addOnDeleteListener() {
        this.cardWrapper.querySelector(".trash-btn").addEventListener("click", async () => {
            let sendData = await fetch(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            })
            if (sendData.status === 200) {
                this.cardWrapper.remove();
            }
            if (!this.cardContainer.firstElementChild) {
                this.headerNovisit.style.display = "block";
            }
            this.onCardDelete();
        })
    }

    addEditingListener() {
        this.cardWrapper.querySelector(".editing-btn").addEventListener("click", () => {
            // ???
        });
    }

    addViewingListener() {
        this.cardWrapper.querySelector(".viewing-btn").addEventListener("click", async () => {
            let modalContainer = document.createElement("div");
            if (this.doctor === "cardiolog") {
                await new VisitCardiologist(this.cardData).showInfoModal(modalContainer)
            } else if (this.doctor === "stomatolog") {
                await new VisitDentist(this.cardData).showInfoModal(modalContainer)
            } else if (this.doctor === "terapevt") {
                await new VisitTherapist(this.cardData).showInfoModal(modalContainer)
            }
        });
    }

    render(container) {
        this.cardContainer = container;
        this.headerNovisit = this.cardContainer.parentNode.querySelector(".main-section__header-novisit");
        this.cardWrapper = document.createElement("div");
        this.cardWrapper.classList.add("main-section__card");
        this.cardWrapper.innerHTML = `
            <div class="main-section__card">
                <div class="main-section__icon-container">
                        <div class="main-section__urgency" style="background-color:${this.urgencyColor};"></div>
                        <div class="main-section__svg-container">
                            <a href="#" class="editing-btn">
                            <svg width="20px" height="20px" viewBox="0 0 20 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 4.97764C20.0007 4.85263 19.9755 4.7287 19.9258 4.61296C19.876 4.49722 19.8027 4.39196 19.71 4.30319L15.47 0.275495C15.3766 0.187455 15.2657 0.117801 15.1439 0.0705279C15.0221 0.0232551 14.8916 -0.000706917 14.76 1.58774e-05C14.6284 -0.000706917 14.4979 0.0232551 14.3761 0.0705279C14.2542 0.117801 14.1434 0.187455 14.05 0.275495L11.22 2.96379L0.290016 13.3465C0.197335 13.4353 0.12401 13.5405 0.0742453 13.6563C0.0244808 13.772 -0.000744177 13.896 1.67143e-05 14.021V18.0487C1.67143e-05 18.3006 0.105373 18.5422 0.292909 18.7204C0.480445 18.8985 0.734799 18.9986 1.00002 18.9986H5.24001C5.37993 19.0058 5.5199 18.985 5.65083 18.9376C5.78175 18.8901 5.90072 18.8171 6.00001 18.7231L16.87 8.34039L19.71 5.69959C19.8013 5.60752 19.8756 5.50156 19.93 5.38611C19.9396 5.31039 19.9396 5.23385 19.93 5.15813C19.9347 5.11391 19.9347 5.06936 19.93 5.02514L20 4.97764ZM4.83001 17.0987H2.00001V14.4104L11.93 4.97764L14.76 7.66594L4.83001 17.0987ZM16.17 6.32654L13.34 3.63824L14.76 2.29884L17.58 4.97764L16.17 6.32654Z"
                                      fill="#307570"/>
                            </svg>
                            </a>
                            <a href="#" class="viewing-btn">
                            <svg width="20px" height="20px" viewBox="0 0 26 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.44444 18C1.03519 18 0.692371 17.856 0.416 17.568C0.138667 17.281 0 16.925 0 16.5C0 16.075 0.138667 15.719 0.416 15.432C0.692371 15.144 1.03519 15 1.44444 15H24.5556C24.9648 15 25.3076 15.144 25.584 15.432C25.8613 15.719 26 16.075 26 16.5C26 16.925 25.8613 17.281 25.584 17.568C25.3076 17.856 24.9648 18 24.5556 18H1.44444ZM1.44444 10.5C1.03519 10.5 0.692371 10.356 0.416 10.068C0.138667 9.781 0 9.425 0 9C0 8.575 0.138667 8.2185 0.416 7.9305C0.692371 7.6435 1.03519 7.5 1.44444 7.5H24.5556C24.9648 7.5 25.3076 7.6435 25.584 7.9305C25.8613 8.2185 26 8.575 26 9C26 9.425 25.8613 9.781 25.584 10.068C25.3076 10.356 24.9648 10.5 24.5556 10.5H1.44444ZM1.44444 3C1.03519 3 0.692371 2.8565 0.416 2.5695C0.138667 2.2815 0 1.925 0 1.5C0 1.075 0.138667 0.7185 0.416 0.4305C0.692371 0.1435 1.03519 0 1.44444 0H24.5556C24.9648 0 25.3076 0.1435 25.584 0.4305C25.8613 0.7185 26 1.075 26 1.5C26 1.925 25.8613 2.2815 25.584 2.5695C25.3076 2.8565 24.9648 3 24.5556 3H1.44444Z"
                                      fill="#307570"/>
                            </svg>
                            </a>
                            <a href="#" class="trash-btn">
                            <svg width="20px" height="20px" viewBox="0 0 18 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.38462 1.26667C1.01739 1.26667 0.66521 1.40012 0.405544 1.63766C0.145879 1.87521 0 2.19739 0 2.53333V3.8C0 4.13594 0.145879 4.45812 0.405544 4.69567C0.66521 4.93321 1.01739 5.06667 1.38462 5.06667H2.07692V16.4667C2.07692 17.1385 2.36868 17.7829 2.88801 18.258C3.40734 18.7331 4.11171 19 4.84615 19H13.1538C13.8883 19 14.5927 18.7331 15.112 18.258C15.6313 17.7829 15.9231 17.1385 15.9231 16.4667V5.06667H16.6154C16.9826 5.06667 17.3348 4.93321 17.5945 4.69567C17.8541 4.45812 18 4.13594 18 3.8V2.53333C18 2.19739 17.8541 1.87521 17.5945 1.63766C17.3348 1.40012 16.9826 1.26667 16.6154 1.26667H11.7692C11.7692 0.930726 11.6234 0.608544 11.3637 0.370998C11.104 0.133452 10.7518 0 10.3846 0L7.61539 0C7.24816 0 6.89598 0.133452 6.63631 0.370998C6.37665 0.608544 6.23077 0.930726 6.23077 1.26667H1.38462ZM5.53846 6.33333C5.72207 6.33333 5.89816 6.40006 6.028 6.51883C6.15783 6.63761 6.23077 6.7987 6.23077 6.96667V15.8333C6.23077 16.0013 6.15783 16.1624 6.028 16.2812C5.89816 16.3999 5.72207 16.4667 5.53846 16.4667C5.35485 16.4667 5.17876 16.3999 5.04893 16.2812C4.91909 16.1624 4.84615 16.0013 4.84615 15.8333V6.96667C4.84615 6.7987 4.91909 6.63761 5.04893 6.51883C5.17876 6.40006 5.35485 6.33333 5.53846 6.33333ZM9 6.33333C9.18361 6.33333 9.3597 6.40006 9.48954 6.51883C9.61937 6.63761 9.69231 6.7987 9.69231 6.96667V15.8333C9.69231 16.0013 9.61937 16.1624 9.48954 16.2812C9.3597 16.3999 9.18361 16.4667 9 16.4667C8.81639 16.4667 8.6403 16.3999 8.51046 16.2812C8.38063 16.1624 8.30769 16.0013 8.30769 15.8333V6.96667C8.30769 6.7987 8.38063 6.63761 8.51046 6.51883C8.6403 6.40006 8.81639 6.33333 9 6.33333ZM13.1538 6.96667V15.8333C13.1538 16.0013 13.0809 16.1624 12.9511 16.2812C12.8212 16.3999 12.6452 16.4667 12.4615 16.4667C12.2779 16.4667 12.1018 16.3999 11.972 16.2812C11.8422 16.1624 11.7692 16.0013 11.7692 15.8333V6.96667C11.7692 6.7987 11.8422 6.63761 11.972 6.51883C12.1018 6.40006 12.2779 6.33333 12.4615 6.33333C12.6452 6.33333 12.8212 6.40006 12.9511 6.51883C13.0809 6.63761 13.1538 6.7987 13.1538 6.96667Z"
                                      fill="#307570"/>
                            </svg>
                            </a>
                        </div>
                    </div>
                    <div class="main-section__card-text-container">
                        <h2 class="main-section__card-name-doctor">
                            Лікар: ${this.doctorLabel}
                        </h2>
                        <p class="main-section__card-name-patient">Пацієнт: ${this.patientNameOrPlaceholder}</p>
                    </div>
            </div>
        `;
        this.cardContainer.append(this.cardWrapper);
        this.addOnDeleteListener();
        this.addEditingListener();
        this.addViewingListener();
        if (this.headerNovisit.style.display === "block") {
            this.headerNovisit.style.display = "none";
        }
    }
}

class Visit {

    constructor(data) {
        if (data) {
            this.title = data.title;
            this.description = data.description;
            this.urgency = data.urgency;
            this.patientName = data.patientName;
        } else {
            this.title = document.querySelector("#visit-propose").value;
            this.description = document.querySelector("#short-text").value;
            this.urgency = document.querySelector("#urgently").value;
            this.patientName = document.querySelector("#patient_name").value;
        }
    }

}

class VisitDentist extends Visit {

    constructor(data) {
        super(data);
        this.doctor = 'stomatolog';
        if (data) {
            this.date = data.date;
        } else {
            this.date = document.querySelector("#date-visit").value;
        }
    }

    showInfoModal(container) {
        container.innerHTML = `
                  <div class="modal-login container-fluid p-0 vh-100 position-fixed top-0 start-0 bg-black bg-opacity-25"
        style="backdrop-filter: blur(3px); overflow: hidden;" id="modal-login">
       <div class="main-section__new-visit container-sm bg-white position-absolute top-50 start-50 translate-middle p-4"
            style="border-radius:10px; width: 40vw; overflow: scroll; max-height: 90%">
           <div class="information_wrapper">
           <h2 class="main-section__see_all-info-header-text">інфорамція візита</h2>
           <div>
               <h5 class="main-section__see-all-inf-header">Лікар: <span class="main-section__see-all-inf-span">Стоматолог</span></h5>
               <h5 class="main-section__see-all-inf-header">ФІО пацієнта: <span class="main-section__see-all-inf-span">${this.patientName}</span></h5>
               <h5 class="main-section__see-all-inf-header">Ціль візита: <span class="main-section__see-all-inf-span">${this.description}</span></h5>
               <h5 class="main-section__see-all-inf-header">Короткі замітки: <span class="main-section__see-all-inf-span">${this.title}</span></h5>
               <h5 class="main-section__see-all-inf-header">Терміновість візита: <span class="main-section__see-all-inf-span">${this.urgency}</span></h5>
               <h5 class="main-section__see-all-inf-header">Вік: <span class="main-section__see-all-inf-span">${this.age}</span></h5>
               <h5 class="main-section__see-all-inf-header">Дата візиту: <span class="main-section__see-all-inf-span">${this.date}</span></h5>
           </div>
           <button type="button" class="modal-login__btn-done btn btn-success" id="close_inform_popup" style="margin-top: 20px">
               ГОТОВО
           </button>
           </div>
       </div>
       </div> `
        container.querySelector("#close_inform_popup").addEventListener("click", () => {
            container.remove()
        })
        document.body.append(container)
    }

}

class VisitCardiologist extends Visit {

    constructor(data) {
        super(data);
        this.doctor = 'cardiolog';
        if (data) {
            this.age = data.age;
            this.normalPressure = data.normalPressure;
            this.bodyMassIndex = data.bodyMassIndex;
            this.cardiovascularDisease = data.cardiovascularDisease;
        } else {
            this.age = document.querySelector("#user-age-cardiolog").value;
            this.normalPressure = document.querySelector("#normal-pressure").value;
            this.bodyMassIndex = document.querySelector("#body-mass-index").value;
            this.cardiovascularDisease = document.querySelector("#cardiovascular-disease").value;
        }
    }

    async showInfoModal(container) {
        container.innerHTML = `
                  <div class="modal-login container-fluid p-0 vh-100 position-fixed top-0 start-0 bg-black bg-opacity-25"
        style="backdrop-filter: blur(3px); overflow: hidden;" id="modal-login">
       <div class="main-section__new-visit container-sm bg-white position-absolute top-50 start-50 translate-middle p-4"
            style="border-radius:10px; width: 40vw; overflow: scroll; max-height: 90%">
           <div class="information_wrapper">
           <h2 class="main-section__see_all-info-header-text">інфорамція візита</h2>
           <div>
               <h5 class="main-section__see-all-inf-header">Лікар: <span class="main-section__see-all-inf-span">Кардиолог</span></h5>
               <h5 class="main-section__see-all-inf-header">ФІО пацієнта: <span class="main-section__see-all-inf-span">${this.patientName}</span></h5>
               <h5 class="main-section__see-all-inf-header">Ціль візита: <span class="main-section__see-all-inf-span">${this.description}</span></h5>
               <h5 class="main-section__see-all-inf-header">Короткі замітки: <span class="main-section__see-all-inf-span">${this.title}</span></h5>
               <h5 class="main-section__see-all-inf-header">Терміновість візита: <span class="main-section__see-all-inf-span">${this.urgency}</span></h5>
               <h5 class="main-section__see-all-inf-header">Вік: <span class="main-section__see-all-inf-span">${this.age}</span></h5>
              <h5 class="main-section__see-all-inf-header">Звичайний тиск: <span class="main-section__see-all-inf-span">${this.normalPressure}</span></h5>
               <h5 class="main-section__see-all-inf-header">Індекс маси тіла: <span class="main-section__see-all-inf-span">${this.bodyMassIndex}</span></h5>
               <h5 class="main-section__see-all-inf-header">Змінні захворювання серцево-судинної системи: <span class="main-section__see-all-inf-span">${this.cardiovascularDisease}</span></h5>
           </div>
           <button type="button" class="modal-login__btn-done btn btn-success" id="close_inform_popup" style="margin-top: 20px">
               ГОТОВО
           </button>
           </div>
       </div>
       </div> `
        container.querySelector("#close_inform_popup").addEventListener("click", () => {
            container.remove()
        })
        document.body.append(container)
    }

}

class VisitTherapist extends Visit {

    constructor(data) {
        super(data);
        this.doctor = 'terapevt';
        if (data) {
            this.age = data.age;
        } else {
            this.age = document.querySelector("#user-age-terapevt").value;
        }
    }

    async showInfoModal(container) {
        container.innerHTML = `
                  <div class="modal-login container-fluid p-0 vh-100 position-fixed top-0 start-0 bg-black bg-opacity-25"
        style="backdrop-filter: blur(3px); overflow: hidden;" id="modal-login">
       <div class="main-section__new-visit container-sm bg-white position-absolute top-50 start-50 translate-middle p-4"
            style="border-radius:10px; width: 40vw; overflow: scroll; max-height: 90%">
           <div class="information_wrapper">
           <h2 class="main-section__see_all-info-header-text">інфорамція візита</h2>
           <div>
               <h5 class="main-section__see-all-inf-header">Лікар: <span class="main-section__see-all-inf-span">Терапевт</span></h5>
               <h5 class="main-section__see-all-inf-header">ФІО пацієнта: <span class="main-section__see-all-inf-span">${this.patientName}</span></h5>
               <h5 class="main-section__see-all-inf-header">Ціль візита: <span class="main-section__see-all-inf-span">${this.description}</span></h5>
               <h5 class="main-section__see-all-inf-header">Короткі замітки: <span class="main-section__see-all-inf-span">${this.title}</span></h5>
               <h5 class="main-section__see-all-inf-header">Терміновість візита: <span class="main-section__see-all-inf-span">${this.urgency}</span></h5>
               <h5 class="main-section__see-all-inf-header">Вік: <span class="main-section__see-all-inf-span">${this.age}</span></h5>
           </div>
           <button type="button" class="modal-login__btn-done btn btn-success" id="close_inform_popup" style="margin-top: 20px">
               ГОТОВО
           </button>
           </div>
       </div>
       </div> `
        container.querySelector("#close_inform_popup").addEventListener("click", () => {
            container.remove()
        })
        document.body.append(container)
    }

}

class CardsController {

    constructor() {
        this.cards = [];
        this.doctorVisitModal = new DoctorVisitModal((cardData) => this.addCard(cardData));
    }

    addCard(newCardData, container = document.querySelector(".main-section__cards-container")) {
        let card = new Card(newCardData, () => {
            this.cards = this.cards.filter((card) => card.id !== newCardData.id);
        });
        card.render(container);
        this.cards.push(card);
    }

}

let cardsController = new CardsController();
