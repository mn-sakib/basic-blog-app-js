const authorInput = document.querySelector("#authorInput");
const titleInput = document.querySelector("#titleInput");
const textInput = document.querySelector("#textInput");
const createBtn = document.querySelector("#createBtn");

const getTime = new Date().getTime();
console.log(getTime);

const API_URL = "http://localhost:3000/posts";

async function createPost() {
  const posts = {
    author: authorInput.value.trim(),
    title: titleInput.value.trim(),
    post: textInput.value.trim(),
    time: getTime,
  };
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(posts),
    });
    if (!res.ok) {
      throw new Error("System fault detected! Your post is not published!");
    }
    const data = await res.json();
    console.log(data);
  } catch (err) {}
}

createBtn.addEventListener("click", () => {
  if (titleInput.value.trim() === "" || textInput.value.trim() === "") {
    console.log("Please enter title and description!");
  } else {
    createPost();
  }
});

async function fetchPosts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function createPostElements(post) {
  const row = document.createElement("div");
  row.className = "row mb-4";

  const col = document.createElement("div");
  col.className = "col-lg-7 mx-auto";

  const card = document.createElement("div");
  card.className = "card border-0 shadow-sm";
  card.style.borderRadius = "16px";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body p-4";

  const profileDiv = document.createElement("div");
  profileDiv.className = "d-flex align-items-center mb-3";

  const profileImg = document.createElement("img");
  profileImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    post.author
  )}&background=random`;
  profileImg.className = "rounded-circle";
  profileImg.width = 40;
  profileImg.height = 40;
  profileImg.style = "border: 2px solid #fff; box-shadow: 0 0 0 2px #4338ca";
  profileImg.alt = "Profile";

  const profileInfo = document.createElement("div");
  profileInfo.className = "ms-3";

  const authorName = document.createElement("h6");
  authorName.className = "mb-0 fw-semibold";
  authorName.textContent = post.author;

  const postTime = document.createElement("small");
  postTime.className = "text-muted";
  postTime.textContent = `Posted ${post.time} ago`;

  const postTitle = document.createElement("h6");
  postTitle.className = "fw-semibold mb-2";
  postTitle.textContent = post.title;

  const postContents = document.createElement("p");
  postContents.className = "text-muted mb-3";
  postContents.textContent = post.post;

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "d-flex gap-2";

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-light px-3 py-1 border";
  editBtn.innerHTML = '<i class="fas fa-edit me-2"></i>Edit';

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-light px-3 py-1 border";
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt me-2"></i>Delete';
  deleteBtn.addEventListener("click", async () => {
    const res = await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "DELETE",
    });
    const data = res.json();
  });

  profileInfo.appendChild(authorName);
  profileInfo.appendChild(postTime);
  profileDiv.appendChild(profileImg);
  profileDiv.appendChild(profileInfo);

  buttonsDiv.appendChild(editBtn);
  buttonsDiv.appendChild(deleteBtn);

  cardBody.appendChild(profileDiv);
  cardBody.appendChild(postTitle);
  cardBody.appendChild(postContents);
  cardBody.appendChild(buttonsDiv);

  card.appendChild(cardBody);
  col.appendChild(card);
  row.appendChild(col);

  return row;
}

async function loadPostAndDisplayPosts() {
  const displayPost = document.querySelector("#post-container");
  const data = await fetchPosts();

  data.forEach((post) => {
    const element = createPostElements(post);
    displayPost.appendChild(element);
  });
}
document.addEventListener("DOMContentLoaded", loadPostAndDisplayPosts());
