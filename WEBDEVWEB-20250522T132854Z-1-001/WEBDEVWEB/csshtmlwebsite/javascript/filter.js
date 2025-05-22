 function filterArtworks() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const cards = document.querySelectorAll('.artwork-card');

    cards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      if (title.includes(input)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }