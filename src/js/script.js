// ── 1. TYPEWRITER (YAZI) EFFEKTİ ──
const textToType = "Sağlamlıq, gözəllik və enerji üçün Azərbaycan brendi.";
const typewriterElement = document.getElementById("typewriter");
let charIndex = 0;

function typeWriterEffect() {
  if (typewriterElement && charIndex < textToType.length) {
    typewriterElement.textContent += textToType.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriterEffect, 70); // Yazı sürəti (milisaniyə)
  }
}

// Səhifə tam hazır olduqda işə sal
document.addEventListener("DOMContentLoaded", () => {
  typeWriterEffect();

  // Mobil Hamburger Menü Proqramlaşdırılması
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("mainNav");
  if (hamburger && mainNav) {
    hamburger.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }
});

// ── 2. PREMIUM DİL SEÇİM MENYUSU FUNKSİONALLIĞI ──
const langSelect = document.getElementById("langSelect");
const langTrigger = document.getElementById("langTrigger");
const langOptions = document.querySelectorAll(".custom-option");

if (langTrigger && langSelect) {
  // Seçim siyahısını aç/bağla
  langTrigger.addEventListener("click", (event) => {
    event.stopPropagation();
    langSelect.classList.toggle("open");
  });

  // Dillərdən biri seçildikdə interfeysi yenilə
  langOptions.forEach((option) => {
    option.addEventListener("click", function () {
      langOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      langSelect.classList.remove("open");

      const flagUrl = this.querySelector("img").src;
      const langCode = this.dataset.value.toUpperCase();

      langTrigger.innerHTML = `
        <img src="${flagUrl}" class="flag-icon" alt="${langCode}"> 
        <span>${langCode}</span> 
        <div class="arrow"></div>
      `;

      // Hər hansı bir dil dəyişmə məntiqini bura yaza bilərsiniz:
      console.log("Seçilən yeni dil kodu:", this.dataset.value);
    });
  });

  // Ekranda kənara kliklədikdə menyunun bağlanması
  window.addEventListener("click", () => {
    langSelect.classList.remove("open");
  });
}

// ── 3. SPIDER WEB ANIMASIYASI (Z-INDEX PROBLEMİ HƏLL OLUNDU) ──
const canvas = document.getElementById("spiderWebCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  const particleCount = 75; // Şəbəkənin sıxlığı
  const connectionRadius = 140; // Xətlərin birləşəcəyi maksimum məsafə

  function adjustCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", adjustCanvasSize);
  adjustCanvasSize();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.speedX = (Math.random() - 0.5) * 0.6; // X oxu üzrə zərif sürət
      this.speedY = (Math.random() - 0.5) * 0.6; // Y oxu üzrə zərif sürət
      this.size = Math.random() * 2 + 1.5;
    }

    move() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Ekrana dəyib geri qayıtma
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    render() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(16, 185, 129, 0.45)"; // Təbii bio-yaşıl nöqtələr
      ctx.fill();
    }
  }

  // Nöqtələri generasiya etmək
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function drawWebStructure() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.move();
      p.render();
    });

    // Nöqtələri incə xətlərlə şəbəkə şəklində bağlamaq
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const distance = Math.hypot(
          particles[i].x - particles[j].x,
          particles[i].y - particles[j].y,
        );

        if (distance < connectionRadius) {
          // İşıqlı fonda möhtəşəm görünən incə yaşıl xətlər
          const lineOpacity = (1 - distance / connectionRadius) * 0.28;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(16, 185, 129, ${lineOpacity})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawWebStructure);
  }
  drawWebStructure();
}
// ── 4. PREMIUM SCROLL REVEAL ANIMASIYASI ──
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-element");

  const revealOnScroll = () => {
    const triggerBottom = (window.innerHeight / 5) * 4.2; // Elementin görünmə limiti

    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        el.classList.add("active");
      }
    });
  };

  // İlk açılışda və hər scroll edildikdə yoxla
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Səhifə yüklənəndə görünən sahədəkiləri dərhal aç
}

// Mövcud DOMContentLoaded daxilinə əlavə edirik:
document.addEventListener("DOMContentLoaded", () => {
  typeWriterEffect();
  initScrollReveal(); // <--- BU SƏTRİ ƏLAVƏ ET

  // Mobil Hamburger Menü Proqramlaşdırılması
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("mainNav");
  if (hamburger && mainNav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active"); // Hamburger 'X' animasiyası üçün
      mainNav.classList.toggle("active");
    });
  }
});

function createProductCard(product) {
  // Mövcud rəylərdən datanı çəkir, tapılmasa default dəyər verir
  const review = productReviews[product.id] || {
    name: "Müştəri",
    stars: 5,
    text: "Bu məhsulu yüksək qiymətləndiririk.",
  };

  // Dinamik ulduz generasiyası
  const starsHtml = Array(review.stars)
    .fill('<span class="star">★</span>')
    .join("");

  const card = document.createElement("article");
  card.className = "product-card reveal-element"; // Scroll-reveal animasiya dəstəyi ilə

  card.innerHTML = `
          <div class="product-img-wrapper">
            <span class="category-badge">${product.category}</span>
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
          </div>
          <div class="product-info">
            <h3>${product.name}</h3>
            
            <div class="review-chip">
              <div class="review-stars">${starsHtml}</div>
              <div class="review-name">${review.name}</div>
              <div class="review-text">“${review.text}”</div>
            </div>
          </div>
        `;

  // Modalı açmaq üçün klik hadisəsi
  card.addEventListener("click", () => showProduct(product));
  return card;
}

