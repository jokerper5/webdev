  function openPopup(title, description, type, imgSrc) {
      document.getElementById("popupTitle").innerText = title;
      document.getElementById("popupDescription").innerText = description;
      document.getElementById("popupType").innerText = type;
      document.getElementById("popupImg").src = imgSrc;
      document.getElementById("popup").style.display = "flex";
    }

    function closePopup() {
      document.getElementById("popup").style.display = "none";
    }

 // test
  window.addEventListener("DOMContentLoaded", () => {
  const artworks = JSON.parse(localStorage.getItem("artworks") || "[]");
  const gallery = document.getElementById("gallery");

  artworks.forEach((artwork) => {
    const card = document.createElement("div");
    card.className = "artwork-card";
    card.onclick = () => openPopup(artwork.title, artwork.description, artwork.medium, artwork.image);

    const img = document.createElement("img");
    img.src = artwork.image;
    img.alt = artwork.title;

    const h3 = document.createElement("h3");
    h3.textContent = artwork.title;

    card.appendChild(img);
    card.appendChild(h3);
    gallery.appendChild(card);
  });
});

    