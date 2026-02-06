export interface CategoryData {
  readonly title: string;
  readonly text: string;
  readonly href: string;
  readonly img: string;
}

export interface ServiceData {
  readonly title: string;
  readonly lead: string;
  readonly bullets: readonly string[];
  readonly img: string;
}

export const categoriesData: readonly CategoryData[] = [
  {
    title: `Permanent Make-up`,
    text: `Powder Brows, Velvet Lips, Wimpernkranzverdichtung, Hairstroke`,
    href: `/services/permanent-make-up`,
    img: `/images/design/pm_horizontal.avif`,
  },
  {
    title: `Nails`,
    text: `Manicure & Pedicure`,
    href: `/services/nails`,
    img: `/images/design/manik_1_horizontal.avif`,
  },
  {
    title: `Lashes & Brows`,
    text: `Brow Lifting, Lash Lifting, Brow & Lash Lifting + Färben`,
    href: `/services/lashes-und-brows`,
    img: `/images/design/lashes_horizontal.avif`,
  },
];

export const servicesData: readonly ServiceData[] = [
  {
    title: `Brow Lifting`,
    lead: `Gepflegte, volle Brauen - ganz ohne tägliches Styling`,
    bullets: [
      `Fixiert und formt die Brauenhaare`,
      `Verleiht optisch mehr Volumen und Definition`,
      `Ideal bei widerspenstigen oder lückenhaften Brauen`,
      `Effekt hält 4-6 Wochen`,
      `Sanft & schmerzfrei`,
    ],
    img: `/images/design/brows-lifting.avif`,
  },
  {
    title: `Lash Lifting`,
    lead: `Wacher Blick mit den eigenen Naturwimpern`,
    bullets: [
      `Hebt die Wimpern sanft an und öffnet den Blick`,
      `Kein Mascara nötig - der Effekt hält bis zu 6 Wochen`,
      `Ideal für gerade, helle oder feine Wimpern`,
      `Pflegend & schonend für die Haarstruktur`,
    ],
    img: `/images/design/lashes-lifting.avif`,
  },
  {
    title: `Brow & Lash Lifting + Färben`,
    lead: `Maximale Ausdruckskraft - minimaler Aufwand`,
    bullets: [
      `Kombi aus Laminierung und professionellem Färben`,
      `Individuelle Farbwahl abgestimmt auf Typ und Haarfarbe`,
      `Perfekt für helle oder feine Brauen & Wimpern`,
      `Sichtbarer Effekt für 4-6 Wochen`,
      `Natürlich. Gepflegt. Alltagsbereit.`,
    ],
    img: `/images/design/brows-and-lashes-lifting-farben.avif`,
  },
];
