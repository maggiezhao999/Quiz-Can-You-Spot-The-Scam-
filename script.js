    let totalScore = 0;

    function showPage(pageNumber) {
      const pages = document.querySelectorAll(".page");
      pages.forEach(page => page.classList.remove("active"));
      document.getElementById("page" + pageNumber).classList.add("active");
    }

    function startQuiz() {
      localStorage.clear();
      totalScore = 0;
      showPage(2);
    }

    function selectAnswer(questionNumber, points, feedbackText) {
      totalScore += points;

      localStorage.setItem("question" + questionNumber, points);
      localStorage.setItem("totalScore", totalScore);

      document.getElementById("options" + questionNumber).classList.add("hidden");
      document.getElementById("feedbackText" + questionNumber).innerText = feedbackText;
      document.getElementById("feedback" + questionNumber).classList.remove("hidden");
    }

    function goNextPage(pageNumber) {
      const previousQuestion = pageNumber - 1;

      if (document.getElementById("options" + previousQuestion)) {
        document.getElementById("options" + previousQuestion).classList.remove("hidden");
      }

      if (document.getElementById("feedback" + previousQuestion)) {
        document.getElementById("feedback" + previousQuestion).classList.add("hidden");
      }

      showPage(pageNumber);
    }

    function showResult() {
      localStorage.setItem("finalScore", totalScore);

      if (document.getElementById("options8")) {
        document.getElementById("options8").classList.remove("hidden");
      }

      if (document.getElementById("feedback8")) {
        document.getElementById("feedback8").classList.add("hidden");
      }

      showPage(10);

      const resultTitle = document.getElementById("resultTitle");
      const resultText = document.getElementById("resultText");

      if (totalScore <= 6) {
        resultTitle.innerText = "You are still building scam awareness.";
        resultText.innerText =
          "That is okay. Many scams are designed to feel personal, urgent, and believable. A helpful next step is to pause, verify, and check with trusted sources before acting.";
      } else if (totalScore <= 11) {
        resultTitle.innerText = "You are doing fairly well, but stay careful.";
        resultText.innerText =
          "You already show some strong instincts, and that is a great start. Still, scammers are becoming more convincing, especially with personal details and AI-generated content.";
      } else {
        resultTitle.innerText = "Great job staying alert online.";
        resultText.innerText =
          "You show strong scam awareness and good caution in digital situations. Keep taking your time, checking official sources, and staying thoughtful before trusting a message or image.";
      }
    }

    function restartQuiz() {
      localStorage.clear();
      totalScore = 0;

      for (let i = 1; i <= 8; i++) {
        const options = document.getElementById("options" + i);
        const feedback = document.getElementById("feedback" + i);
        if (options) options.classList.remove("hidden");
        if (feedback) feedback.classList.add("hidden");
      }

      showPage(1);
    }
