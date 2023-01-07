function findElement(element, parent = document) {
  return parent.querySelector(element);
}

const elForm = findElement("#form-post");
const elCards = findElement("#cards");

let posts = [
  {
    image: "https://picsum.photos/536/354",
    title: "Post-1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    date: "2023-01-12",
  },

  {
    image: "https://picsum.photos/536/354",
    title: "Post-2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    date: "2023-01-12",
  },

  {
    image: "https://picsum.photos/536/354",
    title: "Post-3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    date: "2023-01-12",
  },
];

//RENDER POST FUNCTION

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
  `;

    element.appendChild(newCard);
  }
}

renderPosts(posts);

//FORM
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
