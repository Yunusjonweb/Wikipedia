const elFrom = document.getElementById("from");
const elInpt = document.getElementById("inpt");
const elBox = document.querySelector(".boxs");

const endpoint = "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch="

elFrom.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchValue = elInpt.value;
    elFrom.reset();
    if (searchValue === "") {
        showMessage("message-create", "Ma'lumot kiriting")
    } else {
        getWikipedia(searchValue);
    }
})

function showMessage(where, message) {
    document.getElementById(`${where}`).textContent = message;
    setTimeout(() => {
        document.getElementById(`${where}`).textContent = "";
    }, 2500)
}

async function getWikipedia(searchValue) {
    const responsive = await fetch(endpoint + searchValue);
    const results = await responsive.json();
    if (results.query.search.length === 0) {
        return showMessage();
    } else {
        displayResults(results.query.search);
    }
}

const postCard = document.createElement("div");
postCard.classList = "postCard";

function displayResults(results) {
    postCard.innerHTML = " ";
    results.forEach(results => {
        const url = `https://en.wikipedia.org/?curid=${results.pageid}`;
        postCard.innerHTML = `
        <div class="card">
        <h1 class="title">${results.title}</h1>
        <a href="${url}" target="_blank">${url}</a>
        <p class="cardSnippet">${results.snippet}</p>
        </div>
        `
    });
    elBox.appendChild(postCard);
};