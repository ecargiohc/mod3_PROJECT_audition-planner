const musicianURL = "http://localhost:3000/musicians"
const auditionsURL = "http://localhost:3000/auditions/musician/"

document.addEventListener("DOMContentLoaded", () => {
    getMusicians();
    submitFunc();
})
function submitFunc() {
    const formDiv = document.getElementById("create-audition");
    const createForm = document.createElement("form");
    createForm.setAttribute("class", "add-audition-form");
    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "musician");
    nameInput.setAttribute("value", "");
    nameInput.setAttribute("placeholder", "Enter Your Name...");

    let instrInput = document.createElement("input");
    instrInput.setAttribute("type", "text");
    instrInput.setAttribute("name", "instrument");
    instrInput.setAttribute("value", "");
    instrInput.setAttribute("placeholder", "Enter Your Instrument...");

    let orchInput = document.createElement("input");
    orchInput.setAttribute("type", "text");
    orchInput.setAttribute("name", "orchestra");
    orchInput.setAttribute("value", "");
    orchInput.setAttribute("placeholder", "Orchestra Name...");

    let posInput = document.createElement("input");
    posInput.setAttribute("type", "text");
    posInput.setAttribute("name", "position");
    posInput.setAttribute("value", "");
    posInput.setAttribute("placeholder", "Position...");

    let dateInput = document.createElement("input");
    dateInput.setAttribute("type", "text");
    dateInput.setAttribute("name", "date");
    dateInput.setAttribute("value", "");
    dateInput.setAttribute("placeholder", "Audition Date...");

    let exInput = document.createElement("input");
    exInput.setAttribute("type", "text");
    exInput.setAttribute("name", "excerpts");
    exInput.setAttribute("value", "");
    exInput.setAttribute("placeholder", "Excerpt list link...");

    let submitInput = document.createElement("input");
    submitInput.setAttribute("type", "submit");
    submitInput.setAttribute("name", "submit");
    submitInput.setAttribute("value", "Create/Add Audition");
    submitInput.setAttribute("class", "submit");

    createForm.appendChild(nameInput);
    createForm.appendChild(instrInput);
    createForm.appendChild(orchInput);
    createForm.appendChild(posInput);
    createForm.appendChild(dateInput);
    createForm.appendChild(exInput);
    createForm.appendChild(submitInput);
    createForm.addEventListener("submit", (e) => {createAudition(e); 
        submitFunc();
    })
    createForm.id = "create-form";
    formDiv.appendChild(createForm);
};
function getMusicians() {
    fetch(musicianURL)
    .then(response => response.json())
    .then(json => loopMusicians(json))
}
function loopMusicians(musicians) {
    musicians.forEach((musician) => renderMusician(musician))
};
function renderMusician(musician) {
    // console.log(musician);
    const ul = document.getElementById("musician-list");
    let li = document.createElement("li");
    li.innerText = `${musician.name}`;
    // `instrument: ${musician.instrument}`
    const button1 = document.createElement("button");
    button1.setAttribute("class", "view-btn");
    button1.innerText = "See Auditions";
    button1.addEventListener("click", () => {getAuditions(musician);
        // ADDED BELOW @10/4; 9:20AM
        document.querySelector("form").remove();
    });

    const button2 = document.createElement("button");
    button2.setAttribute("class", "delete-btn");
    button2.innerText = "Delete";
    button2.addEventListener("click", () => deleteMusician(musician, li));
    li.appendChild(button1);
    li.appendChild(button2);
    ul.appendChild(li);
};
function deleteMusician(musician, li) {
    // console.log(musician);
    // console.log(li);
    let musicianId = musician.id
    fetch(musicianURL+`/${musicianId}`, {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        },
        body: JSON.stringify({id: musicianId})
    })
    // .then(response => response.json())
    // .then(json => {
    //     li.remove();
    // })
    .then(removeMusician(li))
    .then(console.log("DELETE SUCCESSFUL"))
    .catch(err=>console.log(err))
}
function removeMusician(li) {
    li.remove();
}
function getAuditions(musician) {
    fetch(auditionsURL +`${musician.id}`)
    .then(response => response.json())
    // .then(json => console.log(json[0]))
    .then(json => loopAuditions(json))
    .catch(err => console.log(err))
}
function loopAuditions(auditionsObj) {
    // console.log(auditionsObj);
    for (let audition of auditionsObj) {renderAuditions(audition)}
}
function renderAuditions(auditionData) {
    // console.log(auditionData.id);
        const ul = document.getElementById("audition-list");
        ul.innerHTML = "";   
        let aCard = document.createElement("div");
        aCard.setAttribute("class", "card");
        aCard.id = `aCard${auditionData.id}`;
        aCard.innerHTML = `Orchestra: ${auditionData.orchestra} <br>
        Position: ${auditionData.position} <br> Date: ${auditionData.date} <br> Excerpts: <a href = "${auditionData.excerpts}">Link</a>`;

        const editButton = document.createElement("button");
        editButton.setAttribute("class", "edit-btn");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {editAud(auditionData);
            // document.getElementById("create-form").remove();
            // document.querySelector(".add-audition-form").remove();
        });
        aCard.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "delete-audition-btn")
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => deleteAudition(auditionData, aCard));
        aCard.appendChild(deleteButton);

        ul.appendChild(aCard);
}
function createAudition(e) {
    // console.log(e.path[0][0].value);
    e.preventDefault();
    let audM = e.path[0][0].value;
    // let audI = e.path[0][1].value;
    let audOrch = e.path[0][2].value;
    let audPos = e.path[0][3].value;
    let audDate = e.path[0][4].value;
    let audEx = e.path[0][5].value;
    fetch("http://localhost:3000/auditions", {
        method: "POST", 
        headers: {
        "Content-Type": "application/json", 
        "Accept": "application/json"
        }, 
        body: JSON.stringify({audition: {orchestra: audOrch, position: audPos, date: audDate, excerpts: audEx, musician_name: audM}})
    })
    .then(response => response.json())
    .then((json) => {
        // console.log(json)
        renderMusician(json);
        document.querySelector("form").remove();
        document.getElementById("audition-list").innerHTML = "";
    })
    .catch(err => console.log(err))
};
function editAud(auditionData) {
    // console.log(auditionData.id);
    document.getElementById("create-form");
    const formDiv = document.getElementById("create-audition");
    const createForm = document.createElement("form");
    let hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("name", "hidden");
    hiddenInput.id = `${auditionData.id}`
    createForm.setAttribute("class", "add-audition-form");
    createForm.id = "edit-form";
    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "musician");
    nameInput.id = `${auditionData.musician.id}`;
    nameInput.setAttribute("value", auditionData.musician.name);
    nameInput.setAttribute("placeholder", "Enter Your Name...");

    let instrInput = document.createElement("input");
    instrInput.setAttribute("type", "text");
    instrInput.setAttribute("name", "instrument");
    instrInput.setAttribute("value", auditionData.musician.instrument);
    instrInput.setAttribute("placeholder", "Enter Your Instrument...");

    let orchInput = document.createElement("input");
    orchInput.setAttribute("type", "text");
    orchInput.setAttribute("name", "orchestra");
    orchInput.setAttribute("value", auditionData.orchestra);
    orchInput.setAttribute("placeholder", "Orchestra Name...");

    let posInput = document.createElement("input");
    posInput.setAttribute("type", "text");
    posInput.setAttribute("name", "position");
    posInput.setAttribute("value", auditionData.position);
    posInput.setAttribute("placeholder", "Position...");

    let dateInput = document.createElement("input");
    dateInput.setAttribute("type", "text");
    dateInput.setAttribute("name", "date");
    dateInput.setAttribute("value", auditionData.date);
    dateInput.setAttribute("placeholder", "Audition Date...");

    let exInput = document.createElement("input");
    exInput.setAttribute("type", "text");
    exInput.setAttribute("name", "excerpts");
    exInput.setAttribute("value", auditionData.excerpts);
    exInput.setAttribute("placeholder", "Excerpt list link...");

    let submitInput = document.createElement("input");
    submitInput.setAttribute("type", "submit");
    submitInput.setAttribute("name", "submit");
    submitInput.setAttribute("value", "Update/Save");
    submitInput.setAttribute("class", "submit");

    createForm.appendChild(nameInput);
    createForm.appendChild(instrInput);
    createForm.appendChild(orchInput);
    createForm.appendChild(posInput);
    createForm.appendChild(dateInput);
    createForm.appendChild(exInput);
    createForm.appendChild(submitInput);
    createForm.appendChild(hiddenInput);
    createForm.addEventListener("submit", (e) => {
        updateAud(e);
        // document.getElementById("create-audition").remove();
        // document.getElementById("create-form").remove();
        // document.getElementById("edit-form").remove();
        // document.getElementsByClassName("add-audition-form").remove();
    });
    formDiv.appendChild(createForm);
}
function updateAud(e) {
    e.preventDefault();
    // console.log(e.target.hidden.id)
    let mId = e.target.musician.id;
    let aId = e.target.hidden.id;

    let musician = e.target.musician.value;
    let instrument = e.target.instrument.value;
    let orchestra = e.target.orchestra.value;
    let position = e.target.position.value;
    let date = e.target.date.value;
    let excerpts = e.target.excerpts.value;

    let audData = {orchestra, position, date, excerpts};
    fetch(`http://localhost:3000/auditions/${aId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        }, 
        body: JSON.stringify(audData)
    })
    .then(response => response.json())
    .then(json => {
        document.getElementById("audition-list").innerHTML = "";
        renderAuditions(json);
    })
    .catch(err => console.log(err))
    // .then(response => response.json())
    // .then(json => console.log(json))
    
    let mData = {musician, instrument};
    fetch(musicianURL+`/${mId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        }, 
        body: JSON.stringify(mData)
    })
    .then(console.log)
    .catch(err => console.log(err))
}
function displayUpdate(newData) {
    let form = document.querySelector("form");
    console.log(newData);
    // console.log(form[2].name)
    form[2].value = newData.auditions[0].orchestra;
    form[3].value = newData.auditions[0].position;
    form[4].value = newData.auditions[0].date;
    form[5].value = newData.auditions[0].excerpts;

    let updateButton = document.createElement("button");
    updateButton.innerText = "Update/Save";
    updateButton.addEventListener("click", () => updateAud(newData));
    form.appendChild(updateButton);
}
function deleteAudition(auditionData, aCard) {
    console.log(auditionData.id);
    let musicianId = auditionData.musician_id;
    
    fetch(auditionsURL+`${musicianId}`, {method: "DELETE", headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({id: auditionData.id})})
    // .then(console.log)
    // .then(response => response.json())
    .then(removeAudition(aCard))
    // .then(json => console.log(json))
    .then(console.log("DELETE SUCCESSFUL"))
    .catch(err=>console.log(err))
}
function removeAudition(aCard) {
    aCard.remove();
}
