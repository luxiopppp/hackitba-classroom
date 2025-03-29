document.addEventListener("DOMContentLoaded", () => {
    // Create animated background circles
    createAnimatedCircles()
  
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const subjectId = Number.parseInt(urlParams.get("subject")) || 1
    const lessonId = Number.parseInt(urlParams.get("lesson")) || 1
  
    // Initialize lesson
    initLesson(subjectId, lessonId)
  
    // Setup pulse effect for hearts
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
  
  // Initialize lesson
  function initLesson(subjectId, lessonId) {
    // Set lesson title
    const lessonTitle = document.getElementById("lesson-title")
    const subjectName = getSubjectName(subjectId)
    lessonTitle.textContent = `${subjectName} - Lección ${lessonId}`
  
    // Set header color based on subject
    const header = document.querySelector(".header")
    header.style.backgroundColor = getSubjectColor(subjectId)
  
    // Initialize lesson state
    const lessonState = {
      subjectId,
      lessonId,
      currentStep: 0,
      lives: 5,
      score: 0,
      selectedOption: null,
      isCorrect: null,
      exercises: getExercises(subjectId),
    }
  
    // Update lives display
    updateLivesDisplay(lessonState.lives)
  
    // Load first exercise
    loadExercise(lessonState)
  
    // Setup continue button
    const continueButton = document.getElementById("continue")
    continueButton.addEventListener("click", () => {
      if (lessonState.currentStep < lessonState.exercises.length - 1) {
        // Go to next exercise
        lessonState.currentStep++
        lessonState.selectedOption = null
        lessonState.isCorrect = null
  
        // Hide mascot
        document.getElementById("lesson-mascot").classList.add("hidden")
  
        // Update progress
        updateProgress(lessonState)
  
        // Load next exercise
        loadExercise(lessonState)
      } else {
        // Show celebration screen
        showCelebration(lessonState)
      }
    })
  
    // Setup retry button
    const retryButton = document.getElementById("retry-button")
    retryButton.addEventListener("click", () => {
      window.location.reload()
    })
  }
  
  // Get subject name
  function getSubjectName(subjectId) {
    const subjects = {
      1: "Matemáticas",
      2: "Ciencias",
      3: "Historia",
    }
    return subjects[subjectId] || "Matemáticas"
  }
  
  // Get subject color
  function getSubjectColor(subjectId) {
    const colors = {
      1: "#8b5cf6", // Violet for Math
      2: "#3b82f6", // Blue for Science
      3: "#f59e0b", // Amber for History
    }
    return colors[subjectId] || "#8b5cf6"
  }
  
  // Get exercises for subject
  function getExercises(subjectId) {
    return [
      {
        type: "select",
        question:
          subjectId === 1
            ? "¿Cuál es el resultado de 7 × 8?"
            : subjectId === 2
              ? "¿Cuál NO es un estado de la materia?"
              : "¿En qué año llegó Colón a América?",
        options:
          subjectId === 1
            ? ["54", "56", "64", "48"]
            : subjectId === 2
              ? ["Sólido", "Líquido", "Gas", "Roca"]
              : ["1492", "1776", "1066", "1500"],
        correctAnswer: subjectId === 1 ? 1 : subjectId === 2 ? 3 : 0,
      },
      {
        type: "select",
        question:
          subjectId === 1
            ? "Resuelve para x: 2x + 5 = 15"
            : subjectId === 2
              ? "¿Qué planeta está más cerca del Sol?"
              : "¿Quién escribió la Declaración de Independencia?",
        options:
          subjectId === 1
            ? ["5", "10", "7.5", "5.5"]
            : subjectId === 2
              ? ["Tierra", "Venus", "Mercurio", "Marte"]
              : ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"],
        correctAnswer: subjectId === 1 ? 0 : subjectId === 2 ? 2 : 1,
      },
      {
        type: "select",
        question:
          subjectId === 1
            ? "¿Cuál es el área de un cuadrado con lados de 6 unidades?"
            : subjectId === 2
              ? "¿Qué es la fotosíntesis?"
              : "¿Qué país NO participó en la Primera Guerra Mundial?",
        options:
          subjectId === 1
            ? ["12", "24", "36", "42"]
            : subjectId === 2
              ? ["Proceso de respiración", "Producción de energía en plantas", "Digestión animal", "División celular"]
              : ["Alemania", "Francia", "España", "Rusia"],
        correctAnswer: subjectId === 1 ? 2 : subjectId === 2 ? 1 : 2,
      },
    ]
  }
  
  // Load exercise
  function loadExercise(state) {
    const exercise = state.exercises[state.currentStep]
  
    // Set question
    const questionElement = document.getElementById("question")
    questionElement.textContent = exercise.question
  
    // Clear options container
    const optionsContainer = document.getElementById("options-container")
    optionsContainer.innerHTML = ""
  
    // Create options
    exercise.options.forEach((option, index) => {
      const optionElement = document.createElement("div")
      optionElement.classList.add("option")
      optionElement.innerHTML = `
        <div class="option-content">
          <div class="option-letter">${String.fromCharCode(65 + index)}</div>
          <div class="option-text">${option}</div>
        </div>
        <div class="option-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="volume-icon"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
        </div>
      `
  
      // Add click event
      optionElement.addEventListener("click", () => {
        if (state.selectedOption !== null) return // Already selected
  
        state.selectedOption = index
        const correct = index === exercise.correctAnswer
        state.isCorrect = correct
  
        // Update score and lives
        if (correct) {
          state.score += 10
          updateScore(state.score)
  
          // Show mascot with congratulation
          setTimeout(() => {
            document.getElementById("lesson-mascot").classList.remove("hidden")
  
            // Hide after 3 seconds
            setTimeout(() => {
              document.getElementById("lesson-mascot").classList.add("hidden")
            }, 3000)
          }, 500)
        } else {
          state.lives--
          updateLivesDisplay(state.lives)
        }
  
        // Update option styling
        if (correct) {
          optionElement.classList.add("correct")
        } else {
          optionElement.classList.add("incorrect")
  
          // Highlight correct answer
          const correctOption = optionsContainer.children[exercise.correctAnswer]
          correctOption.classList.add("correct")
        }
  
        // Show continue button
        document.getElementById("continue-button").classList.remove("hidden")
      })
  
      optionsContainer.appendChild(optionElement)
    })
  
    // Hide continue button
    document.getElementById("continue-button").classList.add("hidden")
  
    // Update progress
    updateProgress(state)
  }
  
  // Update progress bar
  function updateProgress(state) {
    const progress = ((state.currentStep + 1) / state.exercises.length) * 100
    document.getElementById("lesson-progress").style.width = `${progress}%`
  }
  
  // Update lives display
  function updateLivesDisplay(lives) {
    document.getElementById("lives-count").textContent = lives
  }
  
  // Update score display
  function updateScore(score) {
    document.getElementById("current-score").textContent = `${score} XP`
  }
  
  // Show celebration screen
  function showCelebration(state) {
    // Hide exercise container
    document.getElementById("exercise-container").classList.add("hidden")
  
    // Show celebration container
    document.getElementById("celebration-container").classList.remove("hidden")
  
    // Update score display
    document.getElementById("score-display").textContent = `${state.score} XP`
  
    // Create confetti
    createConfetti()
  }
  
  // Create confetti effect
  function createConfetti() {
    const container = document.getElementById("confetti-container")
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F3", "#33FFF3"]
  
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div")
      confetti.classList.add("confetti")
  
      // Random position
      const x = Math.random() * 100
      const startY = Math.random() * -100
  
      // Random color
      const color = colors[Math.floor(Math.random() * colors.length)]
  
      // Set styles
      confetti.style.left = `${x}%`
      confetti.style.backgroundColor = color
      confetti.style.setProperty("--start-y", `${startY}px`)
  
      // Random animation duration
      confetti.style.animationDuration = `${2 + Math.random() * 2}s`
  
      container.appendChild(confetti)
    }
  }
  
  // Setup pulse effect for hearts
  function setupPulseEffect() {
    setInterval(() => {
      const hearts = document.querySelector(".hearts")
  
      // Add pulse class
      hearts.classList.add("pulse")
  
      // Remove pulse class after animation
      setTimeout(() => {
        hearts.classList.remove("pulse")
      }, 1000)
    }, 5000)
  }
  
  