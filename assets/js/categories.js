document.addEventListener("DOMContentLoaded", function () {
  const kategoriler = [
    "Sanat ve tarih müzeleri",
    "Galeriler",
    "Sergi ve Bienaller",
    "Antikacılar",
    "Barlar",
    "Kafeler",
    "Yürüyüş",
    "Dağcılık",
    "Kamp",
    "Bisiklet Sürme",
    "Sörf",
    "Deniz Kayağı",
    "Rafting",
    "Oyun Salonları",
    "Lunapark",
    "Bowling Salonu",
    "Video Oyunları",
    "Camii",
    "Kilise",
    "Sinagoglar",
    "Havra",
    "Saraylar",
    "Çiftlikler",
    "Hayvanat Bahçesi",
    "Botanik Bahçeleri",
    "Doğal Parklar",
    "Futbol",
    "Basketbol",
    "Yüzme",
    "Koşu",
    "Yoga",
    "Fitness",
  ];

  const selectElement = document.getElementById("kategoriSelect");

  kategoriler.forEach((kategori) => {
    const option = document.createElement("option");
    option.value = kategori.value;
    option.textContent = kategori.label;
    applyCustomStyles(option); // applyCustomStyles fonksiyonunu çağırarak stil uyguluyoruz
    selectElement.appendChild(option);
  });

  // NiceSelect pluginini yeniden başlatma (isteğe bağlı, eğer kullanıyorsanız)
  if (typeof niceSelect !== "undefined") {
    niceSelect("select.has-nice-select");
  }
});

function applyCustomStyles(option) {
  option.classList.add("custom-option", "selected", "focus", "nice-select", "open", "list");

  option.style.cursor = "pointer";
  option.style.fontWeight = "500";
  option.style.lineHeight = "clamp(32px, 2.083vw, 45px)";
  option.style.listStyle = "none";
  option.style.minHeight = "clamp(32px, 2.083vw, 45px)";
  option.style.outline = "none";
  option.style.color = "#0D0D0C";
  option.style.paddingLeft = "clamp(12px, 0.83vw, 18px)";
  option.style.paddingRight = "clamp(24px, 1.5vw, 30px)";
  option.style.textAlign = "left";
  option.style.transition = "all 0.2s";
}
