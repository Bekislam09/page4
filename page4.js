const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("captureBtn");

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Ошибка доступа к камере:", err);
    });

captureBtn.addEventListener("click", () => {
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob(uploadToServer, "image/jpeg");
});

async function uploadToServer(file) {
    const formData = new FormData();
    formData.append("file", file);

    await fetch("https://your-server.com/upload", {
      method: "POST",
      body: formData,
    });
}
