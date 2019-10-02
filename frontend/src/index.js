const musicianURL = "http://localhost:3000/musicians"
const auditionsURL = "http://localhost:3000/auditions/musician/"

document.addEventListener("DOMContentLoaded", () => {
    getMusicians();
    // getAuditions();
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
    console.log(auditionsObj);
    const ul = document.getElementById("audition-list");
    for (audition in auditionsObj) {
        // console.log(audition)
        // const ul = document.getElementById("audition-list");
        let li = document.createElement("li");
        li.innerText = `Orchestra: ${audition.orchestra}, Position: ${audition.position}, Date: ${audition.date}, Excerpts ${audition.excerpts}`;
        ul.appendChild(li)
        // console.log(auditionsObj.orchestra);
        // console.log(auditionsObj.position);
        // console.log(auditionsObj.excerpts);
    }
}
function renderAudition(audition) {
    const ul = document.getElementById("audition-list");
    let li = document.createElement("li");
    li.innerText = `Orchestra: ${audition.orchestra}, Position: ${audition.position}, Date: ${audition.date}, Excerpts ${audition.excerpts}`;
    ul.appendChild(li)

    let button = document.createElement("button");
    button.setAttribute("class", "btn")
    button.innerText = "See details"
    button.addEventListener("click", () => viewAudition(audition));
    ul.appendChild(button);
}
// HOW TO HAVE MULTIPLE AUDITIONS PER MUSICIAN; MAKE ARRAY ATTRIBUTE?!
function viewAudition(audition) {
    console.log(audition);
    let div = document.createElement("div");
    div.setAttribute("id", "aud-div");

    let audLi = document.createElement("li");
    audLi.innerText = `position: ${aud.position}, date: ${aud.date}, excerpts: ${aud.excerpts}`;

    div.appendChild(audLi);
    const ul = document.getElementById("audition-list");
    ul.appendChild(div)
    const audLi = document.getElementById("orchestras");
    audLi.appendChild(div);
}
function createAudtion(audition) {
    const ul = document.getElementById("audition-list");
    let aCard = document.createElement("div");
    aCard.setAttribute("class", "card");
    ul.appendChild(aCard);
}