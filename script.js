/*==================================================
HEADER SCROLL
==================================================*/

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("sticky");

    } else {

        header.classList.remove("sticky");

    }

});


/*==================================================
HERO TAG
==================================================*/

const heroTag = document.getElementById("heroTag");

if(heroTag){

const texts=[

"👋 Halo, Saya",

"🎓 Mahasiswa Teknologi Informasi",

"💻 Front-End Developer",

"🌐 Web Developer",

"🎨 UI / UX Designer",

"⚡ HTML • CSS • JavaScript",

"🖥️ WordPress Developer",

"📈 SEO Specialist",

"📱 Responsive Web Design",

"🎯 Figma Designer",

"🗄️ MySQL Database",

"📊 Data Administrator",

"🚀 Digital Marketing"

];

let tagIndex=0;

setInterval(()=>{

heroTag.style.opacity="0";

heroTag.style.transform="translateY(10px)";

setTimeout(()=>{

tagIndex++;

if(tagIndex>=texts.length){

tagIndex=0;

}

heroTag.innerHTML=texts[tagIndex];

heroTag.style.opacity="1";

heroTag.style.transform="translateY(0)";

},250);

},2500);

}


/*==================================================
ACTIVE MENU
==================================================*/

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".navbar a");

window.addEventListener("scroll",()=>{

let currentSection="";

sections.forEach(section=>{

const top=section.offsetTop-120;

if(window.scrollY>=top){

currentSection=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+currentSection){

link.classList.add("active");

}

});

});


/*==================================================
SMOOTH SCROLL
==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});


/*==================================================
FADE ANIMATION
==================================================*/

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{threshold:.15});

document.querySelectorAll(

".hero,.about,.journey,.skills,.projects,.certificate,.contact,.project-card,.certificate-card,.timeline-item"

).forEach(item=>{

item.classList.add("hidden");

observer.observe(item);

});
/*==================================================
PROJECT POPUP + SLIDER
==================================================*/

const projectModal = document.getElementById("projectModal");

const projectImage = document.getElementById("projectImage");

const projectTitle = document.getElementById("projectTitle");

const projectDescription = document.getElementById("projectDescription");

const projectCategory = document.getElementById("projectCategory");

const projectRole = document.getElementById("projectRole");

const projectTech = document.getElementById("projectTech");

const projectYear = document.getElementById("projectYear");

let projectImages = [];

let currentImage = 0;

let autoSlide;



function openProject(

title,

images,

description,

category,

role,

tech,

year

){

    projectImages = images;

    currentImage = 0;

    projectTitle.innerHTML = title;

    projectDescription.innerHTML = description;

    projectCategory.innerHTML = category;

    projectRole.innerHTML = role;

    projectTech.innerHTML = tech;

    projectYear.innerHTML = year;

    showImage();

    updateDots();

    projectModal.classList.add("active");

    document.body.style.overflow = "hidden";

    startSlide();

}



function closeProject(){

    projectModal.classList.remove("active");

    document.body.style.overflow = "auto";

    stopSlide();

}



function showImage(){

    projectImage.src = projectImages[currentImage];

}



function nextImage(){

    currentImage++;

    if(currentImage >= projectImages.length){

        currentImage = 0;

    }

    showImage();

    updateDots();

}



function prevImage(){

    currentImage--;

    if(currentImage < 0){

        currentImage = projectImages.length-1;

    }

    showImage();

    updateDots();

}



function updateDots(){

    const dots = document.querySelectorAll(".dot");

    dots.forEach(dot=>{

        dot.classList.remove("active");

    });

    if(dots[currentImage]){

        dots[currentImage].classList.add("active");

    }

}



/*==================================
DOT CLICK
==================================*/

document.querySelectorAll(".dot").forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentImage=index;

        showImage();

        updateDots();

    });

});



/*==================================
AUTO SLIDE
==================================*/

function startSlide(){

    stopSlide();

    autoSlide=setInterval(()=>{

        nextImage();

    },3500);

}



function stopSlide(){

    clearInterval(autoSlide);

}



/*==================================
PAUSE HOVER
==================================*/

const modalLeft=document.querySelector(".modal-left");

if(modalLeft){

modalLeft.addEventListener("mouseenter",()=>{

stopSlide();

});

modalLeft.addEventListener("mouseleave",()=>{

startSlide();

});

}



/*==================================
CLICK OUTSIDE
==================================*/

window.addEventListener("click",(e)=>{

    if(e.target===projectModal){

        closeProject();

    }

});
/*==================================================
KEYBOARD CONTROL
==================================================*/

document.addEventListener("keydown",(e)=>{

    if(!projectModal.classList.contains("active")) return;

    if(e.key==="ArrowRight"){

        nextImage();

    }

    if(e.key==="ArrowLeft"){

        prevImage();

    }

    if(e.key==="Escape"){

        closeProject();

        closeCertificate();

    }

});


/*==================================================
SWIPE MOBILE
==================================================*/

let startX = 0;
let endX = 0;

if(modalLeft){

modalLeft.addEventListener("touchstart",(e)=>{

startX = e.touches[0].clientX;

});

modalLeft.addEventListener("touchend",(e)=>{

endX = e.changedTouches[0].clientX;

if(startX-endX>50){

nextImage();

}

if(endX-startX>50){

prevImage();

}

});

}


/*==================================================
DRAG MOUSE
==================================================*/

let dragStart = 0;

if(modalLeft){

modalLeft.addEventListener("mousedown",(e)=>{

dragStart = e.clientX;

});

modalLeft.addEventListener("mouseup",(e)=>{

let dragEnd = e.clientX;

if(dragStart-dragEnd>50){

nextImage();

}

if(dragEnd-dragStart>50){

prevImage();

}

});

}


/*==================================================
IMAGE FADE
==================================================*/

function showImage(){

    projectImage.style.opacity="0";

    setTimeout(()=>{

        projectImage.src=projectImages[currentImage];

        projectImage.style.opacity="1";

    },180);

}


/*==================================================
CERTIFICATE POPUP
==================================================*/

const certificateModal = document.getElementById("certificateModal");

function openCertificate(title,image,issuer,skill){

    document.getElementById("certificateTitle").innerHTML=title;

    document.getElementById("certificateImage").src=image;

    document.getElementById("certificateIssuer").innerHTML=issuer;

    document.getElementById("certificateSkill").innerHTML=skill;

    certificateModal.classList.add("active");

    document.body.style.overflow="hidden";

}

function closeCertificate(){

    certificateModal.classList.remove("active");

    document.body.style.overflow="auto";

}


/*==================================================
CLICK OUTSIDE CERTIFICATE
==================================================*/

window.addEventListener("click",(e)=>{

    if(e.target===certificateModal){

        closeCertificate();

    }

});


/*==================================================
PRELOAD IMAGE
==================================================*/

function preloadImages(images){

images.forEach(img=>{

const image=new Image();

image.src=img;

});

}


/*==================================================
PROJECT PRELOAD
==================================================*/

document.querySelectorAll(".project-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

if(projectImages.length){

preloadImages(projectImages);

}

});

});


/*==================================================
STOP RIGHT CLICK IMAGE
==================================================*/

document.querySelectorAll(".modal img").forEach(img=>{

img.addEventListener("contextmenu",(e)=>{

e.preventDefault();

});

});
