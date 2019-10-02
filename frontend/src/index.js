const musicianURL = "http://localhost:3000/musicians"
const auditionsURL = "http://localhost:3000/auditions/musician/"

document.addEventListener("DOMContentLoaded", () => {
    getMusicians();
    
    const formDiv = document.getElementById("create-audition");
    const createForm = document.createElement("form");
    createForm.setAttribute("class", "add-audition-form");
    let mInput = document.createElement("input");
    mInput.setAttribute("type", "text");
    mInput.setAttribute("name", "musician");
    mInput.setAttribute("value", "");
    mInput.setAttribute("placeholder", "Enter Your Name...");

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

    createForm.appendChild(mInput);
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
    // const list = document.getElementById("list-panel")
    const ul = document.getElementById("musician-list");
    let li = document.createElement("li");
    li.innerText = `${musician.name}, instrument: ${musician.instrument}`
    const button1 = document.createElement("button");
    button1.setAttribute("class", "btn");
    button1.innerText = "See Auditions";
    button1.addEventListener("click", () => getAuditions(musician));
    li.appendChild(button1);
    ul.appendChild(li);
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
        // console.log(audition)
        const ul = document.getElementById("audition-list");
        let aCard = document.createElement("div");
        aCard.setAttribute("class", "card");
        aCard.innerHTML = `Orchestra: ${auditionData.orchestra}, Position: ${auditionData.position}, Date: ${auditionData.date}, Excerpts: ${auditionData.excerpts}`;

        const editButton = document.createElement("button");
        editButton.setAttribute("class", "edit-btn");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editAud(auditionData, aCard));
        aCard.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => deleteAudition(auditionData, aCard));
        aCard.appendChild(deleteButton);

        ul.appendChild(aCard);
}
function createAudition(e) {
    // console.log(e.path[0][0].value);
    e.preventDefault();
    let audM = e.path[0][0].value;
    let audOrch = e.path[0][1].value;
    let audPos = e.path[0][2].value;
    let audDate = e.path[0][3].value;
    let audEx = e.path[0][4].value;
    fetch("http://localhost:3000/auditions", {
        method: "POST", 
        headers: {
        "Content-Type": "application/json", 
        "Accept": "application/json"
        }, 
        body: JSON.stringify({audition: {orchestra: audOrch, position: audPos, date: audDate, excerpts: audEx, musician_name: audM}})
    })
    .then(response => response.json())
    .then(json => console.log(json))
    // .then(json => renderAuditions(json))
    .catch(err => console.log(err))
}
function editAud(auditionData, aCard) {
    let musicianId = auditionData.musician_id
    console.log(auditionData);
    console.log(musicianId);
    let newName = auditionData.orchestra
    let newPos = auditionData.position
    let newDate = auditionData.date
    let newEx = auditionData.excerpts
    fetch(auditionsURL+`${musicianId}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        }, 
        body: JSON.stringify({"audition": newName})
        // body: JSON.stringify({"Orchestra": newName, "Position": newPos, "Date": newDate, "Excerpts": newEx})
        // body: JSON.stringify(li.innerText)
    })
    .then(response => response.json())
    // .then((json) => {li.innerHTML = `Orchestra: ${json.orchestra}, Position: ${json.position}, Date: ${json.date}, Excerpts: ${json.excerpts}`})
    .catch(err => console.log(err))
}
function deleteAudition(auditionData, aCard) {
    // console.log(auditionData);
    let deleteElement = auditionData.musician_id
    fetch(auditionsURL+`${deleteElement}`, {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        },
        body: JSON.stringify({id: deleteElement})
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
// function renderAudition(audition) {
//     const ul = document.getElementById("audition-list");
//     let li = document.createElement("li");
//     li.innerText = `Orchestra: ${audition.orchestra}, Position: ${audition.position}, Date: ${audition.date}, Excerpts ${audition.excerpts}`;
//     ul.appendChild(li)

//     let button = document.createElement("button");
//     button.setAttribute("class", "btn")
//     button.innerText = "See details"
//     button.addEventListener("click", () => viewAudition(audition));
//     ul.appendChild(button);
// }

// function viewAudition(audition) {
//     // console.log(audition);
//     let div = document.createElement("div");
//     div.setAttribute("id", "aud-div");

//     let li = document.createElement("li");
//     li.innerText = `position: ${aud.position}, date: ${aud.date}, excerpts: ${aud.excerpts}`;

//     div.appendChild(li);
//     const ul = document.getElementById("audition-list");
//     ul.appendChild(div)
//     const audLi = document.getElementById("orchestras");
//     audLi.appendChild(div);
// }
function createAudtion(audition) {
    const ul = document.getElementById("audition-list");
    let aCard = document.createElement("div");
    aCard.setAttribute("class", "card");
    ul.appendChild(aCard);
}