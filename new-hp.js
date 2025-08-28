document.getElementById("hpForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    inquiry_number: form.inquiry_number.value,
    inquiry_date: form.inquiry_date.value,
    name: form.name.value,
    postal_code: form.postal_code.value,
    address: form.address.value,
    phone_number: form.phone_number.value,
    email: form.email.value,
    trigger: form.trigger.value,
    subject: form.subject.value,
    title: form.title.value,
    url: form.url.value,
    visit_location: form.visit_location.value,
    visit_date: form.visit_date.value,
    preferred_time: form.preferred_time.value,
    division: form.division.value
  };

  try {
    const res = await fetch("/api/submit-survey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-security-token": "vmn1iXSorkfzz_TUVMOokThE"
      },
      body: JSON.stringify(data),
    });

    let result;
    try {
      result = await res.json();
    } catch {
      document.getElementById("message").textContent = "⚠️ サーバーエラー (Server error)";
      return;
    }

    if (result.success) {
      document.getElementById("message").textContent = "✅ 送信が完了しました！ (Submission successful!)";
      form.reset();
    } else {
      document.getElementById("message").textContent = "❌ 送信に失敗しました (Submission failed)";
    }
  } catch (err) {
    document.getElementById("message").textContent = "⚠️ 通信エラー (Network error)";
  }
});