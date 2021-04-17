let timeout = 2000;

function customAlert(name) {
  let customAlert = document.querySelector(`${name}`);
  customAlert.style.visibility = "visible";

  setTimeout(function () {
    customAlert.style.visibility = "hidden";
  }, timeout);
}

class Movie {
  constructor(title, director, genre) {
    this.title = title;
    this.director = director;
    this.genre = genre;
  }
}
class Storage {
  static getMovies() {
    let movies;
    if (localStorage.getItem("movies") === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem("movies"));
    }
    return movies;
  }

  static add(movie) {
    const movies = Storage.getMovies();
    movies.push(movie);

    localStorage.setItem("movies", JSON.stringify(movies));
  }
  static remove(title) {
    const movies = Storage.getMovies();
    movies.forEach(function (movie, index) {
      if (movie.title === title) {
        movies.splice(index, 1);
      }
    });
    localStorage.setItem("movies", JSON.stringify(movies));
  }
}

class Interface {
  static displayMovies() {
    const storage = Storage.getMovies();

    const movies = storage;

    movies.forEach(function (movie) {
      Interface.addMovie(movie);
    });
  }

  static addMovie(movie) {
    const list = document.querySelector(".list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${movie.title}</td>
    <td>${movie.director}</td>
    <td>${movie.genre}</td>
    <td><a href = "#" class = "btn-delete delete">X</a></td>`;

    list.appendChild(row);
  }

  static delete(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
}

document.addEventListener("DOMContentLoaded", Interface.displayMovies);

document.querySelector("#movie").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const director = document.querySelector("#director").value;
  const genre = document.querySelector("#genre").value;
  if (title === "" || director === "" || genre === "") {
    customAlert(".alert1");
  } else {
    const movie = new Movie(title, director, genre);
    Interface.addMovie(movie);
    Storage.add(movie);
    customAlert(".alert2");
  }
});

document.querySelector(".list").addEventListener("click", function (e) {
  Interface.delete(e.target);
  Storage.remove(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.textContent
  );
});

function Search() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("table-movies");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function random() {
  let table, tr, i;
  table = document.querySelector(".list");
  let ran = Math.floor(Math.random() * table.rows.length);
  tr = table.getElementsByTagName("tr");
  console.log(ran);
  if (table.rows.length)
    for (i = 0; i < tr.length; i++) {
      if (i === ran) {
        tr[i].style.display = "";
        tr[i].style.background = "rgb(242 242 242)";
      } else {
        tr[i].style.display = "none";
      }
    }
}

function showAll() {
  let table, tr, i;
  table = document.querySelector(".list");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    tr[i].style.display = "";
  }
}