// 1. DATA MASSİVİ VƏ MÜŞTƏRİ RƏYLƏRİ (Eynilə qorunub)
const products = [
  {
    id: 1,
    name: "Tianshi Lipid Metabolic Management Tea",
    category: "Detoks və balans",
    image:
      "https://strgimgr.umico.az/img/product/1680/85297819-bda3-4211-b082-9d2dc5b71204.jpeg",
    description:
      "Yaşıl çay, zəncəfil və uğurlu bitki ekstraktları ilə hazırlanmış funksional içki, lipid metabolizmini tarazlayır və enerji verir.",
    composition:
      "Yaşıl çay, limon otu, zəncəfil, alma sirkəsi tozu, bitki ekstraktları, vitamin B və C.",
    benefits:
      "Metabolizmi sürətləndirir. Xolesterini tarazlayır. Enerji verir. Həzmi normallaşdırır. Şişkinliyi azaldır.",
    usage:
      "Gündə 1 stəkan isti suya 1 çay qaşığı qarışım əlavə edib yeməkdən əvvəl və ya sonra içmək.",
  },
  {
    id: 2,
    name: "Tianshi Slimming Tea",
    category: "Çəki nəzarəti",
    image:
      "https://strgimgr.umico.az/img/product/1680/1c5b8a25-08c0-4f7f-b3c8-ba83bf5a25ef.jpeg",
    description:
      "Zəncəfil və nanə ilə zənginləşdirilmiş incələnmə çayı metabolik tarazlığı gücləndirir və şişkinliyi aradan qaldırır.",
    composition:
      "Yer kökü, yaşıl çay, nanə, zəncəfil, bitki ekstraktları, təbii liflər.",
    benefits:
      "Çəki və yağ balansını dəstəkləyir. Maye və toksinləri xaric edir. Həzm sistemini asanlaşdırır.",
    usage:
      "Gündə 1 dəfə, yeməkdən 30 dəqiqə sonra isti şəkildə içmək tövsiyə olunur.",
  },
  {
    id: 3,
    name: "Tiens Multi Fiber Chewable Tablets",
    category: "Bəslənmə və həzm",
    image:
      "https://tiens.az/wp-content/uploads/2025/12/Tiens-Multi-Fiber-Chewable-Tablet.png",
    description:
      "Probiyotik liflər və təbii qida komponentləri ilə həzmi dəstəkləyən çeynənən tabletlər.",
    composition: "Psyllium, pektin, inulin, vitamin C, probiotik fermentlər.",
    benefits:
      "Bağırsaq florasını tarazlayır. Qəbizliyi azaldır. Həzm funksiyasını yaxşılaşdırır. Toksinlərin təmizlənməsini dəstəkləyir.",
    usage: "Gündə 1 tablet yeməkdən sonra çeynəyin və ya su ilə qəbul edin.",
  },
  {
    id: 4,
    name: "Tiens Chitosan Capsules",
    category: "Pəhriz və dəstək",
    image:
      "https://strgimgr.umico.az/sized/1680/881183-b40663d7b9ef893bf46721689b263c13.jpg",
    description:
      "Təbii chitosan və bitki ekstraktları ilə yağ və karbonhidratların udulumunu azaldan dəstək formul.",
    composition:
      "Chitosan, qara bibər ekstraktı, probiotik ənzimlər, bitki lifləri.",
    benefits:
      "Çəki nəzarətini asanlaşdırır. Toxumluq hissi yaradır. Karbonhidrat və yağın qatılmasını azaldır.",
    usage:
      "Yeməkdən 30 dəqiqə əvvəl 1 kapsul qəbul edin, gün ərzində kifayət qədər su için.",
  },
  {
    id: 5,
    name: "Tiens Cell Rejuvenation Capsules",
    category: "Gözəllik və gənclik",
    image:
      "https://strgimgr.b-cdn.net/sized/840/731100-be87cf7ea926be0d2c0497eb348b6ef6.jpg?width=384&height=384&quality=90",
    description:
      "Antioksidant kompleksi hüceyrə yenilənməsini və dərinin parıltısını dəstəkləyir.",
    composition:
      "Qarpız toxumu ekstraktı, maralboynuzu, vitamin E, kollagen sintezini dəstəkləyən maddələr.",
    benefits:
      "Dəri elastikliyini artırır. Qırışları azaldır. Parlaq və gənc görünüş yaradır.",
    usage: "Gündə 1 kapsul yeməkdən sonra qəbul edin.",
  },
  {
    id: 6,
    name: "Tiens Grape Extract Capsules",
    category: "Antioksidant",
    image:
      "https://strgimgr.b-cdn.net/sized/840/881181-5c3c4a275c1abca24846acd541deb042.jpg?width=384&height=384&quality=90",
    description:
      "Üzüm toxumu ekstraktı ilə zəngin kapsulalar sərbəst radikallara qarşı hüceyrə müdafiəsini artırır.",
    composition:
      "Üzüm toxumu ekstraktı, bioflavonoidlər, vitamin C, polifenollar və təbii antioksidantlar.",
    benefits:
      "Hüceyrələri sərbəst radikallardan qoruyur. Qan dövranını yaxşılaşdırır. Dəri parıltısını yüksəldir.",
    usage: "Gündə 1 kapsul yeməkdən sonra qəbul edin.",
  },
  {
    id: 7,
    name: "Tiens Vitality Softgels",
    category: "Enerji və immunitet",
    image:
      "https://im-storage.jikeint.com/tiens_global/tiens_group/products/en/healthy-food/bjsp_10.png",
    description:
      "Enerji və immunitet üçün nəzərdə tutulmuş yumşaq kapsulalarda vitamin və minerallar birləşdirilib.",
    composition:
      "Vitamin B6, sink, C vitamini, ginseng ekstraktı və omega yağ turşuları.",
    benefits:
      "Enerji səviyyəsini artırır. İmmuniteti gücləndirir. Yorğunluğu azaldır. Zehni fokus yaradır.",
    usage: "Səhər yeməyindən sonra 1 kapsul qəbul edin.",
  },
  {
    id: 8,
    name: "Tiens Cordyceps Capsules",
    category: "Enerji və sport",
    image:
      "https://strgimgr.umico.az/sized/1680/773132-b30950f44ba8ad5003826b406b101f23.jpg",
    description:
      "Cordyceps mantarı ekstraktı ilə hazırlanmış kapsulalar fiziki gücü və bərpa prosesini dəstəkləyir.",
    composition:
      "Cordyceps ekstraktı, vitamin B kompleksi, minerallar, təbii gücləndiricilər.",
    benefits:
      "Dözümlüyü artırır. Əzələ performansını yaxşılaşdırır. Enerji səviyyəsini yüksəldir.",
    usage: "Gündə 1 kapsul səhər və ya axşam qəbul edin.",
  },
  {
    id: 9,
    name: "Tianshi Spirulina Capsules",
    category: "Vitamin və minerallar",
    image:
      "https://strgimgr.umico.az/sized/1680/881180-3b5ef63d402fb0234055f1d7e326a53d.jpg",
    description:
      "Spirulina və mikroalqlarla zəngin kapsulalar orqanizmə vitamin və mineral dəstəyi verir.",
    composition: "Spirulina, A vitamini, B vitaminləri, dəmir və minerallar.",
    benefits:
      "Enerji verir. İmmuniteti gücləndirir. Dəri və saç sağlamlığını dəstəkləyir.",
    usage: "Gündə 2 kapsul yeməkdən sonra qəbul edin.",
  },
  {
    id: 10,
    name: "Tiens Fructooligosaccharide",
    category: "Həzm və flora",
    image:
      "https://strgimgr.b-cdn.net/img/product/840/d236a3cd-5049-4383-b768-6284aa0c0937.jpeg?width=384&height=384&quality=90",
    description:
      "FOS prebiotik tozu bağırsaq florasını və həzm sistemini dəstəkləyir.",
    composition: "Fruktooligosaxarid, təbii qida lifləri və inulin.",
    benefits:
      "Həzm funksiyasını yaxşılaşdırır. Bağırsaq florasını tarazlayır. İmmuniteti dəstəkləyir.",
    usage: "Gündə 1 çay qaşığı suya, südə və ya yoğurda əlavə edin.",
  },
  {
    id: 11,
    name: "Tiens Zinc Capsules",
    category: "İmmunitet",
    image:
      "https://strgimgr.b-cdn.net/sized/840/716047-5c325b184240557320a33c05be3f6ba2.jpg?width=384&height=384&quality=90",
    description:
      "Sink və vitaminlərlə zəngin kapsulalar immun funksiyalarını və dəri sağlamlığını gücləndirir.",
    composition: "Sink, vitamin C və mineral komplekslər.",
    benefits:
      "İmmuniteti gücləndirir. Dəri və saç sağlamlığını dəstəkləyir. Fiziki dirənişi artırır.",
    usage: "Gündə 1 kapsul yeməkdən sonra qəbul edin.",
  },
  {
    id: 12,
    name: "Tiens Nutrient Super Calcium Powder",
    category: "Kalsium və sümük",
    image:
      "https://strgimgr.b-cdn.net/sized/840/716049-0e6e3d72cd5ddc2c392d8825a1dcd962.jpg?width=384&height=384&quality=90",
    description:
      "Kalsium, D vitamini və minerallarla zəngin toz sümük və diş sağlamlığını dəstəkləyir.",
    composition: "Kalsium, D vitamini, sink, maqnezium və fosfor.",
    benefits:
      "Sümük və diş sağlamlığını qoruyur. Əzələ funksiyasını dəstəkləyir. Enerji verir.",
    usage: "Gündə 1 ölçü qaşığı suya qarışdırın və ya süd ilə qəbul edin.",
  },
  {
    id: 13,
    name: "Tiens Super Calcium Powder for Children",
    category: "Uşaq sağlamlığı",
    image: "https://www.tiens-so.com/cdn/shop/products/cal3.webp?v=1654272650",
    description:
      "Uşaqlar üçün yumşaq dadlı kalsium tozu böyümə və sümük inkişafını dəstəkləyir.",
    composition: "Kalsium, vitamin D, vitamin C və təbii ləzzətləndiricilər.",
    benefits:
      "Sümük inkişafını dəstəkləyir. İmmuniteti gücləndirir. Enerjini artırır.",
    usage: "Gündə 1 ölçü qaşığı süd və ya suya qarışdırıb içirin.",
  },
  {
    id: 14,
    name: "Tiens Super Calcium Powder with Metabolic Factors",
    category: "Metabolizm",
    image:
      "https://img.drz.lazcdn.com/g/kf/S7048534c91134351841344d3be42155e6.jpg_720x720q80.jpg",
    description:
      "Kalsium və metabolik faktorlardan ibarət formul enerji və sümük sağlamlığını tarazlayır.",
    composition:
      "Kalsium, B vitamini kompleksi, bitki ekstraktları və maqnezium.",
    benefits:
      "Metabolizmi dəstəkləyir. Sümük sağlamlığını gücləndirir. Enerji balansını qoruyur.",
    usage: "Gündə 1 ölçü qaşığı suya qarışdırın.",
  },
  {
    id: 15,
    name: "Tiens Super Calcium Capsules with Lecithin",
    category: "Kalsium və beyin",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl__gGtiPcyGYG7QBMtVEnArLTb8tVPTE2Mg&s",
    description:
      "Kalsium və lecitinin sintezi beyin funksiyalarını və sümük sistemini dəstəkləyir.",
    composition: "Kalsium, lecitine, B vitaminləri və fosfolipidlər.",
    benefits:
      "Sümük sağlamlığını dəstəkləyir. Beyin funksiyalarını gücləndirir. Diqqəti artırır.",
    usage: "Gündə 1 kapsul qəbul edin.",
  },
  {
    id: 16,
    name: "Tiens Selenium Supplement Capsules",
    category: "Antioksidant",
    image:
      "https://strgimgr.umico.az/img/product/1680/68100aab-a9bc-4aab-a04e-e56edffdf969.jpeg",
    description:
      "Selen və antioksidantlarla zəngin kapsulalar hüceyrələri qoruyur və dəri sağlamlığını dəstəkləyir.",
    composition:
      "Selenium, vitamin E, bitki ekstraktları və mineral kofaktorlar.",
    benefits:
      "Antioksidant qoruma təmin edir. İmmuniteti gücləndirir. Dəri sağlamlığını saxlayır.",
    usage: "Gündə 1 kapsul yeməkdən sonra qəbul edin.",
  },
  {
    id: 17,
    name: "Tiens Glucosamine Capsules",
    category: "Oynaqlar",
    image: "https://m.media-amazon.com/images/I/41GWDnRowiL.jpg",
    description:
      "Qlukozamin və təbii dəstək komponentləri oynaq hərəkətini və rahatlığını artırır.",
    composition:
      "Qlukozamin, MSM, vitamin C və kollagen dəstəkləyici maddələr.",
    benefits:
      "Oynaqların elastikliyini artırır. Ağrıları yüngülləşdirir. Hərəkəti asanlaşdırır.",
    usage: "Gündə 1 kapsul qəbul edin.",
  },
  {
    id: 18,
    name: "Tiens OreCare Herbal Toothpaste",
    category: "Ağız gigiyenası",
    image:
      "https://img.drz.lazcdn.com/static/pk/p/22d4d5e0596e98ec7c79ae95c028e212.jpg_720x720q80.jpg",
    description:
      "Bitki ekstraktları və mentollu diş pastası ağız gigiyenasını təbii əsasda qoruyur.",
    composition:
      "Bitki ekstraktları, mentol, təbii antibakterial komponentlər və minerallar.",
    benefits:
      "Diş və ağız sağlamlığını yaxşılaşdırır. Nəfəsi təzələyir. Diş ətlərini möhkəmləndirir.",
    usage: "Hər gün səhər və axşam dişləri fırçalamaq üçün istifadə edin.",
  },
  {
    id: 19,
    name: "Tiens Airiz Ozon-Anion",
    category: "Hava təmizləyici",
    image:
      "https://biovitamin.az/wp-content/uploads/2026/02/tiens-ozon-anion-gigiyenik-bez.webp",
    description:
      "Ozon və anion texnologiyası ilə otaqdakı havanı təmizləyən və təravətləndirən cihaz.",
    composition:
      "Ozon generatoru, anion filtresi və daxili yüksək keyfiyyətli hava filtr sistemi.",
    benefits:
      "Hava keyfiyyətini yaxşılaşdırır. Allergenləri azaldır. Sağlam otaq atmosferi yaradır.",
    usage: "Gündə 4-6 saat otaqda işlədin.",
  },
  {
    id: 20,
    name: "Tiens Bracelet (White)",
    category: "Əl üzüyü",
    image:
      "https://bbtmarket.com/cdn/shop/files/unbekannt-78833_1024x.jpg?v=1744722428",
    description:
      "Ağ mineral daşlarla hazırlanmış qolbaq bədən enerjisini tarazlayır.",
    composition:
      "Mineral daşlar, enerji tarazlığı komponentləri və maqnetik balast.",
    benefits:
      "Bədən enerjisini tənzimləyir. Sakitlik və zəriflik hissi yaradır.",
    usage: "Gündəlik istifadə üçün qolunuzda taxın.",
  },
  {
    id: 21,
    name: "Tiens Bracelet (Gold)",
    category: "Əl üzüyü",
    image:
      "https://i.pinimg.com/474x/ab/cd/d3/abcdd357bf445e8ea38ddaac5dc7cb99.jpg",
    description:
      "Qızılı rəngli qolbaq enerji və stil harmoniyasını birləşdirir.",
    composition:
      "Metal elementlər, mineral daş komponentləri və enerjitik liflər.",
    benefits:
      "Enerji balansını dəstəkləyir. Görünüşü zənginləşdirir. Xoş hiss yaradır.",
    usage: "Gündəlik istifadə üçün taxın.",
  },
  {
    id: 22,
    name: "Tiens Bracelet (Cristal Black)",
    category: "Əl üzüyü",
    image:
      "https://image-cdn.ubuy.com/400_400_100/67f2b7d1cf6f0256047ea482-tiens-ti-energy-bracelet-crystal-black.jpg",
    description:
      "Qara kristal qolbaq enerji harmoniyasını və zərif dizaynı birləşdirir.",
    composition:
      "Kristal daşlar, maqnitli enerji komponentləri və zərif metal detallar.",
    benefits: "Ruh və bədən harmoniyasını gücləndirir. Şık aksessuardır.",
    usage: "Taxaraq gün boyu istifadə edin.",
  },
  {
    id: 23,
    name: "Tiens Bracelet (Elegant Black)",
    category: "Əl üzüyü",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/1/BP/KC/MN/134310639/untitled-500x500.png",
    description:
      "Elegant qara qolbaq müasir və incə görünüş üçün ideal aksessuardır.",
    composition:
      "Zərif kristal elementlər, mineral komponentlər və normalizasiya edici struktur.",
    benefits:
      "Gündəlik enerjini tarazlayır. Şık görünüş təmin edir. Rahatlıq yaradır.",
    usage: "Gündəlik istifadə və xüsusi tədbirlər üçün uyğundur.",
  },
  {
    id: 24,
    name: "Tiens Ishoukan",
    category: "Gözəllik cihazı",
    image:
      "https://tiens.com.ua/wp-content/uploads/2025/03/381810383_w1280_h1280_ishowkan.webp",
    description:
      "Yüksək texnologiyalı gözəllik cihazı dərini elastik və parlaq edir.",
    composition:
      "LED işıq terapiyası, vibrasiya funksiyası, istilik və ultrasonik impulslar.",
    benefits:
      "Dəri parıltısını artırır. Qırışları azaldır. Nəmləndirməni gücləndirir.",
    usage: "Həftədə 2-3 dəfə, hər seans 10-15 dəqiqə istifadə edin.",
  },
  {
    id: 25,
    name: "Tiens Foot Massage Device",
    category: "Masaj cihazı",
    image: "https://i.ebayimg.com/images/g/DrUAAOSw7pllr6oG/s-l1200.png",
    description:
      "Ayaq masaj cihazı rahatlıq və qan dövranını yaxşılaşdırmaq üçün hazırlanıb.",
    composition:
      "Masaj rulonları, isti hava funksiyası, təzyiq sistemi və relaksasiya blokları.",
    benefits:
      "Ayaq yorğunluğunu azaldır. Qan dövranını yaxşılaşdırır. Rahatlama hissi yaradır.",
    usage: "Hər gün 15-20 dəqiqə istifadə edin.",
  },
  {
    id: 26,
    name: "Tiens Cosmetic Device",
    category: "Kosmetika cihazı",
    image:
      "https://tiens.az/wp-content/uploads/2025/11/tiens-cilvaris-kosmetik-cihaz.webp",
    description:
      "Kosmetik cihaz dəriyə gənclik, nəmləndirmə və parıltı effekti verir.",
    composition:
      "Ultrasonik puls, istilik, işıq terapiyası komponentləri və vibrasiya mexanizmi.",
    benefits:
      "Dəri tonunu bərabərləşdirir. Elastikliyi artırır. Parıltı yaradır.",
    usage: "Həftədə ən az 2 dəfə, 10-15 dəqiqə istifadə edin.",
  },
];

