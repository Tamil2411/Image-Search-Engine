const search = document.querySelector('#search');
const search_btn = document.querySelector('#search-btn');
const img_container = document.querySelector('.img-container');

search_btn.addEventListener('click', async () => {
  const search_value = search.value.trim();
  if (search_value === '') {
    alert('Please enter a search term');
    return;
  }

  img_container.innerHTML = '<p style="color:white; font-size:20px;">Loading images...</p>';

  const key = 'RuJTeKhXAyF9G-9VlCJJv1NlEMuCgGCDgIS-2Brjv3E';
  const url = `https://api.unsplash.com/search/photos?page=1&query=${search_value}&client_id=${key}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayImages(data);
  } catch (error) {
    console.error("Error fetching images:", error);
    img_container.innerHTML = "<p style='color:white;'>Failed to load images. Try again later.</p>";
  }
});

function displayImages(data) {
  img_container.innerHTML = '';
  if (data.results.length === 0) {
    img_container.innerHTML = "<p style='color:white;'>No images found!</p>";
    return;
  }

  data.results.forEach(element => {
    const img = document.createElement('img');
    img.src = element.urls.regular;
    img.alt = element.alt_description || "Image";
    img.onload = () => img.classList.add('loaded'); // 🔥 animation trigger
    img_container.appendChild(img);
  });
}
