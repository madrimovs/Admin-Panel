function findElement(element, parent = document) {
  return parent.querySelector(element);
}

const elForm = findElement("#form-post");
const elCards = findElement("#cards");
const elSearchForm = findElement("#searchForm");
const elSearch = findElement("#search");
const elChange = findElement("changeList");

let searchPost = [];

let filteredPosts = [];

//ARRAY POSTS
let posts = [
  {
    image: "https://picsum.photos/536/354",
    title: "Uzbekistan",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    date: "2023-01-12",
  },

  {
    image: "https://picsum.photos/536/354",
    title: "Sport",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    date: "2023-01-12",
  },

  {
    image: "https://picsum.photos/536/354",
    title: "Siyosat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    date: "2023-01-12",
  },
];

//RENDER POSTS FUNCTION
function renderPosts(array, element = elCards) {
  elCards.innerHTML = "";

  //FOR
  for (let i = 0; i < array.length; i++) {
    const post = array[i];

    const newCard = document.createElement("div");

    newCard.className = "card col-12 col-sm-5 col-md-3 mb-3";
    newCard.innerHTML = `
      <img src="${post.image}" class="card-img-top" alt="${post.title}" />
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${post.description}</p>
        <p class="mb-0 text-primary">${post.date}</p>
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

  const newPost = {
    image: image,
    title: title,
    description: description,
    date: date,
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
  const typePosts = elChange.value;

  filteredPosts = [];

  if (typePosts === "allPosts") {
    renderPosts(posts);
  } else {
  }
  console.log(elChange);
});
