export default async function handler(req, res) {
  // Replace with your chosen secret token
  const SECURITY_TOKEN = "vmn1iXSorkfzz_TUVMOokThE";

  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method not allowed" });
    return;
  }

  // Check for security token in headers
  const clientToken = req.headers["x-security-token"];
  if (clientToken !== SECURITY_TOKEN) {
    res.status(401).json({ success: false, message: "Unauthorized: Invalid security token" });
    return;
  }

  const { name, email, rating, feedback } = req.body;

  const LARK_WEBHOOK_URL = "https://y8xp2r4oy7i.jp.larksuite.com/base/automation/webhook/event/MFRJaYUcMw1YZ8hWu5ujNEdapnd";

  try {
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