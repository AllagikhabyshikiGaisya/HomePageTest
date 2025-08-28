export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method not allowed" });
    return;
  }

  const { name, email, rating, feedback } = req.body;

  // TODO: Replace with your actual Lark Base webhook URL
  const LARK_WEBHOOK_URL = "https://open.larksuite.com/open-apis/bitable/v1/apps/APP_TOKEN/tables/TABLE_ID/records";

  try {
    // Example: Send data to Lark Base (adjust as needed for your Lark API)
    const response = await fetch(LARK_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer YOUR_LARK_TOKEN", // If needed
      },
      body: JSON.stringify({
        fields: {
          Name: name,
          Email: email,
          Rating: rating,
          Feedback: feedback,
        },
      }),
    });

    if (!response.ok) throw new Error("Lark API error");

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}