const productReviews = {
  1: {
    name: "Rəsul",
    stars: 5,
    text: "Mən metabolizmimin daha yaxşı işlədiyini hiss etdim və davamlı enerji aldım.",
  },
  2: {
    name: "Aygün",
    stars: 5,
    text: "Çəki və şişkinlik azalması üçün çox təsirlidir, tez nəticə verir.",
  },
  3: {
    name: "Fərdi",
    stars: 5,
    text: "Həzm sistemimdə fərqi dərhal hiss etdim, asanlıqla çeynənilir.",
  },
  4: {
    name: "Şahin",
    stars: 5,
    text: "Yararlı pəhriz dəstəyi olaraq gündəlik seçimim oldu.",
  },
  5: {
    name: "Nərmin",
    stars: 5,
    text: "Dəri parıltım daha canlı göründü, çox faydalıdır.",
  },
  6: {
    name: "Camal",
    stars: 5,
    text: "Dərim yaxşılaşdı, enerji və təbii toksin qoruması verdi.",
  },
  7: {
    name: "Leyla",
    stars: 5,
    text: "Gün boyunca yorğunluğum azalır və gümrah hiss edirəm.",
  },
  8: {
    name: "Vaqif",
    stars: 5,
    text: "Məşqdən sonra bərpa daha asan oldu, enerji hissim gücləndi.",
  },
  9: {
    name: "Aynur",
    stars: 5,
    text: "Sağlamlıq üçün əla seçim, gündəlik vitamin ehtiyacımı tamamlayır.",
  },
  10: {
    name: "Tofiq",
    stars: 5,
    text: "Həzm üçün faydalıdır və böyük mədə rahatlığı verir.",
  },
  11: {
    name: "Xanım",
    stars: 5,
    text: "İmmunitetim daha güclü oldu və sakit dəriyə kömək etdi.",
  },
  12: {
    name: "Ramil",
    stars: 5,
    text: "Sümük və diş sağlamlığım üçün dərhal yaxşı təsir gördüm.",
  },
  13: {
    name: "Güllü",
    stars: 5,
    text: "Uşaqlar üçün həqiqətən xoş dadı var və rahat qəbul edilir.",
  },
  14: {
    name: "İsmət",
    stars: 5,
    text: "Metabolizm və enerji üçün əla dəstək, superdir.",
  },
  15: {
    name: "Səbinə",
    stars: 5,
    text: "Beyin focusu və enerji üçün gündəlik istifadə edirəm.",
  },
  16: {
    name: "Elçin",
    stars: 5,
    text: "Dəri görkəmi və immunitet üçün faydalı bir əlavə oldu.",
  },
  17: {
    name: "Akif",
    stars: 5,
    text: "Oynaqlarda rahatlıq hiss etdim və hərəkətim daha yumşaq oldu.",
  },
  18: {
    name: "Gülnar",
    stars: 5,
    text: "Ağız və diş hissi təzələndi, nəfəs daha təmiz oldu.",
  },
  19: {
    name: "Elbrus",
    stars: 5,
    text: "Otaq havası daha təmiz və rahat oldu, çox xoşuma gəldi.",
  },
  20: {
    name: "Fatima",
    stars: 5,
    text: "Hər gün taxdıqca enerji balansım və rahatlıq hissim yaxşılaşdı.",
  },
  21: {
    name: "Yusif",
    stars: 5,
    text: "Şık görünür və taxarkən enerjim artdı, çox rahatdır.",
  },
  22: {
    name: "Türkan",
    stars: 5,
    text: "Qara kristal toxunuşu və balans effekti məni məmnun etdi.",
  },
  23: {
    name: "Kamal",
    stars: 5,
    text: "Elegant görünüş və enerji hissi bir arada, əla aksessuardır.",
  },
  24: {
    name: "Zeynəb",
    stars: 5,
    text: "Dəri parıltımı artırdı və istifadəsi çox rahat oldu.",
  },
  25: {
    name: "Nazim",
    stars: 5,
    text: "Ayaq masajı sonrası rahatlıq və qan dövranı super yaxşılaşdı.",
  },
  26: {
    name: "İrina",
    stars: 5,
    text: "Dəriyə canlılıq verdi və kosmetik təsiri çox xoşdur.",
  },
};

