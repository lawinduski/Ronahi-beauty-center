/* ==========================================================
   Ronahi Beauty Center — ڕێکخستنی گشتیی وێبسایت
   هەموو لینک و زانیارییەکان لێرە دەگۆڕدرێن، پێویست بە دەستکاریی HTML نییە.
   ========================================================== */
window.RONAHI_CONFIG = {

  /* ---------- شوێن ---------- */
  maps: "https://maps.app.goo.gl/9hgVcUWBcryBSpZE9?g_st=ic",
  address: "دهۆک، ڕێگای ڕەزا",
  // ئەگەر دەتەوێت نەخشە لەناو وێبسایتەکەدا پیشان بدرێت، لینکی Embed ی گووگڵ مەپ لێرە دابنێ
  // (Google Maps → Share → Embed a map → تەنیا ناوەڕۆکی src="...")
  mapEmbed: "",

  /* ---------- پەیوەندی (ئارەزوومەندانە — ئەگەر بەتاڵ بێت پیشان نادرێت) ---------- */
  phone: "",       // نموونە: "+9647501234567"
  whatsapp: "",    // نموونە: "9647501234567" (بەبێ + و بۆشایی)
  hours: "",       // نموونە: "شەممە – پێنجشەممە، ٠٩:٠٠ – ٢٠:٠٠"

  /* ---------- سۆشیال میدیا ----------
     url: لینکی ئەکاونتەکە. ئەگەر بەتاڵ بێت، ئایکۆنەکە دەچێتە سەر socialHub.
     handle: ناوی ئەکاونت (پیشان دەدرێت لە بەشی پەیوەندی) — ئارەزوومەندانە. */
  socialHub: "https://linkbio.co/ronahibeautyctr",
  social: {
    snapchat:   { url: "", handle: "" },
    instagram1: { url: "", handle: "" },
    instagram2: { url: "", handle: "" },
    facebook:   { url: "", handle: "" },
    tiktok:     { url: "", handle: "" }
  },

  /* ---------- وێنەی نموونەی کارەکان ----------
     1) وێنەکان بخەرە ناو فۆڵدەری  assets/gallery/
     2) لێرە هەر وێنەیەک وەک ئەم نموونانە زیاد بکە:

        { src: "assets/gallery/work-1.jpg", title: "ناونیشان (ئارەزوومەندانە)", category: "face" },

     category دەبێت یەکێک بێت لە key ەکانی خوارەوە. ئەگەر gallery بەتاڵ بێت،
     شوێنی وێنەکان بە شێوەی ئامادەکراو پیشان دەدرێت. */
  galleryCategories: [
    { key: "face",  label: "جوانکاری ڕوو" },
    { key: "laser", label: "لێزەر" },
    { key: "prp",   label: "PRP" },
    { key: "hifu",  label: "HIFU" },
    { key: "other", label: "تر" }
  ],
  gallery: [
    // { src: "assets/gallery/work-1.jpg", title: "", category: "face" },
    // { src: "assets/gallery/work-2.jpg", title: "", category: "laser" },
  ],

  /* ---------- بەراوردی پێش و دوای (تەنیا وێنەی ڕاستەقینەی هاوتا دابنێ) ----------
     وێنەکان لە assets/gallery/ دابنێ و ڕێڕەویان لێرە بنووسە.
     تا وێنەی پێش و دوای هەردووکیان نەبێت، بەشەکە پیشان نادرێت. */
  beforeAfter: {
    before: "", // نموونە: "assets/gallery/before-1.jpg"
    after: "",  // نموونە: "assets/gallery/after-1.jpg"
    title: "پێش و دوای خزمەتگوزاری",
    description: "گۆڕانکارییەکان بە بەراوردی وێنەکان ببینە.",
    beforeLabel: "پێش",
    afterLabel: "دوای",
    caption: ""
  }
};
