document.addEventListener("DOMContentLoaded", function () {
  const accessKey = "vXOkxXWRK9pfBCu62ce6sZLXHBv0GVO8DMVmzvDPKGRcIvm9i7nTAZRv";

  const formElm = document.querySelector("form");
  const inputElm = document.querySelector("#input-search");
  const searchResults = document.querySelector(".search-results");

  let page = 1;

  formElm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputData = inputElm.value.trim(); // Retrieve input field value
    if (inputData) {
      page = 1;
      searchImages(inputData); // Fetch based on user input
    }
  });

  async function searchVideos(inputData) {
    const perPage = 50;
    const url = `https://api.pexels.com/videos/search?query=${inputData}&per_page=${perPage}&page=${page}`;

    const response = await fetch(url, {
      headers: { Authorization: accessKey },
    });

    const data = await response.json();
    const results = data.videos;
    searchResults.innerHTML = "";

    results.forEach((result) => {
      const videoWrapper = document.createElement("div");
      videoWrapper.classList.add("video-box");

      const video = document.createElement("video");
      video.src = result.video_files[0].link;
      video.loop = true;
      video.muted = true;

      video.addEventListener("mouseenter", () => video.play());
      video.addEventListener("mouseleave", () => video.pause());

      videoWrapper.appendChild(video);
      searchResults.appendChild(videoWrapper);
    });

    page++;
  }

  async function searchImages(inputData) {
    const perPage = 50;
    const url = `https://api.pexels.com/v1/search?query=${inputData}&per_page=${perPage}&page=${page}`;

    const response = await fetch(url, {
      headers: { Authorization: accessKey },
    });

    const data = await response.json();
    const results = data.photos;
    searchResults.innerHTML = "";

    results.forEach((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("img-box");

      const image = document.createElement("img");
      image.src = result.src.small;

      imageWrapper.appendChild(image);
      searchResults.appendChild(imageWrapper);
    });

    page++;
  }

  const images = document.querySelector(".images");
  images.addEventListener("click", () => {
    const inputData = inputElm.value.trim();
    if (inputData) searchImages(inputData);
  });

  const videos = document.querySelector(".videos");
  videos.addEventListener("click", () => {
    const inputData = inputElm.value.trim();
    if (inputData) searchVideos(inputData);
  });

  // ✅ Fetch default results when the page first loads
  const defaultSearch = "nature"; // You can change this keyword
  searchImages(defaultSearch);
});
