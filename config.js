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
  phone: "+9647507236720",       // نموونە: "+9647501234567"
  whatsapp: "+9647507236720",    // نموونە: "9647501234567" (بەبێ + و بۆشایی)
  hours: "شەمبی - پێنج شەمبی، 4:00pm - 10:00pm",       // نموونە: "شەممە – پێنجشەممە، ٠٩:٠٠ – ٢٠:٠٠"

  /* ---------- سۆشیال میدیا ----------
     url: لینکی ئەکاونتەکە. ئەگەر بەتاڵ بێت، ئایکۆنەکە دەچێتە سەر socialHub.
     handle: ناوی ئەکاونت (پیشان دەدرێت لە بەشی پەیوەندی) — ئارەزوومەندانە. */
  socialHub: "https://linkbio.co/ronahibeautyctr",
  social: {
    snapchat:   { url: "https://t.snapchat.com/KVtakY5j", handle: "" },
    instagram1: { url: "https://www.instagram.com/ronahi_g_beauty_center?mdxt=aHI0cnBoOHNybG01", handle: "" },
    instagram2: { url: "https://www.instagram.com/ronahi_clinics?igsh=cnhlb2lpYmVuNHFq", handle: "" },
    facebook:   { url: "https://www.facebook.com/profile.php?id=100092436410791&mibextid=sCpJLy", handle: "" },
    tiktok:     { url: "https://www.tiktok.com/@ronahi_beauty_centrr?_t=8jJghzB6jRe&_r=1", handle: "" }
  },

  /* ---------- وێنەی نموونەی کارەکان ----------
     1) وێنەکان بخەرە ناو فۆڵدەری  assets/gallery/
     2) لێرە هەر وێنەیەک وەک ئەم نموونانە زیاد بکە:

        { src: "assets/gallery/work-1.jpg", title: "ناونیشان (ئارەزوومەندانە)", category: "face" },

     category دەبێت یەکێک بێت لە key ەکانی خوارەوە. ئەگەر gallery بەتاڵ بێت،
     شوێنی وێنەکان بە شێوەی ئامادەکراو پیشان دەدرێت. */
  galleryCategories: [
    { key: "face",  label: "جوانکارییا ڕوخساری" },
    { key: "laser", label: "لێزەر" },
    { key: "prp",   label: "PRP" },
    { key: "hifu",  label: "HIFU" },
    { key: "other", label: "یێن دی" }
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
