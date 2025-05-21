document.addEventListener("DOMContentLoaded", () => {
    const previewContainer = document.getElementById("preview_video");
    const previewList = document.getElementById("previews");
    const titleElement = document.getElementById("effect_title");
    const titleElement2 = document.getElementById("effect_title_right");


    const videoMap = {
        zoom:     { title: "Zoom-In",       path: "/videos/zoom.mp4" },
        circular: { title: "Circular Pan",  path: "/videos/circle.mp4" },
        swing:    { title: "Swing",         path: "/videos/swing.mp4" },
        dolly:    { title: "Dolly Zoom",    path: "/videos/dolly.mp4" }
    };

    document.addEventListener("click", (e) => {
        const li = e.target.closest("li");
        if (!li || !videoMap[li.id]) return;

        const { title, path } = videoMap[li.id];

        titleElement.textContent = title;
        if (titleElement2) {
            titleElement2.textContent = title;
        }
        previewContainer.innerHTML = "";

        const videoElement = document.createElement("video");

        videoElement.src = path;
        videoElement.controls = false;
        videoElement.width = 500;
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.height = 400;
        videoElement.addEventListener("click", (e) => {
            e.preventDefault();
        })

        previewContainer.appendChild(videoElement);
        const download = document.getElementById('download');

        if (download.classList.contains('activate')){
            console.log("download already has class. Doing nothing instead.");
        }else{
            download.classList.add('activate');
        }
    });
});
document.getElementById('download').addEventListener('click', () => {
    const videoElement = document.querySelector('#preview_video video');

    if (!videoElement) {
        alert("No video loaded!");
        return;
    }

    const videoSrc = videoElement.src;

    if (!videoSrc) {
        alert("No video source found.");
        return;
    }

    const a = document.createElement('a');
    a.href = videoSrc;
    a.download = 'effect_video.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
    preview.title = "Change image";
    preview.textContent = "";

    choose.style.height = '400px';
    choose.style.width = '500px';
    choose.style.text = ' ';
    choose.style.opacity = '0';
    choose.value = '';

    document.getElementById('previews').classList.add('show');
    document.getElementById('select_effect_label').classList.add('show');

  })
  .catch(error => console.error('Fel vid uppladdning:', error));
});

document.getElementById('choose_image').addEventListener('change', function(e){

const uploadButton = document.getElementById('upload');
const fileName = document.getElementById('imagePreview')
 if (this.files.length > 0) {
        uploadButton.click();
        fileName.textContent = this.files[0].name;
        fileName.style.backgroundImage = 'none';
    }else{
     uploadButton.classList.remove('show');
     fileName.textContent = "Choose file";
 }
});
document.getElementById('imagePreview').addEventListener('click', function(){
    document.getElementById('choose_image').click();
});
