class Visit {

    constructor(data) {
        this.doctor = null;
        this.doctorLabel = null;
        if (data) {
            this.id = data.id;
            this.title = data.title;
            this.description = data.description;
            this.urgency = data.urgency;
            this.patientName = data.patientName;
            this.visit = data.visit;
        } else {
            this.collectDataFromInputs(document);
            this.visit = "open";
        }
    }

    getOptionalInputs() {
        return "";
    }

    getOptionalInputsInfo() {
        return "";
    }

    collectDataFromInputs(container) {
        this.patientName = container.querySelector("#patient_name").value;
        this.description = container.querySelector("#visit-propose").value;
        this.title = container.querySelector("#short-text").value;
        this.urgency = container.querySelector("#urgently").value;
        const visit = container.querySelector("#visit");
        if (visit) {
            this.visit = visit.value;
        }
    }

    showInfoModal(container) {
        container.innerHTML = `
                  <div class="modal-login container-fluid p-0 vh-100 position-fixed top-0 start-0 bg-black bg-opacity-25"
        style="backdrop-filter: blur(3px); overflow: hidden;" id="modal-login">
       <div class="main-section__new-visit container-sm bg-white position-absolute top-50 start-50 translate-middle p-4"
            style="border-radius:10px; width: 40vw; overflow: scroll; max-height: 90%">
           <div class="information_wrapper">
           <h2 class="main-section__see_all-info-header-text">Iнфорамція візита</h2>
           <div>
               <h5 class="main-section__see-all-inf-header">Лікар: <span class="main-section__see-all-inf-span">${this.doctorLabel}</span></h5>
               <h5 class="main-section__see-all-inf-header">ПІБ пацієнта: <span class="main-section__see-all-inf-span">${this.patientName}</span></h5>
               <h5 class="main-section__see-all-inf-header">Ціль візита: <span class="main-section__see-all-inf-span">${this.description}</span></h5>
               <h5 class="main-section__see-all-inf-header">Короткі замітки: <span class="main-section__see-all-inf-span">${this.title}</span></h5>
               <h5 class="main-section__see-all-inf-header">Терміновість візита: <span class="main-section__see-all-inf-span">${this.urgency}</span></h5>
               ${this.getOptionalInputsInfo()}
               <h5 class="main-section__see-all-inf-header">Статус: <span class="main-section__see-all-inf-span">${this.visit}</span></h5>
           </div>
           <button type="button" class="modal-login__btn-done btn btn-success" id="close_inform_popup" style="margin-top: 20px">
               ГОТОВО
           </button>
           </div>
       </div>
       </div>`;
        container.querySelector("#close_inform_popup").addEventListener("click", () => {
            container.remove();
        });
        document.body.append(container);
    }

    showEditorModal(container, callbacks) {
        container.classList.add("editing_modal_wrapper");
        container.innerHTML = `<div class="modal-login container-fluid p-0 vh-100 position-fixed top-0 start-0 bg-black bg-opacity-25" id="editing_madal"
             style="backdrop-filter: blur(3px); overflow: hidden;">
            <div
                class="main-section__new-visit container-sm bg-white position-absolute top-50 start-50 translate-middle p-4"
                style="border-radius:10px; width: 40vw; overflow: scroll; max-height: 90%">
                <h2 style="color: #6BB961; text-decoration: underline; text-align: center" class="edit-visit-header">Редагувати візит</h2>
                <div class="form-group">
                    <label for="doctor-type-select" class="form-label">Лікар</label>
                    <select class="form-control" id="doctor-type-select" style="color: #307570;" disabled>
                        <option value="cardiolog" ${this.doctor === "cardiolog" && "selected" || ""}>Кардиолог</option>
                        <option value="stomatolog" ${this.doctor === "stomatolog" && "selected" || ""}>Стоматолог</option>
                        <option value="terapevt" ${this.doctor === "terapevt" && "selected" || ""}>Терапевт</option>
                    </select>
                </div>
                <form>
                    <div class="form-group" id="doctors-form">
                        <div class="col">
                           <p class="col_paragraph">ПІБ(пацієнта):</p> <input type="text" id="patient_name" class="form-control" placeholder="ПІБ(пацієнта)" value=${this.patientName} >
                        </div>
                        <div class="col">
                           <p class="col_paragraph">Ціль візита:</p> <input type="text" id="visit-propose" class="form-control" placeholder="Ціль візита" value=${this.description} >
                        </div>
                        <div class="optional-inputs">
                            ${this.getOptionalInputs()}
                        </div>
                        <div class="col">
                            <p class="col_paragraph">Короткі замітки:</p><textarea type="text" class="form-control" id="short-text"
                                      placeholder="Короткі замітки">${this.title}</textarea>
                        </div>
                        <div class="col">
                            <label for="urgently" class="form-label" style="text-align: center">Терміновість візита</label>
                            <select class="form-control"  id="urgently" style="color: #307570;">
                                <option value="High" ${this.urgency === "High" && "selected" || ""}>High</option>
                                <option value="Normal" ${this.urgency === "Normal" && "selected" || ""}>Normal</option>
                                <option value="Low" ${this.urgency === "Low" && "selected" || ""}>Low</option>
                            </select>
                        </div>
                              <div class="col">
                            <label for="visit" style="text-align: center">Статус</label>
                            <select class="form-control" id="visit" style="color: #307570;">
                                <option value="close" ${this.visit === "close" && "selected" || ""}>close</option>
                                <option value="open" ${this.visit === "open" && "selected" || ""}>open</option>
                            </select>
                        </div>
                    </div>
                </form>
                <div class="main-section__button-container">
                    <button type="button" class="modal-login__btn-done btn  btn-success" id="close_edit_visit"
                            style="margin-top: 20px; background-color: #D24B4B;">
                        Закрити
                    </button>
                    <button type="button" class="modal-login__btn-done btn btn-success" id="edit_visit_btn"
                            style="margin-top: 20px">
                        Готово
                    </button>
                       <button type="button" class="modal-login__btn-done btn btn-success" id="del_card"
                            style="margin-top: 20px">
                        Видалити картку
                    </button>
                </div>
            </div>
        </div>`;
        container.querySelector("#del_card").addEventListener("click", () => {
            callbacks.onDelete();
            container.remove();
        });
        container.querySelector("#close_edit_visit").addEventListener("click", () => {
            container.remove();
        });
        container.querySelector("#edit_visit_btn").addEventListener("click", (e) => {
            e.preventDefault();
            this.collectDataFromInputs(container);
            callbacks.onEdit(this);
            container.remove();
        });
        container.querySelector("#urgently").value = this.urgency;
        document.body.append(container);
    }
}

