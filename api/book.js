import { randomInt } from "node:crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "تنێ هنارتنا داخوازیێ ڕێپێدایە." });
  }

  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const clean = (value, max) => String(value == null ? "" : value).trim().slice(0, max);
    const name = clean(body.name, 120);
    const phone = clean(body.phone, 30);
    const service = clean(body.service, 120);
    const date = clean(body.date, 10);
    const time = clean(body.time, 20);
    const note = clean(body.note, 1000);

    if (!name || name.length < 2 || !phone || !service || !date || !time) {
      return res.status(400).json({ ok: false, message: "زانیاریێن پێدڤی نە تەمامن." });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
      return res.status(400).json({ ok: false, message: "ڕۆژ یان دەمژمێرا سەرەدانێ نینە." });
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return res.status(400).json({ ok: false, message: "ژمارا مۆبایلێ دروست نینە." });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return res.status(500).json({ ok: false, message: "سیستەمێ ژڤانان هێشتا نەهاتییە چالاککرن." });
    }

    // Short, cryptographically random reference generated server-side.
    // Without persistent storage, a 4-digit code cannot be guaranteed globally unique forever.
    const reference = `APT-${randomInt(1000, 10000)}`;
    const branch = clean(process.env.RONAHI_BRANCH, 160) || "دهۆک، ڕێکا ڕەزا";
    const message = [
      "RONAHI BEAUTY CENTER",
      "",
      "داخوازیا نوو یا ژڤانی هاتییە (ل هیڤیا پشتڕاستکرنێ یە):",
      `ژمارا داخوازیێ: ${reference}`,
      "",
      `ناڤ: ${name}`,
      `مۆبایل: ${phone}`,
      `خزمەتگوزاری: ${service}`,
      `لق / جهـ: ${branch}`,
      `ڕۆژ: ${date}`,
      `دەم: ${time}`,
      `تێبینی: ${note || "—"}`,
      "",
      "ئەڤە داخوازییە، نە ژڤانێ پشتڕاستکرییە. هیڤییە دگەل کڕیاری پەیوەندیێ بکە."
    ].join("\n");

    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });
    const result = await tg.json().catch(() => ({}));
    if (!tg.ok || !result.ok) {
      return res.status(502).json({ ok: false, message: "هنارتنا داخوازێ سەربکەفتی نەبوو." });
    }

    return res.status(200).json({
      ok: true,
      appointment: { reference, status: "pending", name, phone, service, branch, date, time }
    });
  } catch {
    return res.status(500).json({ ok: false, message: "خەلەتییەک چێبوو، هیڤییە دووبارە بزاڤێ بکەڤە." });
  }
}