// KATALOQU GENERASİYA EDƏN FUNKSİYA
function initProductCatalog() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = "";

  products.forEach((product) => {
    const review = productReviews[product.id] || {
      name: "Müştəri",
      stars: 5,
      text: "Əla məhsul.",
    };
    const starsHtml = Array(review.stars)
      .fill('<span class="star">★</span>')
      .join("");

    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img-wrapper">
        <span class="category-badge">${product.category}</span>
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <div class="review-chip">
          <div class="review-stars">${starsHtml}</div>
          <div class="review-name">${review.name}</div>
          <div class="review-text">“${review.text}”</div>
        </div>
      </div>
    `;

    card.addEventListener("click", () => showProductModal(product));
    grid.appendChild(card);
  });
}

// MODAL ELEMENTLƏRİ VƏ BUG FIX INTEGRASIYASI
const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const modalUsage = document.getElementById("modalUsage");
const modalComposition = document.getElementById("modalComposition");
const modalBenefitsList = document.getElementById("modalBenefitsList");
const modalCategory = document.getElementById("modalCategory");
const modalWhatsapp = document.getElementById("modalWhatsapp");

function showProductModal(product) {
  if (!modal) return;
  modal.classList.add("open");
  modalTitle.textContent = product.name;
  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalDescription.textContent = product.description;
  modalUsage.textContent = product.usage;
  modalComposition.textContent = product.composition;
  modalCategory.textContent = product.category;

  modalBenefitsList.innerHTML = "";
  if (product.benefits) {
    const items = product.benefits.split(/\s*(?:\.|;|•)\s*/).filter(Boolean);
    items.forEach((it) => {
      const li = document.createElement("li");
      li.textContent = it.trim();
      modalBenefitsList.appendChild(li);
    });
  }

  const encodedText = encodeURIComponent(
    `Salam, Tiens Azerbaijan. Rəsmi saytınızdan bu məhsulu sifariş etmək istəyirəm:\n📦 *${product.name}*\n}`,
  );
  modalWhatsapp.href = `https://wa.me/994773020060?text=${encodedText}`;
}

