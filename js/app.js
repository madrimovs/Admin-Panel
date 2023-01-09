function findElement(element, parent = document) {
  return parent.querySelector(element);
}

const elForm = findElement("#form-post");
const elCards = findElement("#cards");
const elSearchForm = findElement("#searchForm");
const elSearch = findElement("#search");
const elChange = findElement("#changeSelect");

let searchPost = [];
let filteredPosts = [];

//ARRAY POSTS
let posts = [
  {
    id: 1,
    image: "https://picsum.photos/536/354",
    title: "Uzbekistan",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    date: "2023-01-12",
    genres: ["Uzbekistan"],
  },

  {
    id: 2,
    image: "https://picsum.photos/536/354",
    title: "Sport",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    date: "2023-01-12",
    genres: ["Sport"],
  },

  {
    id: 3,
    image: "https://picsum.photos/536/354",
    title: "Siyosat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    date: "2023-01-12",
    genres: ["Siyosat"],
  },
];

//RENDER POSTS FUNCTION
function renderPosts(array, element = elCards) {
  elCards.innerHTML = "";

  //FOR
  for (let i = 0; i < array.length; i++) {
    const post = array[i];

    const newUl = document.createElement("ul");
    newUl.className = "list-unstyled";

    for (let i = 0; i < post.genres.length; i++) {
      const element = post.genres[i];

      const newLi = document.createElement("li");
      newLi.className = "list-group-item";
      newLi.textContent = element;
      newUl.appendChild(newLi);
    }

    const newCard = document.createElement("div");

    newCard.className = "card col-12 col-sm-5 col-md-3 mb-3 p-0";
    newCard.innerHTML = `
      <img src="${post.image}" class="card-img-top" alt="${post.title}" />
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${post.description}</p>
        <h6 class=" text-primary border-bottom ">${newUl.outerHTML}</h6>
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-text mb-0 text-secondary"><small>${post.date}</small></p>
          <div>
            <button class="btn btn-sm btn-danger">Delete</button>
            <button class="btn btn-sm btn-success">Edite</button>
          </div>
        </div>
      </div>
    `;

    element.appendChild(newCard);
  }
}

renderPosts(posts);

//FORM POSTS
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const image = evt.target.image.value;
  const title = evt.target.title.value;
  const description = evt.target.description.value;
  const date = evt.target.date.value;
  const elGenres = evt.target.genres;

  console.log(elGenres);
  const genres = [];

  for (let i = 0; i < elGenres.length; i++) {
    const element = elGenres[i];

    if (element.checked) {
      genres.push(element.value);
    }
  }

  const newPost = {
    image: image,
    title: title,
    description: description,
    date: date,
    genres: genres,
  };

  posts.push(newPost);

  renderPosts(posts);
});

//SEARCH POSTS
elSearchForm.addEventListener("input", function (evt) {
  searchPost = [];
  evt.preventDefault();

  let value = elSearch.value;

  posts.forEach((evt) => {
    if (
      evt.title.toLowerCase().includes(value.toLowerCase()) ||
      evt.description.toLowerCase().includes(value.toLowerCase())
    ) {
      searchPost.push(evt);
    }
  });

  renderPosts(searchPost);
});

//CHANGE POSTS
elChange.addEventListener("change", () => {
  const type = elChange.value;

  filteredPosts = [];

  if (type === "All posts") {
    renderPosts(posts);
  } else {
    posts.forEach((post) => {
      post.genres.forEach((genre) => {
        if (genre.toLowerCase() === type.toLowerCase()) {
          filteredPosts.push(post);
        }
      });
    });

    renderPosts(filteredPosts);
  }
});
