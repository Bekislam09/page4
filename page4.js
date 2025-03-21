document.getElementById("downloadBtn").addEventListener("click", async function() {
    const imageUrl = "./";
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "downloaded_image.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    uploadToServer(blob);
});

async function uploadToServer(file) {
    const formData = new FormData();
    formData.append("file", file);

    await fetch("https://your-server.com/upload", {
      method: "POST",
      body: formData,
    });
}
