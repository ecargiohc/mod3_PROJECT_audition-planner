const musicianURL = "http://localhost:3000/musicians"
const auditionsURL = "http://localhost:3000/auditions/musician/"

document.addEventListener("DOMContentLoaded", () => {
    getMusicians();
    
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
    createForm.addEventListener("submit", (e) => createAudition(e))
    formDiv.appendChild(createForm);
})
function getMusicians() {
    fetch(musicianURL)
    .then(response => response.json())
    .then(json => loopMusicians(json))
}
function loopMusicians(musicians) {
    musicians.forEach((musician) => renderMusician(musician))
}
function renderMusician(musician) {
    // console.log(musician);
    const ul = document.getElementById("musician-list");
    let li = document.createElement("li");
    li.innerText = `${musician.name}`;
    // `instrument: ${musician.instrument}`
    const button1 = document.createElement("button");
    button1.setAttribute("class", "btn");
    button1.innerText = "See Auditions";
    button1.addEventListener("click", () => getAuditions(musician));

    const button2 = document.createElement("button");
    button2.innerText = "Delete";
    button2.addEventListener("click", () => deleteMusician(musician, li));
    li.appendChild(button1);
    li.appendChild(button2);
    ul.appendChild(li);
}
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
        aCard.innerHTML = `Orchestra: ${auditionData.orchestra}, Position: ${auditionData.position}, Date: ${auditionData.date}, Excerpts: ${auditionData.excerpts}`;

        const editButton = document.createElement("button");
        editButton.setAttribute("class", "edit-btn");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editAud(auditionData));
        aCard.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => deleteAudition(auditionData));
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
    .then(() => {
        document.querySelector("form").remove();
    })
    .catch(err => console.log(err))
}
function editAud(auditionData) {
    let aCard = document.getElementById(`aCard${auditionData.id}`);
    // console.log(aCard);
    let musicianId = auditionData.musician_id;
    // console.log(auditionData);
    // console.log(musicianId);
    let newName = auditionData.orchestra;
    let newPos = auditionData.position;
    let newDate = auditionData.date;
    let newEx = auditionData.excerpts;
    // let newData = {orchestra: newName, position: newPos, date: newDate, excerpts: newEx, musician_name: newData};
    let newData = {orchestra: newName, position: newPos, date: newDate, excerpts: newEx}
    fetch(musicianURL+"/"+musicianId, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        }, 
        // body: JSON.stringify({audition: {orchestra: newName, position: newPos, date: newDate, excerpts: newEx}})
        body: JSON.stringify({audition: newData})
    })
    .then(response => response.json())
    // .then(json => console.log(json))
    // .then(json => {
    //     aCard.innerHTML = newData;
    // })
    .then(json => displayUpdate(json))
    .catch(err => console.log(err))
}
function displayUpdate(newData) {
    let form = document.querySelector("form");
    console.log(newData)
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
    let musicianId = auditionData.musician_id
    
    fetch(auditionsURL+`${musicianId}`, {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        },
        body: JSON.stringify({id: auditionData.id})
    })
    .then(response => response.json())
    .then(removeAudition(aCard))
    // .then(json => console.log(json))
    .then(console.log("DELETE SUCCESSFUL"))
    .catch(err=>console.log(err))
}
function removeAudition(aCard) {
    aCard.remove();
}
function updateAud(newData) {
    console.log(newData)
}