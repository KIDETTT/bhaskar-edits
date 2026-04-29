const items = [
  "CINEMATIC EDITS",
  "REELS",
  "ADS",
  "WEDDING FILMS",
  "SAAS PROMOS",
  "DOCUMENTARY",
  "SHOWREEL 2026",
  "AVAILABLE FOR HIRE",
];

const Marquee = () => {
  const row = [...items, ...items];
  return (
    <div className="fixed top-[58px] md:top-[70px] left-0 right-0 z-40 overflow-hidden border-y border-foreground/[0.08] bg-background/80 backdrop-blur-sm py-2">
      <div
        className="flex gap-8 w-max"
        style={{ animation: "marqueeScroll 28s linear infinite" }}
      >
        {row.map((t, i) => (
          <span
            key={i}
            className="font-display text-[0.75rem] tracking-[0.25em] opacity-30 whitespace-nowrap flex items-center gap-8"
          >
            {t}
            <span className="text-primary">●</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
