document.addEventListener("DOMContentLoaded", () => {
    const previewContainer = document.getElementById("preview_video");
    const previewList = document.getElementById("previews");

    const videoMap = {
        zoom:     { title: "Zoom-In",       path: "/videos/zoom.mp4" },
        circular: { title: "Circular Pan",  path: "/videos/circle.mp4" },
        swing:    { title: "Swing",         path: "/videos/swing.mp4" },
        dolly:    { title: "Dolly Zoom",    path: "/videos/dolly.mp4" }
    };

    previewList.addEventListener("click", (e) => {
        const li = e.target.closest("li");
        if (!li || !videoMap[li.id]) return;

        const { title, path } = videoMap[li.id];

        previewContainer.innerHTML = "";

        const titleElement = document.createElement("h3");
        titleElement.textContent = title;

        const videoElement = document.createElement("video");
        videoElement.src = path;
        videoElement.controls = true;
        videoElement.width = 480;
        videoElement.autoplay = true;

        previewContainer.appendChild(titleElement);
        previewContainer.appendChild(videoElement);
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
    const choose = document.getElementById('choose_image');
    preview.style.backgroundImage = `url(${data.image_url})`;
    preview.style.backgroundSize = 'cover';
    preview.style.backgroundPosition = 'center';
    choose.style.height = '400px';
    choose.style.width = '500px';
    choose.style.text = ' ';
    choose.style.opacity = '0';
    choose.value = '';

    document.getElementById('previews').classList.add('show');
    document.getElementById('upload').classList.remove('show');

  })
  .catch(error => console.error('Fel vid uppladdning:', error));
});

document.getElementById('choose_image').addEventListener('change', function(e){

const uploadButton = document.getElementById('upload');


 if (this.files.length > 0) {
        uploadButton.classList.add('show');

    }
});