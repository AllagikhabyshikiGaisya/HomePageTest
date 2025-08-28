export default async function handler(req, res) {
  const SECURITY_TOKEN = "vmn1iXSorkfzz_TUVMOokThE";
  const LARK_BEARER_TOKEN = "WylwkmV8U9FNpYmDL0_eHg8x";

  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method not allowed" });
    return;
  }

  const clientToken = req.headers["x-security-token"];
  if (clientToken !== SECURITY_TOKEN) {
    res.status(401).json({ success: false, message: "Unauthorized: Invalid security token" });
    return;
  }

  const {
    inquiry_number,
    inquiry_date,
    name,
    postal_code,
    address,
    phone_number,
    email,
    trigger,
    subject,
    title,
    url,
    visit_location,
    visit_date,
    preferred_time,
    division
  } = req.body;

  const LARK_WEBHOOK_URL = "https://y8xp2r4oy7i.jp.larksuite.com/base/automation/webhook/event/CysKaiu8wwOpY9hsWChj3dXtpob";

  try {
    const response = await fetch(LARK_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LARK_BEARER_TOKEN}`,
      },
      body: JSON.stringify({
        fields: {
          "問合せ番号": inquiry_number,
          "問合せ日時": inquiry_date,
          "名前": name,
          "郵便番号": postal_code,
          "住所": address,
          "電話番号": phone_number,
          "メールアドレス": email,
          "きっかけ": trigger,
          "件名": subject,
          "タイトル": title,
          "URL": url,
          "★来場希望先": visit_location,
          "来場希望日": visit_date,
          "希望時間": preferred_time,
          "事業部": division
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