function hideProductModal() {
  if (modal) modal.classList.remove("open");
}

// EVENT LISTENERS (Mükəmməlləşdirilmiş bağlanma məntiqi)
document.addEventListener("DOMContentLoaded", () => {
  initProductCatalog();

  const closeBtn = document.getElementById("closeModal");
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Xarici klik qəzalarını tam bloklayır
      hideProductModal();
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      // Şəkillərin kliklənməsi zamanı yaranan "Overlay" xətası fix olundu.
      // Yalnız kartdan tamamilə xaricdəki qara şəffaf fona kliklənəndə modal bağlanacaq.
      if (e.target === modal) {
        hideProductModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideProductModal();
  });
});

function animateStatNumber(el) {
  const targetValue = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  const duration = 2000; // Animasiya müddəti (milisaniyə)
  const stepTime = 30;
  const steps = Math.ceil(duration / stepTime);
  let current = 0;
  const increment = targetValue / steps;
  const isDecimal = el.dataset.target.includes(".");

  const timer = setInterval(() => {
    current += increment;
    if (current >= targetValue) {
      el.textContent = `${isDecimal ? targetValue.toFixed(1) : Math.floor(targetValue)}${suffix}`;
      clearInterval(timer);
    } else {
      const value = isDecimal
        ? Math.min(targetValue, Math.round(current * 10) / 10)
        : Math.floor(current);
      el.textContent = `${value}${suffix}`;
    }
  }, stepTime);
}

