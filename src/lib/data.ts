// Dummy content so every page and interaction can be reviewed before real
// photos and copy arrive. Swap the text and `tone`/`imageCount` values for
// real <Image> sources later (see components/PlaceholderImage.tsx).

export type Project = {
  slug: string;
  title: string;
  category: "Wedding" | "Prewedding" | "Engagement" | "Family";
  location: string;
  year: string;
  excerpt: string;
  story: string;
  tone: number;
  imageCount: number;
};

export const projects: Project[] = [
  {
    slug: "senja-di-uluwatu",
    title: "Senja di Uluwatu",
    category: "Prewedding",
    location: "Uluwatu, Bali",
    year: "2025",
    excerpt: "Dua jiwa, satu janji, di antara tebing dan ombak senja.",
    story:
      "Sesi prewedding ini digarap saat golden hour di tebing Uluwatu, memanfaatkan cahaya alami dan angin laut untuk menghadirkan gerakan yang jujur dan tidak dibuat-buat.",
    tone: 0,
    imageCount: 8,
  },
  {
    slug: "pernikahan-adat-jawa",
    title: "Pernikahan Adat Jawa",
    category: "Wedding",
    location: "Yogyakarta",
    year: "2025",
    excerpt: "Prosesi sakral yang dirangkai menjadi narasi visual yang hangat.",
    story:
      "Dari prosesi siraman hingga panggih, kami mengikuti setiap detail adat tanpa mengganggu jalannya acara, menghasilkan dokumentasi yang mengalir seperti cerita.",
    tone: 1,
    imageCount: 10,
  },
  {
    slug: "lamaran-di-kebun-teh",
    title: "Lamaran di Kebun Teh",
    category: "Engagement",
    location: "Puncak, Bogor",
    year: "2024",
    excerpt: "Kejutan lamaran di tengah kabut pagi kebun teh.",
    story:
      "Kami berkoordinasi diam-diam dengan calon mempelai pria untuk mengabadikan momen kejutan lamaran tanpa terdeteksi, menjaga keaslian reaksi yang terekam.",
    tone: 2,
    imageCount: 6,
  },
  {
    slug: "reuni-keluarga-besar",
    title: "Reuni Keluarga Besar",
    category: "Family",
    location: "Bandung",
    year: "2024",
    excerpt: "Tiga generasi berkumpul dalam satu bingkai cerita.",
    story:
      "Sesi foto keluarga besar ini dirancang santai dan tidak kaku, membiarkan interaksi natural antar generasi menjadi fokus utama setiap frame.",
    tone: 3,
    imageCount: 7,
  },
  {
    slug: "janji-di-atas-awan",
    title: "Janji di Atas Awan",
    category: "Prewedding",
    location: "Bromo, Jawa Timur",
    year: "2024",
    excerpt: "Sunrise session di lautan pasir dengan latar Gunung Bromo.",
    story:
      "Berangkat sebelum subuh, tim mengejar cahaya pertama matahari terbit untuk menghasilkan siluet dan warna langit yang dramatis namun tetap hangat.",
    tone: 4,
    imageCount: 9,
  },
  {
    slug: "resepsi-tepi-pantai",
    title: "Resepsi Tepi Pantai",
    category: "Wedding",
    location: "Gili Trawangan",
    year: "2023",
    excerpt: "Resepsi intim beralaskan pasir putih dan suara ombak.",
    story:
      "Dengan tamu terbatas dan suasana intim, kami fokus pada momen-momen kecil: genggaman tangan, tawa lepas, dan air mata haru orang tua.",
    tone: 0,
    imageCount: 8,
  },
];

export const categories = [
  "All",
  "Wedding",
  "Prewedding",
  "Engagement",
  "Family",
] as const;

export type FilmProject = {
  slug: string;
  title: string;
  type: "Wedding Film" | "Highlight Reel" | "Cinematic Teaser";
  location: string;
  year: string;
  duration: string;
  excerpt: string;
  tone: number;
  stillCount: number;
};

export const films: FilmProject[] = [
  {
    slug: "andra-dan-nadia",
    title: "Andra & Nadia",
    type: "Wedding Film",
    location: "Jakarta",
    year: "2025",
    duration: "4:32",
    excerpt: "Kisah cinta lima tahun yang berujung pada janji seumur hidup.",
    tone: 1,
    stillCount: 6,
  },
  {
    slug: "highlight-uluwatu",
    title: "Highlight Uluwatu",
    type: "Highlight Reel",
    location: "Bali",
    year: "2025",
    duration: "1:45",
    excerpt: "Ringkasan sinematik dari sesi prewedding di tebing Uluwatu.",
    tone: 2,
    stillCount: 5,
  },
  {
    slug: "rangga-dan-sari",
    title: "Rangga & Sari",
    type: "Wedding Film",
    location: "Yogyakarta",
    year: "2024",
    duration: "5:10",
    excerpt: "Dokumentasi penuh prosesi adat Jawa dari pagi hingga malam.",
    tone: 3,
    stillCount: 7,
  },
  {
    slug: "teaser-kebun-teh",
    title: "Teaser Kebun Teh",
    type: "Cinematic Teaser",
    location: "Puncak, Bogor",
    year: "2024",
    duration: "0:58",
    excerpt: "Cuplikan singkat momen lamaran di tengah kabut pagi.",
    tone: 4,
    stillCount: 4,
  },
];

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  tone: number;
};

export const team: TeamMember[] = [
  {
    slug: "raka-pratama",
    name: "Raka Pratama",
    role: "Lead Photographer & Founder",
    bio: "Memulai Toiwo Studio pada 2014 dengan satu kamera dan keyakinan bahwa setiap pasangan punya cerita yang layak diabadikan dengan jujur.",
    tone: 0,
  },
  {
    slug: "dian-anjani",
    name: "Dian Anjani",
    role: "Lead Videographer",
    bio: "Menggabungkan latar belakang sinematografi dengan kepekaan human interest untuk menghasilkan film pernikahan yang terasa hidup.",
    tone: 1,
  },
  {
    slug: "bimo-satrio",
    name: "Bimo Satrio",
    role: "Photographer",
    bio: "Spesialis candid moment, selalu berada di tempat yang tepat untuk menangkap ekspresi yang tak terulang.",
    tone: 2,
  },
  {
    slug: "kirana-putri",
    name: "Kirana Putri",
    role: "Client Experience Lead",
    bio: "Memastikan setiap klien merasa nyaman dari konsultasi pertama hingga album foto sampai di tangan.",
    tone: 3,
  },
];

export const stats = [
  { label: "Tahun Pengalaman", value: "10+" },
  { label: "Pasangan Terdokumentasi", value: "480+" },
  { label: "Kota & Destinasi", value: "35+" },
  { label: "Penghargaan Industri", value: "6" },
];
