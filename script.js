// LOADER
const loader = document.getElementById("loader");
const loaderText = document.getElementById("loaderText");

let progress = 0;

const loading = setInterval(()=>{
  progress++;

  loaderText.textContent =
    `Initializing vehicle systems... ${progress}%`;

  if(progress >= 100){
    clearInterval(loading);

    setTimeout(()=>{
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
    },300);
  }
},18);

// ENGINE SOUND
const engineBtn = document.getElementById("engineBtn");
const engineSound = document.getElementById("engineSound");

engineBtn.addEventListener("click", () => {
  const engineEffects = document.getElementById("engineEffects");

/* PULSE */
const pulse = document.createElement("div");
pulse.classList.add("engine-pulse");
document.body.appendChild(pulse);

setTimeout(()=>{
  pulse.remove();
},700);

/* SMOKE PARTICLES */
for(let i=0; i<18; i++){
  const smoke = document.createElement("div");
  smoke.classList.add("smoke");

  smoke.style.left =
    (window.innerWidth/2 + (Math.random()*220 - 110)) + "px";

  smoke.style.top =
    (window.innerHeight/2 + (Math.random()*120 - 60)) + "px";

  smoke.style.animationDelay =
    Math.random() * .4 + "s";

  engineEffects.appendChild(smoke);

  setTimeout(()=>{
    smoke.remove();
  },2000);
}
  engineSound.currentTime = 0;
  engineSound.volume = 0.6;
  engineSound.play();

  engineBtn.textContent = "ENGINE STARTED";
  engineBtn.style.background = "linear-gradient(135deg,#ff1e1e,#8b0000)";
});

// NAVBAR SHRINK ON SCROLL
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if(window.scrollY > 50){
    navbar.style.padding = "14px 24px";
    navbar.style.background = "rgba(10,10,10,.85)";
    navbar.style.backdropFilter = "blur(24px)";
  } else {
    navbar.style.padding = "18px 28px";
    navbar.style.background = "rgba(255,255,255,.04)";
    navbar.style.backdropFilter = "blur(20px)";
  }
});

// HERO PARALLAX
const heroCar = document.querySelector(".hero-car img");

document.addEventListener("mousemove",(e)=>{
  const x = (window.innerWidth / 2 - e.clientX) / 30;
  const y = (window.innerHeight / 2 - e.clientY) / 30;

  heroCar.style.transform =
    `
    translate(${x}px, ${y}px)
    rotateY(${-x/3}deg)
    rotateX(${y/3}deg)
    `;
});

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const counter = entry.target;
      const target = +counter.dataset.target;
      let count = 0;

      const updateCounter = () => {
        const increment = target / 100;

        if(count < target){
          count += increment;
          counter.textContent =
            target < 10 ? count.toFixed(1) : Math.floor(count);

          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
      counterObserver.unobserve(counter);
    }
  });
});

counters.forEach(counter=>{
  counterObserver.observe(counter);
});

const colorBtns = document.querySelectorAll(".color-btn");
const configCar = document.getElementById("configCar");

const carImages = {
  black:"images/car-black.png",
  red:"images/car-red.png",
  silver:"images/car-silver.png",
  blue:"images/car-blue.png"
};

colorBtns.forEach(btn=>{
  btn.addEventListener("click",()=>{
    colorBtns.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    const color = btn.dataset.color;
    configCar.src = carImages[color];
  });
});

const galleryImages = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

galleryImages.forEach(img=>{
  img.addEventListener("click",()=>{
    lightbox.classList.add("show");
    lightboxImg.src = img.src;
  });
});

closeLightbox.addEventListener("click",()=>{
  lightbox.classList.remove("show");
});

lightbox.addEventListener("click",(e)=>{
  if(e.target === lightbox){
    lightbox.classList.remove("show");
  }
});

const form = document.querySelector(".contact-form");
const successModal = document.getElementById("successModal");
const closeSuccess = document.getElementById("closeSuccess");

form.addEventListener("submit",(e)=>{
  e.preventDefault();

  successModal.classList.add("show");
  form.reset();
});

closeSuccess.addEventListener("click",()=>{
  successModal.classList.remove("show");
});

successModal.addEventListener("click",(e)=>{
  if(e.target === successModal){
    successModal.classList.remove("show");
  }
});

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("active");
    }
  });
},{
  threshold:0.15
});

reveals.forEach(section=>{
  revealObserver.observe(section);
});

const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove",(e)=>{
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

const speedValue = document.getElementById("speedValue");
const speedCircle = document.querySelector(".speed-circle");

let speedStarted = false;

const speedObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting && !speedStarted){
      speedStarted = true;

      let speed = 0;

      const speedInterval = setInterval(()=>{
        speed += 4;

        speedValue.textContent = speed;

        const deg = speed * 1.1;

        speedCircle.style.background =
          `conic-gradient(
            #ff1e1e 0deg,
            #8b0000 ${deg}deg,
            rgba(255,255,255,.08) ${deg}deg
          )`;

        if(speed >= 320){
          clearInterval(speedInterval);
        }
      },20);
    }
  });
});

speedObserver.observe(document.querySelector(".speedometer-section"));

const soundToggle = document.getElementById("soundToggle");

let muted = false;

soundToggle.addEventListener("click",()=>{
  muted = !muted;

  engineSound.muted = muted;

  soundToggle.textContent = muted ? "🔇" : "🔊";
});