// Səhifə sürüşdürülərkən (scroll) bölmə ekrana gəldikdə sayğacı başladan sistem
document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.getElementById("about");
  const statNumbers = document.querySelectorAll(".stat-number");

  if (statsSection && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            statNumbers.forEach(animateStatNumber);
            observer.unobserve(entry.target); // Yalnız bir dəfə işləməsi üçün izləməni dayandırır
          }
        });
      },
      { threshold: 0.15 }, // Bölmənin 15%-i ekranda görünəndə animasiya tetiklenir
    );
    statsObserver.observe(statsSection);
  }
});

// ── MULTI-LANGUAGE TRANSLATION DATABASE ──
const translations = {
  az: {
    // Navbar
    nav_about: "Haqqımızda",
    nav_catalog: "Kataloq",
    nav_sets: "Setlər",
    nav_news: "📰 Xəbərlər",
    nav_contact: "Əlaqə",
    nav_login: "Daxil ol",
    brand_sub: "Rəsmi sağlamlıq təmsilçisi",

    // Hero Section
    hero_desc:
      "Jalə Plaza ofisimizdən Azərbaycana rəsmi Tiens məhsulları və sertifikatlı sağlamlıq dəstəyi təqdim edirik.",
    hero_subdesc:
      "Hər məhsul orijinaldır və xüsusi olaraq sizin üçün seçilmişdir.",
    btn_inspect: "Məhsulları İncələ",
    btn_contact: "Bizimlə Əlaqə",

    // About Section
    about_title: "Haqqımızda",
    about_subtitle:
      "Biz kimik? Azərbaycan üzrə rəsmi Tiens təmsilçisiyik və orijinal məhsulların sürətli çatdırılması ilə WhatsApp-da xidmət göstəririk.",
    about_main_title: "Şərq Müdrikliyi və Müasir Texnologiya",
    about_stats: "TİENS şirkəti haqqında rəqəmlər və faktlar",
    stat_countries: "Ölkə",
    stat_customers: "Müştəri",
    stat_distributors: "Distribütor",
    stat_medals: "Qızıl medal",
    stat_participants: "İştirakçı",
    stat_travels: "Ödənişsiz səyahət",
    cooperation_title: "Bizimlə Əməkdaşlıq",
    cooperation_desc:
      "1998-ci ildə aparıcı marketoloq və psixoloqlar tərəfindən yaradılmış “UĞUR SİSTEMİ” təlimləri vasitəsilə hər bir əməkdaşa qısa vaxt ərzində öz biznesini qurmaq və yüksək gəlir əldə etmək imkanı verilir. Həm tibb sahəsi, həm də Jalə Plaza ofis işləri üzrə çalışmaq, fəaliyyət göstərmək üçün bizə müraciət edə bilərsiniz. Çalışmağa başladığınız ilk gündən etibarən beynəlxalq dərəcəli lektorlarımız daim sizə dəstək olacaqdır.",
    motto_text:
      "SİZƏ “SƏMA ŞİRİ”-NİN QANADLARI ALTINDA UĞURLU BİZNES QURMAĞI ARZULAYIRIQ!",
    btn_whatsapp_direct: "Dərhal WhatsApp ilə əlaqə",

    // Products & Sets
    products_title: "Rəsmi məhsullar",
    product_catalog_badge: "Məhsul Kataloqu",
    sets_badge: "Xüsusi Kombinasiyalar",
    sets_title: "Xüsusi setlər",
    health_set: "Əsas Sağlamlıq Seti",
    health_desc:
      "Ürək-damar, enerji və bədən balansı üçün xüsusi seçilmiş 3 məhsul.",
    beauty_set: "Gözəllik və Dəri Seti",
    beauty_desc:
      "Dəri parıltısı və bədənin qidalanması üçün seçilmiş məhsullar.",
    parent_set: "Valideyn və Uşaq Dəstək Seti",
    parent_desc:
      "Uşaq və böyüklər üçün kalsium və vitamin dəstəyi ilə sağlamlıq balansı.",
    ask_wp: "WP ilə soruş",

    // Contact Section
    contact_badge: "Rəsmi Ünvan",
    contact_card_title: "Əlaqə və ünvan",
    address_label: "Ünvan:",
    address_value: "Bakı, Tiens (Google Xəritə)",
    contact_note_1:
      "Marketinq və dəstək: Rəsmi Tiens nümayəndəliyi, məhsullar orijinal və sertifikatlıdır.",
    contact_note_2:
      "Saytda göstərilən hər məhsula kliklədikdə onun haqqında ətraflı məlumat, istifadə qaydası görünəcək.",
    btn_whatsapp_contact: "WhatsApp ilə əlaqə: +994 77 302 00 60",

    // Footer
    footer_desc:
      "Şərq təbabətinin 5000 illik fəlsəfəsini qabaqcıl biotexnologiya ilə birləşdirərək, Jalə Plaza ofisimizdən sizə rəsmi və sertifikatlı sağlamlıq xidməti təqdim edirik.",
    footer_nav: "Sürətli Naviqasiya",
    footer_contact_title: "Rəsmi Əlaqə",
    footer_sec_title: "Qorunan məlumatlar",
    footer_sec_desc:
      "Şəxsi məlumatlarınız və müraciətləriniz tamamilə məxfidir. Data təhlükəsizliyi qaydalarına uyğun olaraq yalnız sizə göstərilən xidmətin təkmilləşdirilməsi üçün istifadə olunur.",
    footer_copyright:
      "© 2026 Tiens Azerbaijan. Bütün hüquqlar qorunur. Jalə Plaza Rəsmi Təmsilçiliyi.",

    // Modal
    modal_description_title: "Təsvir",
    modal_composition_title: "Tərkib",
    modal_benefits_title: "Faydaları",
    modal_usage_title: "İstifadə Qaydası",
    btn_modal_order: "WhatsApp ilə Sifariş Et",
  },
  tr: {
    // Navbar
    nav_about: "Hakkımızda",
    nav_catalog: "Katalog",
    nav_sets: "Setler",
    nav_news: "📰 Haberler",
    nav_contact: "İletişim",
    nav_login: "Giriş Yap",
    brand_sub: "Resmi sağlık temsilcisi",

    // Hero Section
    hero_desc:
      "Jale Plaza ofisimizden Azerbaycan'a resmi Tiens ürünleri ve sertifikalı sağlık desteği sunuyoruz.",
    hero_subdesc: "Her ürün orijinaldir ve size özel olarak seçilmiştir.",
    btn_inspect: "Ürünleri İncele",
    btn_contact: "Bizimle İletişime Geçin",

    // About Section
    about_title: "Hakkımızda",
    about_subtitle:
      "Biz kimiz? Azerbaycan resmi Tiens temsilcisiyiz ve WhatsApp üzerinden orijinal ürünlerin hızlı teslimatı ile hizmet vermekteyiz.",
    about_main_title: "Doğu Bilgeliği ve Modern Teknoloji",
    about_stats: "TIENS Şirketi Hakkında Rakamlar ve Gerçekler",
    stat_countries: "Ülke",
    stat_customers: "Müşteri",
    stat_distributors: "Distribütör",
    stat_medals: "Altın Madalya",
    stat_participants: "Katılımcı",
    stat_travels: "Ücretsiz Seyahat",
    cooperation_title: "Bizimle İşbirliği",
    cooperation_desc:
      "1998 yılında önde gelen pazarlamacılar ve psikologlar tarafından oluşturulan 'BAŞARI SİSTEMİ' eğitimleri sayesinde her çalışana kısa sürede kendi işini kurma ve yüksek gelir elde etme fırsatı sunulmaktadır. Hem tıp alanı hem de Jale Plaza ofis işlerinde çalışmak üzere bize başvurabilirsiniz. Çalışmaya başladığınız ilk günden itibaren uluslararası düzeydeki eğitmenlerimiz size her zaman destek olacaktır.",
    motto_text:
      "SİZE 'GÖKBÖRÜ' (SEMA ŞİRİ) KANATLARI ALTINDA BAŞARILI BİR İŞ KURMANIZI DİLİYORUZ!",
    btn_whatsapp_direct: "Hemen WhatsApp ile İletişime Geçin",

    // Products & Sets
    products_title: "Resmi Ürünler",
    product_catalog_badge: "Ürün Kataloğu",
    sets_badge: "Özel Kombinasyonlar",
    sets_title: "Özel Setler",
    health_set: "Temel Sağlık Seti",
    health_desc:
      "Kardiyovasküler, enerji ve vücut dengesi için özel olarak seçilmiş 3 ürün.",
    beauty_set: "Güzellik ve Cilt Seti",
    beauty_desc: "Cilt parlaklığı ve vücut beslenmesi için seçilmiş ürünler.",
    parent_set: "Ebeveyn ve Çocuk Destek Seti",
    parent_desc:
      "Çocuklar ve yetişkinler için kalsiyum ve vitamin desteği ile sağlık dengesi.",
    ask_wp: "WP ilə Sorun",

    // Contact Section
    contact_badge: "Resmi Adres",
    contact_card_title: "İletişim ve Adres",
    address_label: "Adres:",
    address_value: "Bakü, Tiens (Google Harita)",
    contact_note_1:
      "Pazarlama ve Destek: Resmi Tiens temsilciliği, ürünler orijinal ve sertifikalıdır.",
    contact_note_2:
      "Sitede gösterilen her ürüne tıkladığınızda ürün hakkında detaylı bilgi, kullanım şekli ve fiyatı görünecektir.",
    btn_whatsapp_contact: "WhatsApp ile İletişim: +994 77 302 00 60",

    // Footer
    footer_desc:
      "Doğu tıbbının 5000 yıllık felsefesini ileri biyoteknoloji ile birleştirerek, Jale Plaza ofisimizden size resmi ve sertifikalı sağlık hizmeti sunuyoruz.",
    footer_nav: "Hızlı Navigasyon",
    footer_contact_title: "Resmi İletişim",
    footer_sec_title: "Korunan Veriler",
    footer_sec_desc:
      "Kişisel bilgileriniz ve başvurularınız tamamen gizlidir. Veri güvenliği kurallarına uygun olarak yalnızca size sunulan hizmetin geliştirilmesi için kullanılır.",
    footer_copyright:
      "© 2026 Tiens Azerbaijan. Tüm hakları saklıdır. Jale Plaza Resmi Temsilciliği.",

    // Modal
    modal_description_title: "Açıklama",
    modal_composition_title: "İçerik",
    modal_benefits_title: "Faydaları",
    modal_usage_title: "Kullanım Şekli",
    btn_modal_order: "WhatsApp ile Sipariş Ver",
  },
  en: {
    // Navbar
    nav_about: "About Us",
    nav_catalog: "Catalog",
    nav_sets: "Sets",
    nav_news: "📰 News",
    nav_contact: "Contact",
    nav_login: "Login",
    brand_sub: "Official health representative",

    // Hero Section
    hero_desc:
      "We provide official Tiens products and certified health support to Azerbaijan from our Jale Plaza office.",
    hero_subdesc: "Every product is original and specially selected for you.",
    btn_inspect: "Examine Products",
    btn_contact: "Contact Us",

    // About Section
    about_title: "About Us",
    about_subtitle:
      "Who are we? We are the official Tiens representative in Azerbaijan, providing services via WhatsApp with fast delivery of original products.",
    about_main_title: "Eastern Wisdom and Modern Technology",
    about_stats: "Numbers and Facts About TIENS Corporation",
    stat_countries: "Countries",
    stat_customers: "Customers",
    stat_distributors: "Distributors",
    stat_medals: "Gold Medals",
    stat_participants: "Participants",
    stat_travels: "Free Travel",
    cooperation_title: "Cooperation With Us",
    cooperation_desc:
      "Through the 'SUCCESS SYSTEM' training developed by leading marketers and psychologists in 1998, every employee is given the opportunity to build their own business and earn high income in a short time. You can apply to work with us both in the medical field and in Jale Plaza office operations. From the first day you start working, our international lecturers will always support you.",
    motto_text:
      "WE WISH YOU TO BUILD A SUCCESSFUL BUSINESS UNDER THE WINGS OF THE 'HEAVENLY LION'!",
    btn_whatsapp_direct: "Contact via WhatsApp Immediately",

    // Products & Sets
    products_title: "Official Products",
    product_catalog_badge: "Product Catalog",
    sets_badge: "Special Combinations",
    sets_title: "Special Sets",
    health_set: "Essential Health Set",
    health_desc:
      "3 specially selected products for cardiovascular, energy, and body balance.",
    beauty_set: "Beauty & Skin Set",
    beauty_desc: "Selected products for skin radiance and body nutrition.",
    parent_set: "Parent & Child Support Set",
    parent_desc:
      "Health balance with calcium and vitamin support for children and adults.",
    ask_wp: "Ask via WP",

    // Contact Section
    contact_badge: "Official Address",
    contact_card_title: "Contact & Address",
    address_label: "Address:",
    address_value: "Baku, Tiens (Google Maps)",
    contact_note_1:
      "Marketing and Support: Official Tiens representation, products are original and certified.",
    contact_note_2:
      "Clicking on each product displayed on the site will show detailed information, usage instructions.",
    btn_whatsapp_contact: "Contact via WhatsApp: +994 77 302 00 60",

    // Footer
    footer_desc:
      "Combining the 5000-year-old philosophy of Eastern medicine with advanced biotechnology, we offer official and certified healthcare services from our Jale Plaza office.",
    footer_nav: "Quick Navigation",
    footer_contact_title: "Official Contact",
    footer_sec_title: "Protected Data",
    footer_sec_desc:
      "Your personal information and applications are strictly confidential. In accordance with data security rules, it is only used to improve the service provided to you.",
    footer_copyright:
      "© 2026 Tiens Azerbaijan. All rights reserved. Jale Plaza Official Representative.",

    // Modal
    modal_description_title: "Description",
    modal_composition_title: "Composition",
    modal_benefits_title: "Benefits",
    modal_usage_title: "Usage Instructions",
    btn_modal_order: "Order via WhatsApp",
  },
  ru: {
    // Navbar
    nav_about: "О нас",
    nav_catalog: "Каталог",
    nav_sets: "Наборы",
    nav_news: "📰 Новости",
    nav_contact: "Контакты",
    nav_login: "Войти",
    brand_sub: "Официальный представитель здоровья",

    // Hero Section
    hero_desc:
      "Мы поставляем официальную продукцию Tiens и сертифицированную поддержку здоровья в Азербайджан из нашего офиса в Jale Plaza.",
    hero_subdesc: "Каждый продукт оригинален и выбран специально для вас.",
    btn_inspect: "Изучить продукцию",
    btn_contact: "Связаться с нами",

    // About Section
    about_title: "О нас",
    about_subtitle:
      "Кто мы? Мы являемся официальным представителем Tiens в Азербайджане и предоставляем услуги через WhatsApp с быстрой доставкой оригинальной продукции.",
    about_main_title: "Восточная мудрость и современные технологии",
    about_stats: "Цифры и факты о корпорации TIENS",
    stat_countries: "Стран",
    stat_customers: "Клиентов",
    stat_distributors: "Дистрибьюторов",
    stat_medals: "Золотых медалей",
    stat_participants: "Участников",
    stat_travels: "Бесплатных поездок",
    cooperation_title: "Сотрудничество с нами",
    cooperation_desc:
      "Благодаря тренингам «СИСТЕМА УСПЕХА», созданным ведущими маркетологами и психологами в 1998 году, каждому сотруднику предоставляется возможность в короткие сроки построить собственный бизнес и получать высокий доход. Вы можете обратиться к нам для работы как в сфере медицины, так и в офисных операциях Jale Plaza. С первого дня работы наши лекторы международного уровня всегда поддержат вас.",
    motto_text:
      "ЖЕЛАЕМ ВАМ ПОСТРОИТЬ УСПЕШНЫЙ БИЗНЕС ПОД КРЫЛЬЯМИ «НЕБЕСНОГО ЛЬВА»!",
    btn_whatsapp_direct: "Немедленно связаться через WhatsApp",

    // Products & Sets
    products_title: "Официальные продукты",
    product_catalog_badge: "Каталог продукции",
    sets_badge: "Специальные комбинации",
    sets_title: "Специальные наборы",
    health_set: "Базовый набор здоровья",
    health_desc:
      "3 специально отобранных продукта для сердечно-сосудистой системы, энергии и баланса организма.",
    beauty_set: "Набор красоты и ухода за кожей",
    beauty_desc: "Отобранные продукты для сияния кожи и питания организма.",
    parent_set: "Набор поддержки родителей и детей",
    parent_desc:
      "Баланс здоровья с поддержкой кальция и витаминов для детей и взрослых.",
    ask_wp: "Спросить через WP",

    // Contact Section
    contact_badge: "Официальный адрес",
    contact_card_title: "Контакты и адрес",
    address_label: "Адрес:",
    address_value: "Баку, Tiens (Google Карты)",
    contact_note_1:
      "Маркетинг и поддержка: Официальное представительство Tiens, продукция оригинальная и сертифицированная.",
    contact_note_2:
      "При нажатии на каждый товар, отображаемый на сайте, откроется подробная информация, инструкция по применению и цена.",
    btn_whatsapp_contact: "Связаться через WhatsApp: +994 77 302 00 60",

    // Footer
    footer_desc:
      "Сочетая 5000-летнюю философию восточной медицины с передовыми биотехнологиями, мы предлагаем официальные и сертифицированные медицинские услуги из нашего офиса в Jale Plaza.",
    footer_nav: "Быстрая навигация",
    footer_contact_title: "Официальный контакт",
    footer_sec_title: "Защищенные данные",
    footer_sec_desc:
      "Ваша личная информация и заявления строго конфиденциальны. В соответствии с правилами безопасности данных они используются только для улучшения предоставляемых вам услуг.",
    footer_copyright:
      "© 2026 Tiens Azerbaijan. Все права защищены. Официальное представительство Jale Plaza.",

    // Modal
    modal_description_title: "Описание",
    modal_composition_title: "Состав",
    modal_benefits_title: "Преимущества",
    modal_usage_title: "Способ применения",
    btn_modal_order: "Заказать через WhatsApp",
  },
};

// ── DİNAMİK TƏRCÜMƏNİ İCRA EDƏN SİSTEM ──
function updatePageLanguage(lang) {
  const dictionary = translations[lang];
  if (!dictionary) return;

  // 1. data-translate atributu olan elementlərin mətni
  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.dataset.translate;
    if (dictionary[key]) {
      el.textContent = dictionary[key];
    }
  });

  // 2. HTML sənədinin ana dil atributunu yeniləmək
  document.documentElement.lang = lang;
}

// Səhifənin mövcud dil seçicisini idarə edən dropdown koduna bu inteqrasiyanı əlavə edin:
document.querySelectorAll(".custom-option").forEach((option) => {
  option.addEventListener("click", function () {
    const selectedLang = this.dataset.value; // 'az', 'tr', 'en', 'ru'
    updatePageLanguage(selectedLang);
    localStorage.setItem("selectedLanguage", selectedLang);
  });
});

// İlk yüklənmədə dili yoxlamaq
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("selectedLanguage") || "az";
  updatePageLanguage(savedLang);
});
