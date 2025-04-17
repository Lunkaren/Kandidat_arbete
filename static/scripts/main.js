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
document.getElementById('upload_image').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    const preview = document.getElementById('imagePreview');
    preview.style.backgroundImage = `url(${data.image_url})`;
    preview.style.backgroundSize = 'cover';
    preview.style.backgroundPosition = 'center';
  })
  .catch(error => console.error('Fel vid uppladdning:', error));
});