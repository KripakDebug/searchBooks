const inputSearchBook = document.querySelector("#search");
const wrapperBooks = document.querySelector(".wrapper-books");

inputSearchBook.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${inputSearchBook.value}`
    )
      .then((response) => {
        return response.json();
      })
      .then((file) => getBooksInfo(file.items));
  }
});
function getBooksInfo(book) {
  wrapperBooks.innerHTML = "";
  
  book.forEach((element) => {
    wrapperBooks.innerHTML += `
            
    <div class='book-info'>
    <a target="_blank" href='${
        element.volumeInfo.canonicalVolumeLink
      }'><h3>${element.volumeInfo.title}</h3></a>
            <div class='img'>
            ${
              element.volumeInfo.imageLinks
                ? `<img src='${element.volumeInfo.imageLinks.thumbnail}'>`
                : "Немає фото"
            }
        </div>
        <div>
            <h4>Author: ${element.volumeInfo.authors
              .map((author) => `<p>${author}</p>`)
              .join(" ")}<h4>
            <h4>Publisher: ${
              element.volumeInfo.publisher ? element.volumeInfo.publisher : ""
            }</h4>
            <h4>Published: ${
              element.volumeInfo.publishedDate
                ? element.volumeInfo.publishedDate
                : ""
            }<h4>
            <h5>${
              element.volumeInfo.subtitle ? element.volumeInfo.subtitle : ""
            }</h5>
        </div>
            
    </div>
            
            `;
  });
}
