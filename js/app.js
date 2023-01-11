//*********************************** FUNCTION findElement() *******************************************//
function findElement(element, parent = document) {
	return parent.querySelector(element);
}

const elForm = findElement("#form-post");
const elCards = findElement("#cards");
const elSearchForm = findElement("#searchForm");
const elSearch = findElement("#search");
const elChange = findElement("#changeSelect");
const elEdite = findElement("#form-edite");

let searchPost = [];
let filteredPosts = [];

//*********************************** ARRAY POSTS[] ******************************************//
let posts = [
	{
		id: 1,
		image: "https://picsum.photos/536/354",
		title: "Uzbekistan",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		date: "2023-01-12",
		genres: ["Uzbekistan"],
	},

	{
		id: 2,
		image: "https://picsum.photos/536/354",
		title: "Sport",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		date: "2023-01-12",
		genres: ["Sport"],
	},

	{
		id: 3,
		image: "https://picsum.photos/536/354",
		title: "Siyosat",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		date: "2023-01-12",
		genres: ["Siyosat"],
	},
];

//********************************* FUNCTION renderPosts() ******************************************//
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
			<h6 class="text-primary border-bottom">${newUl.outerHTML}</h6>
			<div>
				<div class="d-flex justify-content-between align-items-center">
						<p class="card-text mb-0 text-secondary"><small>${post.date}</small></p>
					<div>
						<button
								class="btn btn-sm btn-danger delete-btn"
								data-id="${post.id}" 
								>Delete
						</button>
						<button
								class="btn btn-sm btn-success"
								data-id="${post.id}" 
								data-bs-toggle="modal" 
								data-bs-target="#staticBackdrop">Edite
						</button>
					</div>
				</div>
			</div>
		</div>
    `;

		element.appendChild(newCard);
	}
}

renderPosts(posts);

//********************************* elForm POSTS ****************************************//
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
		id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
		image: image,
		title: title,
		description: description,
		date: date,
		genres: genres,
	};

	posts.push(newPost);

	renderPosts(posts);
});

//********************************* SEARCH INPUT POSTS *******************************************//
elSearchForm.addEventListener("input", function (evt) {
	evt.preventDefault();
	searchPost = [];

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

//********************************* CHANGE BUTTON POSTS *******************************************//
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

//********************************* DELETE BUTTON POSTS *******************************************//
elCards.addEventListener("click", (evt) => {
	const target = evt.target;

	let newPosts = [];
	if (target.className.includes("delete-btn")) {
		const id = Number(target.dataset.id);

		posts.forEach((post) => {
			if (post.id !== id) {
				newPosts.push(post);
			}
		});
		posts = newPosts;
		renderPosts(posts);
	}

	//********************************* EDITE BUTTON POSTS *******************************************//

	if (target.className.includes("btn-success")) {
		const id = Number(target.dataset.id);

		posts.forEach((post) => {
			if (post.id === id) {
				//
				const uzbGenre = elEdite.querySelector("#uzbekistan");
				const siyosatGenre = elEdite.querySelector("#siyosat");
				const sportGenre = elEdite.querySelector("#sport");
				const editBtn = document.querySelector("#editBtn");

				const image = elEdite.image;
				const title = elEdite.title;
				const description = elEdite.description;
				const genres = post.genres;
				const genreElement = elEdite.genres;
				//

				image.value = post.image;
				title.value = post.title;
				description.value = post.description;
				genres.value = post.genres;

				uzbGenre.checked = false;
				siyosatGenre.checked = false;
				sportGenre.checked = false;

				if (genres.includes("Uzbekistan")) {
					uzbGenre.checked = true;
				}

				if (genres.includes("Sport")) {
					sportGenre.checked = true;
				}

				if (genres.includes("Siyosat")) {
					siyosatGenre.checked = true;
				}

				//********************************* CHANGE BUTTON POSTS *******************************************//
				editBtn.addEventListener("click", (evt) => {
					const newGenres = [];

					for (let i = 0; i < genreElement.length; i++) {
						const element = genreElement[i];
						if (element.checked) {
							newGenres.push(element.value);
						}
					}

					const newPost = {
						id: post.id,
						image: image.value,
						title: title.value,
						description: description.value,
						date: post.date,
						genres: newGenres,
					};

					posts[id - 1] = newPost;

					renderPosts(posts);
				});
			}
		});
	}
});
