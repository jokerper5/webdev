const modal = document.getElementById("submissionModal");
  const openBtn = document.getElementById("openModal");
  const closeBtn = document.querySelector(".submission-close");
  const fileInput = document.getElementById("fileUpload");
  const uploadBox = document.querySelector(".upload-box");
  const submitBtn = document.querySelector(".submit-btn");

  openBtn.onclick = () => {
    modal.style.display = "block";
  };

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  fileInput.onchange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadBox.innerHTML = `<img src="${e.target.result}" alt="preview" style="max-width:100%; max-height:200px; display:block; margin:auto;" />`;
      };
      reader.readAsDataURL(file);
    } else {
      uploadBox.innerHTML = `<p>File not supported. Please upload an image.</p>`;
    }
  };

 submitBtn.onclick = () => {
  const medium = document.getElementById("medium").value.trim();
  const description = document.getElementById("description").value.trim();
  const title = document.getElementById("title").value.trim();

  if (!fileInput.files[0]) {
    alert("Please upload an image.");
    return;
  }

  if (!medium || !description || !title) {
    alert("Please complete all fields.");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const newArtwork = {
      title,
      description,
      medium,
      image: e.target.result // image as base64
    };

    let artworks = JSON.parse(localStorage.getItem("artworks") || "[]");
    artworks.push(newArtwork);
    localStorage.setItem("artworks", JSON.stringify(artworks));

    alert("Your work has been submitted!");
    modal.style.display = "none";

    // reset form
    fileInput.value = '';
    document.getElementById("medium").selectedIndex = 0;
    document.getElementById("description").value = '';
    document.getElementById("title").value = '';
    uploadBox.innerHTML = `
      <label for="fileUpload" class="upload-label">
        <div class="upload-icon">&#8682;</div>
        <div>UPLOAD YOUR FILE (MAXIMUM OF 10 MB)</div>
      </label>`;

    // redirect to gallery
    window.location.href = "gallery.html";
  };

  reader.readAsDataURL(file);
};
