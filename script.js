// Custom JavaScript for Portfolio Website

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href.startsWith("#")) {
        e.preventDefault()
        const target = document.querySelector(href)

        if (target) {
          const offsetTop = target.offsetTop - 80 // Account for fixed navbar

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Navbar background change on scroll
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = "rgba(10, 10, 10, 0.98)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)"
    } else {
      navbar.style.backgroundColor = "rgba(10, 10, 10, 0.95)"
      navbar.style.boxShadow = "none"
    }
  })

  // Fade in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Add fade-in class to elements and observe them
  const animateElements = document.querySelectorAll(
    ".case-study-card, .service-card, .testimonial-card, .narrative-card",
  )

  animateElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  // Parallax effect for stars
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const stars = document.querySelector(".stars")

    if (stars) {
      const speed = scrolled * 0.5
      stars.style.transform = `translateX(-${speed}px)`
    }
  })

  // Button hover effects
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Card hover effects with tilt
  const cards = document.querySelectorAll(".case-study-card, .service-card, .testimonial-card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"
    })
  })

  // Typing effect for hero title
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const text = heroTitle.textContent
    heroTitle.textContent = ""

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000)
  }

  // Active navigation link highlighting
  const sections = document.querySelectorAll("section[id]")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Form validation and submission (if contact form exists)
  const contactForm = document.querySelector("#contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Basic form validation
      const inputs = this.querySelectorAll("input[required], textarea[required]")
      let isValid = true

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          input.classList.add("is-invalid")
        } else {
          input.classList.remove("is-invalid")
        }
      })

      if (isValid) {
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]')
        const originalText = submitBtn.textContent

        submitBtn.textContent = "Sending..."
        submitBtn.disabled = true

        setTimeout(() => {
          submitBtn.textContent = "Message Sent!"
          submitBtn.classList.remove("btn-primary")
          submitBtn.classList.add("btn-success")

          setTimeout(() => {
            submitBtn.textContent = originalText
            submitBtn.disabled = false
            submitBtn.classList.remove("btn-success")
            submitBtn.classList.add("btn-primary")
            this.reset()
          }, 2000)
        }, 1500)
      }
    })
  }

  // Accordion smooth animation
  const accordionButtons = document.querySelectorAll(".accordion-button")

  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const target = document.querySelector(this.getAttribute("data-bs-target"))

      if (target) {
        setTimeout(() => {
          target.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          })
        }, 300)
      }
    })
  })

  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Performance optimization: Debounce scroll events
  let ticking = false

  function updateOnScroll() {
    // Scroll-based animations and effects go here
    ticking = false
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll)
      ticking = true
    }
  })

  console.log("Portfolio website loaded successfully!")
})

// Utility functions
function debounce(func, wait, immediate) {
  let timeout
  return function executedFunction() {
    
    const args = arguments

    const later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }

    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) func.apply(this, args)
  }
}

// Theme switcher (optional feature)
function toggleTheme() {
  const body = document.body
  const currentTheme = body.getAttribute("data-theme")

  if (currentTheme === "light") {
    body.setAttribute("data-theme", "dark")
    localStorage.setItem("theme", "dark")
  } else {
    body.setAttribute("data-theme", "light")
    localStorage.setItem("theme", "light")
  }
}

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "dark"
document.body.setAttribute("data-theme", savedTheme)
