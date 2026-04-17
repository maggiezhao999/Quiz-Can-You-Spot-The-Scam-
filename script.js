let totalScore = 0;

function showPage(pageNumber) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(page => page.classList.remove("active"));
  document.getElementById("page" + pageNumber).classList.add("active");
}

function startQuiz() {
  localStorage.clear();
  totalScore = 0;
  resetAllFeedbackStyles();
  showPage(2);
}

function getFeedbackConfig(points) {
  if (points === 0) {
    return {
      emoji: "⚠️",
      feedbackClass: "feedback-danger",
      buttonClass: "btn-danger"
    };
  } else if (points === 1) {
    return {
      emoji: "✍️",
      feedbackClass: "feedback-warning",
      buttonClass: "btn-warning"
    };
  } else {
    return {
      emoji: "🎉",
      feedbackClass: "feedback-success",
      buttonClass: "btn-success"
    };
  }
}

function clearStateClasses(element) {
  element.classList.remove("feedback-danger", "feedback-warning", "feedback-success");
  element.classList.remove("result-danger", "result-warning", "result-success");
  element.classList.remove("btn-danger", "btn-warning", "btn-success");
}

function selectAnswer(questionNumber, points, feedbackText) {
  totalScore += points;

  localStorage.setItem("question" + questionNumber, points);
  localStorage.setItem("totalScore", totalScore);

  const optionsBox = document.getElementById("options" + questionNumber);
  const feedbackBox = document.getElementById("feedback" + questionNumber);
  const feedbackTextEl = document.getElementById("feedbackText" + questionNumber);
  const continueBtn = feedbackBox.querySelector(".continue-btn");

  const config = getFeedbackConfig(points);

  optionsBox.classList.add("hidden");

  clearStateClasses(feedbackBox);
  clearStateClasses(continueBtn);

  feedbackBox.classList.add(config.feedbackClass);
  continueBtn.classList.add(config.buttonClass);

  feedbackTextEl.innerText = `${config.emoji} ${feedbackText}`;
  feedbackBox.classList.remove("hidden");
}

function goNextPage(pageNumber) {
  const previousQuestion = pageNumber - 1;

  const previousOptions = document.getElementById("options" + previousQuestion);
  const previousFeedback = document.getElementById("feedback" + previousQuestion);

  if (previousOptions) {
    previousOptions.classList.remove("hidden");
  }

  if (previousFeedback) {
    previousFeedback.classList.add("hidden");
  }

  showPage(pageNumber);
}

function showResult() {
  localStorage.setItem("finalScore", totalScore);

  const lastOptions = document.getElementById("options6");
  const lastFeedback = document.getElementById("feedback6");

  if (lastOptions) {
    lastOptions.classList.remove("hidden");
  }

  if (lastFeedback) {
    lastFeedback.classList.add("hidden");
  }

  showPage(10);

  const resultBox = document.querySelector(".result-box");
  const resultTitle = document.getElementById("resultTitle");
  const resultText = document.getElementById("resultText");

  clearStateClasses(resultBox);

  if (totalScore <= 4) {
    resultBox.classList.add("result-danger");
    resultTitle.innerText = "⚠️ You are still building scam awareness.";
    resultText.innerText =
      "Many scams are designed to feel urgent and believable. Please verify and check with trusted sources before acting.";
  } else if (totalScore <= 8) {
    resultBox.classList.add("result-warning");
    resultTitle.innerText = "✍️ You are doing quite well, but stay careful.";
    resultText.innerText =
      "You already show some good awareness, but some messages and images can still be misleading. Take your time and double-check before trust what you see.";
  } else {
    resultBox.classList.add("result-success");
    resultTitle.innerText = "🎉 Great job staying alert online.";
    resultText.innerText =
      "You show strong scam awareness. Keep checking official sources and keep thoughtful before trusting a message or image.";
  }
}

function resetAllFeedbackStyles() {
  for (let i = 1; i <= 6; i++) {
    const feedbackBox = document.getElementById("feedback" + i);
    if (feedbackBox) {
      clearStateClasses(feedbackBox);
    }

    const continueBtn = feedbackBox ? feedbackBox.querySelector(".continue-btn") : null;
    if (continueBtn) {
      clearStateClasses(continueBtn);
    }
  }

  const resultBox = document.querySelector(".result-box");
  if (resultBox) {
    clearStateClasses(resultBox);
  }
}

function restartQuiz() {
  localStorage.clear();
  totalScore = 0;

  for (let i = 1; i <= 6; i++) {
    const options = document.getElementById("options" + i);
    const feedback = document.getElementById("feedback" + i);
    const feedbackText = document.getElementById("feedbackText" + i);

    if (options) options.classList.remove("hidden");
    if (feedback) feedback.classList.add("hidden");
    if (feedbackText) feedbackText.innerText = "";

    if (feedback) clearStateClasses(feedback);

    const continueBtn = feedback ? feedback.querySelector(".continue-btn") : null;
    if (continueBtn) clearStateClasses(continueBtn);
  }

  const resultBox = document.querySelector(".result-box");
  if (resultBox) clearStateClasses(resultBox);

  showPage(1);
}
