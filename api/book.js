import { randomInt } from "node:crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "تەنێ ناردنا داخوازیێ ڕێپێدراوە." });
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
      return res.status(400).json({ ok: false, message: "زانیاریێن پێدڤی تەمام نینن." });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
      return res.status(400).json({ ok: false, message: "ڕۆژ یان دەمێ ژڤانێ دروست نینە." });
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return res.status(400).json({ ok: false, message: "ژمارا مۆبایلێ دروست نینە." });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return res.status(500).json({ ok: false, message: "سیستەما ژڤانێ هێشتا چالاک نەکریە." });
    }

    // Short, cryptographically random reference generated server-side.
    // Without persistent storage, a 4-digit code cannot be guaranteed globally unique forever.
    const reference = `APT-${randomInt(1000, 10000)}`;
    const branch = clean(process.env.RONAHI_BRANCH, 160) || "دهۆک، ڕێکا ڕەزا";
    const message = [
      "RONAHI BEAUTY CENTER",
      "",
      "داخوازییەکا نوی یا ژڤانێ هاتیە (چاوەڕێیا پشتڕاستکرنێ):",
      `ژمارا داخوازیێ: ${reference}`,
      "",
      `ناڤ: ${name}`,
      `مۆبایل: ${phone}`,
      `خزمەتگوزاری: ${service}`,
      `لق / جه: ${branch}`,
      `ڕۆژ: ${date}`,
      `دەم: ${time}`,
      `تێبینی: ${note || "—"}`,
      "",
      "ئەڤە داخوازییە، نە ژڤانا پشتڕاستکری. تکایە پەیوەندیێ ب کڕیارڤە بکە."
    ].join("\n");

    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });
    const result = await tg.json().catch(() => ({}));
    if (!tg.ok || !result.ok) {
      return res.status(502).json({ ok: false, message: "ناردنا داخوازیێ سەرکەفتی نەبوو." });
    }

    return res.status(200).json({
      ok: true,
      appointment: { reference, status: "pending", name, phone, service, branch, date, time }
    });
  } catch {
    return res.status(500).json({ ok: false, message: "هەڵەیەک ڕووی دا؛ تکایە جارەکا دی هەوڵ بدە." });
  }
}
