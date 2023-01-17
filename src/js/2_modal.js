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
        this.newVisitForm.querySelector("form").reset();
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
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(this.getDoctorVisitData()),
            visit: "open",
        });
        document.querySelector(".main-section__header-novisit").style.display="none";
        return await sendCardData.json();
    }
}