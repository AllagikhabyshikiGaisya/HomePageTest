export default async function handler(req, res) {
  const SECURITY_TOKEN = "vmn1iXSorkfzz_TUVMOokThE";

  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method not allowed" });
    return;
  }

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

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lark API error:", errorText);
      res.status(500).json({ success: false, message: "Lark API error", details: errorText });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
}