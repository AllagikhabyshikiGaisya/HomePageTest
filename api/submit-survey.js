export default async function handler(req, res) {
  const SECURITY_TOKEN = "vmn1iXSorkfzz_TUVMOokThE";
  const LARK_BEARER_TOKEN = "YOUR_LARK_BEARER_TOKEN"; // <-- Replace with your actual Lark Bearer token

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
        "Authorization": `Bearer ${LARK_BEARER_TOKEN}`, // <-- Add Bearer token header
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

    const larkResult = await response.text();
    console.log("Lark API response:", larkResult);

    if (!response.ok) {
      res.status(500).json({ success: false, message: "Lark API error", details: larkResult });
      return;
    }

    let larkJson;
    try {
      larkJson = JSON.parse(larkResult);
    } catch {
      larkJson = null;
    }

    if (larkJson && larkJson.code && larkJson.code !== 0) {
      res.status(500).json({ success: false, message: "Lark API error", details: larkJson });
      return;
    }

    res.status(200).json({ success: true, lark: larkJson });
  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
}