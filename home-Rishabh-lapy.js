document.addEventListener("DOMContentLoaded", function () {
  // 🔑 Pexels API key (needed for authentication)
  const accessKey = "vXOkxXWRK9pfBCu62ce6sZLXHBv0GVO8DMVmzvDPKGRcIvm9i7nTAZRv";

  // 📌 DOM elements
  const formElm = document.querySelector("form");          // Search form
  const inputElm = document.querySelector("#input-search"); // Input field
  const searchResults = document.querySelector(".search-results"); // Div where results will show

  let page = 1; // Keeps track of which page of results we are on

  // 🔍 Handle form submission (when user searches and presses Enter)
  formElm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents page from reloading
    const inputData = inputElm.value; // Gets text from input
    page = 1; // Reset to page 1 for a new search
    searchImages(inputData); // Call image search function
  });

  // 🎥 Function to fetch and show VIDEOS
  async function searchVideos(inputData) {
    const perPage = 50; // Number of videos per request
    const url = `https://api.pexels.com/videos/search?query=${inputData}&per_page=${perPage}&page=${page}`;

    // 📡 API request with access key
    const response = await fetch(url, {
      headers: { Authorization: accessKey },
    });
    const data = await response.json();

    const results = data.videos; // Extract videos array

    // ❌ Clear previous search results before adding new ones
    searchResults.innerHTML = "";

    // 🖼 Loop through each video result
    results.forEach((result) => {
      const videoWrapper = document.createElement("div");
      videoWrapper.classList.add("video-box");

      const video = document.createElement("video");
      video.src = result.video_files[0].link; // Get video file link
      video.setAttribute("loop", true);
      video.setAttribute("muted", true);

      // ▶ Play on hover
      video.addEventListener("mouseenter", () => video.play());
      // ⏸ Pause when mouse leaves
      video.addEventListener("mouseleave", () => video.pause());

      videoWrapper.appendChild(video);
      searchResults.appendChild(videoWrapper);
    });

    page++; // Next page for infinite scroll (if added later)
  }

 // 🖼 Function to fetch and show IMAGES
async function searchImages(inputData) {
  const perPage = 50; // Number of images per request
  const url = `https://api.pexels.com/v1/search?query=${inputData}&per_page=${perPage}&page=${page}`;

  // 📡 API request
  const response = await fetch(url, {
    headers: { Authorization: accessKey },
  });

  const data = await response.json();
  const results = data.photos; // Extract photos array

  // ❌ Clear old results before showing new ones
  searchResults.innerHTML = "";

  // 🖼 Loop through each image result
  results.forEach((result) => {
    // wrapper for one media item
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("media-box");

    // image itself
    const image = document.createElement("img");
    image.src = result.src.small; // Use small size for thumbnails

    // overlay div (hidden until hover)
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    // like button
    const likeBtn = document.createElement("button");
    likeBtn.classList.add("like-btn");
    likeBtn.innerHTML = "❤️";
    likeBtn.addEventListener("click", () => {
      alert("Liked this image!");
    });

    // download button
    const downloadBtn = document.createElement("button");
    downloadBtn.classList.add("download-btn");
    downloadBtn.innerHTML = "⬇️";
    downloadBtn.addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = result.src.original; // full res download
      link.download = "image.jpg";
      link.click();
    });

    // append everything correctly
    overlay.appendChild(likeBtn);
    overlay.appendChild(downloadBtn);

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(overlay);

    searchResults.appendChild(imageWrapper);
  });

  page++; // Next page for future requests
}


  // 📌 Click event for "Images" tab
  const images = document.querySelector(".images");
  images.addEventListener("click", () => {
    const inputData = inputElm.value; // Take current input text
    searchImages(inputData); // Search images again
  });

  // 📌 Click event for "Videos" tab
  const videos = document.querySelector(".videos");
  videos.addEventListener("click", () => {
    const inputData = inputElm.value; // Take current input text
    searchVideos(inputData); // Search videos again
  });

  // 🚀 Load default images when page first opens
  // You can change "popular" → "cats" / "nature" / "city" etc.
  searchImages("popular");

  const videos_text = document.querySelector(".videos");
  videos_text.addEventListener("click", () => {
    searchVideos("popular"); 
  });
});
