document.addEventListener("DOMContentLoaded", () => {
    fetch("/videos")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("video-container");

            data.forEach(video => {
                const wrapper = document.createElement("div");
                const title = document.createElement("h3");
                title.textContent = video.title;
                const vid = document.createElement("video");

                vid.src = video.file_path;
                vid.controls = true;
                vid.width = 480;

                wrapper.appendChild(title);
                wrapper.appendChild(vid);
                container.appendChild(wrapper);
            });
        })
        .catch(error =>{
      console.error("Error loading videos:", error);
    });
});