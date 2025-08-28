document.getElementById("surveyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    rating: form.rating.value,
    feedback: form.feedback.value,
  };

  const res = await fetch("/api/submit-survey", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  document.getElementById("message").textContent = 
    result.success ? "✅ Thank you for your feedback!" : "❌ Submission failed.";
});
