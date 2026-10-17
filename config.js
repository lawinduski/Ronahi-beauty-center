/* ==========================================================
   Ronahi Beauty Center — ڕێکخستنی گشتیی وێبسایت
   هەموو لینک و زانیارییەکان لێرە دەگۆڕدرێن، پێویست بە دەستکاریی HTML نییە.
   ========================================================== */
window.RONAHI_CONFIG = {

  /* ---------- شوێن ---------- */
  maps: "https://maps.app.goo.gl/9hgVcUWBcryBSpZE9?g_st=ic",
  address: "دهۆک، ڕێکا ڕەزا",
  // ئەگەر دەتەوێت نەخشە لەناو وێبسایتەکەدا پیشان بدرێت، لینکی Embed ی گووگڵ مەپ لێرە دابنێ
  // (Google Maps → Share → Embed a map → تەنیا ناوەڕۆکی src="...")
  mapEmbed: "",

  /* ---------- پەیوەندی (ئارەزوومەندانە — ئەگەر بەتاڵ بێت پیشان نادرێت) ---------- */
  phone: "+9647507236720",
  whatsapp: "9647507236720",
  hours: "",       // نموونە: "شەممە – پێنجشەممە، ٠٩:٠٠ – ٢٠:٠٠"

  /* ---------- سۆشیال میدیا ----------
     url: لینکی ئەکاونتەکە. ئەگەر بەتاڵ بێت، ئایکۆنەکە دەچێتە سەر socialHub.
     handle: ناوی ئەکاونت (پیشان دەدرێت لە بەشی پەیوەندی) — ئارەزوومەندانە. */
  socialHub: "https://linkbio.co/ronahibeautyctr",
  social: {
    snapchat:   { url: "https://t.snapchat.com/KVtakY5j", handle: "Ronahi Beauty Center" },
    instagram1: { url: "https://www.instagram.com/ronahi_g_beauty_center?vrfl=aHI0cnBoOHNybG01", handle: "@ronahi_g_beauty_center" },
    instagram2: { url: "https://www.instagram.com/ronahi_clinics?igsh=cnhlb2lpYmVuNHFq", handle: "@ronahi_clinics" },
    facebook:   { url: "https://www.facebook.com/profile.php?id=100092436410791&mibextid=sCpJLy", handle: "Ronahi Beauty Center" },
    tiktok:     { url: "https://www.tiktok.com/@ronahi_beauty_centrr?_t=8jJghzB6jRe&_r=1", handle: "@ronahi_beauty_centrr" }
  },

  /* ---------- وێنەی نموونەی کارەکان ----------
     1) وێنەکان بخەرە ناو فۆڵدەری  assets/gallery/
     2) لێرە هەر وێنەیەک وەک ئەم نموونانە زیاد بکە:

        { src: "assets/gallery/work-1.jpg", title: "ناونیشان (ئارەزوومەندانە)", category: "face" },

     category دەبێت یەکێک بێت لە key ەکانی خوارەوە. ئەگەر gallery بەتاڵ بێت،
     شوێنی وێنەکان بە شێوەی ئامادەکراو پیشان دەدرێت. */
  galleryCategories: [
    { key: "face",  label: "جوانکرنا ڕوو" },
    { key: "laser", label: "لێزەر" },
    { key: "prp",   label: "PRP" },
    { key: "hifu",  label: "HIFU" },
    { key: "other", label: "دی" }
  ],
  gallery: [
    { src: "assets/gallery/demo-face.svg", title: "وێنەیا نموونە — چاڤدێرییا ڕوو", category: "face" },
    { src: "assets/gallery/demo-laser.svg", title: "وێنەیا نموونە — لێزەر", category: "laser" },
    { src: "assets/gallery/demo-prp.svg", title: "وێنەیا نموونە — PRP", category: "prp" },
    { src: "assets/gallery/demo-hifu.svg", title: "وێنەیا نموونە — HIFU", category: "hifu" },
  ],

  /* ---------- بەراوردی بەر و پشتی (تەنیا وێنەی ڕاستەقینەی هاوتا دابنێ) ----------
     وێنەکان لە assets/gallery/ دابنێ و ڕێڕەویان لێرە بنووسە.
     تا وێنەی بەر و پشتی هەردووکیان نەبێت، بەشەکە پیشان نادرێت. */
  beforeAfter: {
    before: "assets/gallery/demo-before.svg",
    after: "assets/gallery/demo-after.svg",
    title: "بەر و پشتی خزمەتگوزاریێ",
    description: "گۆڕانکاریان ب بەراوردکرنا وێنان ببینە.",
    beforeLabel: "بەر",
    afterLabel: "پشتی",
    caption: "ئەم وێنەیان تەنێ بۆ تاقیکرنە؛ ئەنجاما ڕاستەقینەی کڕیار نین. پێش بڵاوکرنا وێبسایتێ، وێنەی ڕاستەقینە و هاوتا دابنە."
  }
};
