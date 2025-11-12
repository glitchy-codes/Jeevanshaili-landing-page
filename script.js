document.addEventListener("DOMContentLoaded", function() {

  // --- 1. Theme Toggle (Light/Dark Mode) ---
  const themeToggle = document.getElementById("theme-toggle");
  
  // Check for saved theme in localStorage
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    
    // Save preference to localStorage
    if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  });


  // --- 2. Tabbed Interface Logic ---
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");

  tabLinks.forEach(link => {
    link.addEventListener("click", () => {
      const tabId = link.getAttribute("data-tab");

      // Remove active class from all links and content
      tabLinks.forEach(item => item.classList.remove("active"));
      tabContents.forEach(item => item.classList.remove("active"));

      // Add active class to clicked link and corresponding content
      link.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });


  // --- 3. Accordion Logic ---
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", function() {
      const accordionItem = this.parentElement;
      const accordionContent = this.nextElementSibling;
      const isActive = accordionItem.classList.contains("active");

      // Optional: Close all other accordions
      document.querySelectorAll('.accordion-item.active').forEach(item => {
        if (item !== accordionItem) {
          item.classList.remove('active');
          item.querySelector('.accordion-content').style.maxHeight = null;
          item.querySelector('.accordion-content').style.paddingBottom = null;
        }
      });

      // Toggle the current accordion
      if (isActive) {
        accordionItem.classList.remove("active");
        accordionContent.style.maxHeight = null;
        accordionContent.style.paddingBottom = null;
      } else {
        accordionItem.classList.add("active");
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        accordionContent.style.paddingBottom = "24px";
      }
    });
  });


  // --- 4. Modal Logic ---
  const hospitalModal = document.getElementById("hospitalModal");
  const joinModal = document.getElementById("joinModal");
  
  const showHospitalBtn = document.getElementById("showHospitalForm");
  const showJoinBtn = document.getElementById("showJoinForm");
  
  const closeBtns = document.querySelectorAll(".modal-close-btn");
  const modalOverlays = document.querySelectorAll(".modal-overlay");

  // Function to open modals
  showHospitalBtn.addEventListener("click", () => {
    hospitalModal.classList.add("active");
  });
  showJoinBtn.addEventListener("click", () => {
    joinModal.classList.add("active");
  });

  // Function to close modals (with X button)
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal-overlay").classList.remove("active");
    });
  });

  // Function to close modals (by clicking overlay)
  modalOverlays.forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      // Only close if the click is on the overlay itself, not the content
      if (e.target === overlay) {
        overlay.classList.remove("active");
      }
    });
  });
  
  // Close modal with 'Escape' key
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
      });
    }
  });

});