class VisitDentist extends Visit {

    constructor(data) {
        super(data);
        this.doctor = "stomatolog";
        this.doctorLabel = "Стоматолог";
        if (data) {
            this.date = data.date;
        }
    }

    getOptionalInputs() {
        return `
            <div class="col">
           <p class="col_paragraph">Дата останнього відвідування:</p> <input type="date" class="form-control" id="date-visit" placeholder="Дата останнього відвідування" value="${this.date}">
            </div>
        `;
    }

    getOptionalInputsInfo() {
        return `
            <h5 class="main-section__see-all-inf-header">Дата візитa: <span class="main-section__see-all-inf-span">${this.date}</span></h5>
        `;
    }

    collectDataFromInputs(container) {
        super.collectDataFromInputs(container);
        this.date = container.querySelector("#date-visit").value;
    }

}

class VisitCardiologist extends Visit {

    constructor(data) {
        super(data);
        this.doctor = "cardiolog";
        this.doctorLabel = "Кардиолог";
        if (data) {
            this.age = data.age;
            this.normalPressure = data.normalPressure;
            this.bodyMassIndex = data.bodyMassIndex;
            this.cardiovascularDisease = data.cardiovascularDisease;
        }
    }

    getOptionalInputs() {
        return `
            <div class="col">
               <p class="col_paragraph"> Вік:</p>  <input type="number" class="form-control" id="user-age-cardiolog"  placeholder="Вік" value=${this.age} >
            </div>
             <div class="col">
               <p class="col_paragraph">Звичайний тиск:</p> <input type="number" class="form-control" id="normal-pressure"
                    placeholder="Звичайний тиск"  value=${this.normalPressure}  >
             </div>
             <div class="col">
              <p class="col_paragraph">Індекс маси тіла:</p>    <input type="number" class="form-control" id="body-mass-index"
                    placeholder="Індекс маси тіла" value=${this.bodyMassIndex}   >
             </div>
             <div class="col">
             <p class="col_paragraph">Змінні захворювання серцево-судинної системи:</p> <textarea type="text" class="form-control" id="cardiovascular-disease"
                      placeholder="Змінні захворювання серцево-судинної системи">${this.cardiovascularDisease}</textarea>
             </div>
        `;
    }

    getOptionalInputsInfo() {
        return `
            <h5 class="main-section__see-all-inf-header">Вік: <span class="main-section__see-all-inf-span">${this.age}</span></h5>
            <h5 class="main-section__see-all-inf-header">Звичайний тиск: <span class="main-section__see-all-inf-span">${this.normalPressure}</span></h5>
            <h5 class="main-section__see-all-inf-header">Індекс маси тіла: <span class="main-section__see-all-inf-span">${this.bodyMassIndex}</span></h5>
            <h5 class="main-section__see-all-inf-header">Змінні захворювання серцево-судинної системи: <span class="main-section__see-all-inf-span">${this.cardiovascularDisease}</span></h5>
        `;
    }

    collectDataFromInputs(container) {
        super.collectDataFromInputs(container);
        this.age = container.querySelector("#user-age-cardiolog").value;
        this.normalPressure = container.querySelector("#normal-pressure").value;
        this.bodyMassIndex = container.querySelector("#body-mass-index").value;
        this.cardiovascularDisease = container.querySelector("#cardiovascular-disease").value;
    }
}

class VisitTherapist extends Visit {

    constructor(data) {
        super(data);
        this.doctor = "terapevt";
        this.doctorLabel = "Терапевт";
        if (data) {
            this.age = data.age;
        }
    }

    getOptionalInputs() {
        return `
            <div class="col">
              <p class="col_paragraph">Вік:</p>  <input type="number" class="form-control" id="user-age-terapevt"  placeholder="Вік" value=${this.age} >
            </div>
        `;
    }

    getOptionalInputsInfo() {
        return `
            <h5 class="main-section__see-all-inf-header">Вік: <span class="main-section__see-all-inf-span">${this.age}</span></h5>
        `;
    }

    collectDataFromInputs(container) {
        super.collectDataFromInputs(container);
        this.age = container.querySelector("#user-age-terapevt").value;
    }
}