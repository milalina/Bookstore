fetchData();

let stock = [];

function fetchData() {
    fetch("https://api.myjson.com/bins/zyv02")
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data.books);
            stock = data.books;
            console.log(stock);
            displayBooks(stock)
        })
        .catch(function (error) {
            console.log(error);
        })
}


function displayBooks(stock) {
    let booksElement = document.getElementById('books')
    booksElement.innerHTML = "" //to empty my sting
    for (i in stock) {
        let bookElement = document.createElement('div')
        let flip_card_inner = document.createElement("div")
        let flip_card_front = document.createElement("div")
        let flip_card_back = document.createElement("div")
        let flip_card_button = document.createElement('button')
        let flip_card_button_text = document.createTextNode("more info")
        flip_card_button.appendChild(flip_card_button_text)
        flip_card_button.id = i
        flip_card_button.className = "btn btn-info"
        let modalElement = document.createElement('div')
        modalElement.className = "modal"
        modalElement.id = "myModal" + i
        let modalContent = document.createElement("div")
        modalContent.className = "modal-content"
        let elementSpan = document.createElement("span")
        elementSpan.className = "close"
        let textElementSpan = document.createTextNode("")
        elementSpan.appendChild(textElementSpan)
        let imageModalElement = document.createElement("img")
        imageModalElement.src = stock[i].detail
        imageModalElement.id = "imageModal" + i
        modalContent.appendChild(elementSpan)
        modalContent.appendChild(imageModalElement)
        modalElement.appendChild(modalContent)

        booksElement.appendChild(flip_card_button)
        booksElement.appendChild(modalElement)


        bookElement.className = 'flip-card col-lg-3 col-md-4 col-xs-1'
        flip_card_inner.className = "flip-card-inner"
        flip_card_front.className = "flip-card-front"
        flip_card_back.className = "flip-card-back"
        let imageElementFr = document.createElement('img')
        let titleElement = document.createElement("h3")
        let titleElementText = document.createTextNode(stock[i].title)
        let descriptionElement = document.createElement("p")
        let descriptionElementText = document.createTextNode(stock[i].description)
        imageElementFr.width = 200
        imageElementFr.src = stock[i].cover

        flip_card_inner.appendChild(flip_card_front)
        flip_card_inner.appendChild(flip_card_back)

        flip_card_front.appendChild(imageElementFr)

        titleElement.appendChild(titleElementText)
        flip_card_back.appendChild(titleElement)
        descriptionElement.appendChild(descriptionElementText)
        flip_card_back.appendChild(descriptionElement)
        flip_card_back.appendChild(flip_card_button)

        bookElement.appendChild(flip_card_inner)
        booksElement.appendChild(bookElement)

        // Get the modal


        flip_card_button.onclick = function () {
            var id = flip_card_button.id
            var modal = document.getElementById("myModal" + id);
            console.log(modal)
            modal.style.display = "block";
        }


        modalContent.onclick = function () {
            var id = flip_card_button.id
            var modal = document.getElementById("myModal" + id);
            console.log(modal)
            modal.style.display = "none";
        }


        modalElement.onclick = function (event) {
            var id = flip_card_button.id
            var modal = document.getElementById("myModal" + id);
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    }

};



function updateResult() {
    query = Array.from(document.querySelectorAll("input[name=search]")).map(elt => elt.value);
    let d = query[0] //making a string out of the array
    let b = d.toLowerCase() //making every letter in the string small
    resultList = [];
    resultList = stock.filter(function (oneBook) {
        return oneBook.title.toLowerCase().includes(b)
    })
    displayBooks(resultList)
}