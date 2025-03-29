document.addEventListener("DOMContentLoaded", () => {
    // Create animated background circles
    createAnimatedCircles()
  
    // Show mascot speech bubble after a delay
    setTimeout(showMascotTip, 2000)
  
    // Add event listeners
    setupEventListeners()
  
    // Add pulse effect to stats periodically
    setupPulseEffect()
  })
  
  // Create animated background circles
  function createAnimatedCircles() {
    const container = document.getElementById("animated-circles")
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F3"]
  
    for (let i = 0; i < 15; i++) {
      const circle = document.createElement("div")
      circle.classList.add("animated-circle")
  
      // Random size between 50px and 350px
      const size = Math.random() * 300 + 50
  
      // Random position
      const left = Math.random() * 100
      const top = Math.random() * 100
  
      // Random color
      const color = colors[Math.floor(Math.random() * colors.length)]
  
      // Random animation duration
      const duration = 10 + Math.random() * 20
  
      // Random movement
      const xMove = Math.random() * 100 - 50
      const yMove = Math.random() * 100 - 50
  
      // Set styles
      circle.style.width = `${size}px`
      circle.style.height = `${size}px`
      circle.style.left = `${left}%`
      circle.style.top = `${top}%`
      circle.style.backgroundColor = color
      circle.style.animationDuration = `${duration}s`
      circle.style.setProperty("--x", `${xMove}px`)
      circle.style.setProperty("--y", `${yMove}px`)
  
      container.appendChild(circle)
    }
  }
  
  // Show mascot tip
  function showMascotTip() {
    const speechBubble = document.querySelector(".speech-bubble")
    speechBubble.classList.remove("hidden")
  
    // Hide after 5 seconds
    setTimeout(() => {
      speechBubble.classList.add("hidden")
    }, 5000)
  }
  
  // Setup event listeners
  function setupEventListeners() {
    // Floating mascot button
    const mascotButton = document.querySelector(".mascot-button")
    if (mascotButton) {
      mascotButton.addEventListener("click", () => {
        const speechBubble = document.querySelector(".speech-bubble")
        if (speechBubble.classList.contains("hidden")) {
          speechBubble.classList.remove("hidden")
  
          // Hide after 5 seconds
          setTimeout(() => {
            speechBubble.classList.add("hidden")
          }, 5000)
        } else {
          speechBubble.classList.add("hidden")
        }
      })
    }
  
    // Add hover effects to subject cards
    const subjectCards = document.querySelectorAll(".subject-card")
    subjectCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        const subjectId = card.getAttribute("data-subject")
        card.style.boxShadow = getSubjectGlow(subjectId)
      })
  
      card.addEventListener("mouseleave", () => {
        card.style.boxShadow = ""
      })
    })
  }
  
  // Get subject-specific glow color
  function getSubjectGlow(subjectId) {
    switch (subjectId) {
      case "1":
        return "0 0 20px rgba(139, 92, 246, 0.7)"
      case "2":
        return "0 0 20px rgba(59, 130, 246, 0.7)"
      case "3":
        return "0 0 20px rgba(245, 158, 11, 0.7)"
      default:
        return "0 0 20px rgba(255, 255, 255, 0.3)"
    }
  }
  
  // Setup pulse effect for stats
  function setupPulseEffect() {
    setInterval(() => {
      const statItems = document.querySelectorAll(".stat-item")
  
      statItems.forEach((item, index) => {
        // Add pulse class
        item.classList.add("pulse")
  
        // Remove pulse class after animation
        setTimeout(() => {
          item.classList.remove("pulse")
        }, 1000)
      })
    }, 5000)
  }
  
  