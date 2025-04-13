 // Mobile menu toggle
 const hamburger = document.querySelector('.hamburger');
 const navLinks = document.querySelector('.nav-links');
 
 hamburger.addEventListener('click', () => {
     navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
 });
 
 // Responsive nav adjustments
 window.addEventListener('resize', () => {
     if (window.innerWidth > 768) {
         navLinks.style.display = 'flex';
     } else {
         navLinks.style.display = 'none';
     }
 });
 
 // Smooth scrolling for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         e.preventDefault();
         
         const targetId = this.getAttribute('href');
         if (targetId === '#') return;
         
         const targetElement = document.querySelector(targetId);
         if (targetElement) {
             window.scrollTo({
                 top: targetElement.offsetTop - 80,
                 behavior: 'smooth'
             });
             
             // Close mobile menu if open
             if (window.innerWidth <= 768) {
                 navLinks.style.display = 'none';
             }
         }
     });
 });
 
 document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section, footer");
    const navLinks = document.querySelectorAll(".nav-links a");

    function setActiveLink() {
      let currentSectionId = "";
      let scrollPos = window.scrollY + 100; // Add offset for better detection

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        }
      });
    }

    window.addEventListener("scroll", setActiveLink);
    setActiveLink(); // Run once on page load too
  });
  
  function startLoading() {
    document.querySelector(".search-bar").style.display = "none"; // hide button
    document.getElementById("loader").style.display = "block"; // show loader

    setTimeout(() => {
      window.location.href = "signin.html";
    }, 2000); // simulate loading delay
  }