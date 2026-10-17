import { randomInt } from "node:crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "تەنیا ناردنی داواکاری ڕێگەپێدراوە." });
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
      return res.status(400).json({ ok: false, message: "زانیارییە پێویستەکان تەواو نییە." });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
      return res.status(400).json({ ok: false, message: "ڕۆژ یان کاتی ژوان دروست نییە." });
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return res.status(400).json({ ok: false, message: "ژمارەی مۆبایل دروست نییە." });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return res.status(500).json({ ok: false, message: "سیستەمی ژوان هێشتا چالاک نەکراوە." });
    }

    // Short, cryptographically random reference generated server-side.
    // Without persistent storage, a 4-digit code cannot be guaranteed globally unique forever.
    const reference = `APT-${randomInt(1000, 10000)}`;
    const branch = clean(process.env.RONAHI_BRANCH, 160) || "دهۆک، ڕێگای ڕەزا";
    const message = [
      "RONAHI BEAUTY CENTER",
      "",
      "داواکارییەکی نوێی ژوان هاتووە (چاوەڕێی پشتڕاستکردنەوە):",
      `ژمارەی داواکاری: ${reference}`,
      "",
      `ناو: ${name}`,
      `مۆبایل: ${phone}`,
      `خزمەتگوزاری: ${service}`,
      `لق / شوێن: ${branch}`,
      `ڕۆژ: ${date}`,
      `کات: ${time}`,
      `تێبینی: ${note || "—"}`,
      "",
      "ئەمە داواکارییە، نەک ژوانی پشتڕاستکراوە. تکایە لەگەڵ کڕیار پەیوەندی بکە."
    ].join("\n");

    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });
    const result = await tg.json().catch(() => ({}));
    if (!tg.ok || !result.ok) {
      return res.status(502).json({ ok: false, message: "ناردنی داواکاری سەرکەوتوو نەبوو." });
    }

    return res.status(200).json({
      ok: true,
      appointment: { reference, status: "pending", name, phone, service, branch, date, time }
    });
  } catch {
    return res.status(500).json({ ok: false, message: "هەڵەیەک ڕوویدا، تکایە دووبارە هەوڵ بدەرەوە." });
  }
}
