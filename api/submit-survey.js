import axios from "axios";

const WEBHOOK_URL = "https://y8xp2r4oy7i.jp.larksuite.com/base/automation/webhook/event/MFRJaYUcMw1YZ8hWu5ujNEdapnd";
const BEARER_TOKEN = "IUsdohV1lbAt8R_rNbZKZc7k"; // keep this secret!

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const payload = req.body;

    await axios.post(WEBHOOK_URL, payload, {
      headers: {
        "Authorization": `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ success: false, error: "Failed to send to Lark" });
  }
}
