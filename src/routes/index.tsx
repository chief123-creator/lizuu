import { useEffect, useState, type CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

type Phase = "greeting" | "message" | "letter";

const FINAL_MESSAGE = "LIZAAA I LOVE YOU SO MUCH";

const letterLines = [
  "L",
  "LI",
  "LIZ",
  "LIZA",
  "LIZAA",
  "LIZAAA",
  "LIZAAA",
  "LIZAAA I",
  "LIZAAA I",
  "LIZAAA I L",
  "LIZAAA I LO",
  "LIZAAA I LOV",
  "LIZAAA I LOVE",
  "LIZAAA I LOVE",
  "LIZAAA I LOVE Y",
  "LIZAAA I LOVE YO",
  "LIZAAA I LOVE YOU",
  "LIZAAA I LOVE YOU",
  "LIZAAA I LOVE YOU S",
  "LIZAAA I LOVE YOU SO",
  "LIZAAA I LOVE YOU SO",
  "LIZAAA I LOVE YOU SO M",
  "LIZAAA I LOVE YOU SO MU",
  "LIZAAA I LOVE YOU SO MUC",
  "LIZAAA I LOVE YOU SO MUCH",
];

const catImages = [
  { alt: "A sweetheart cat holding its paws together", url: `${import.meta.env.BASE_URL}cats/cat-heart.png` },
  { alt: "A shy white cat with a pink bow", url: `${import.meta.env.BASE_URL}cats/cat-bow.png` },
  { alt: "A curious cat peeking around a page", url: `${import.meta.env.BASE_URL}cats/cat-hide-and-seek.png` },
  { alt: "A bashful little white cat", url: `${import.meta.env.BASE_URL}cats/cat-sweet.png` },
  { alt: "A happy white kitten", url: `${import.meta.env.BASE_URL}cats/cat-shy.png` },
  { alt: "A little cat with a flower", url: `${import.meta.env.BASE_URL}cats/cat-flower.png` },
  { alt: "A cat blowing a kiss", url: `${import.meta.env.BASE_URL}cats/cat-kisses.png` },
  { alt: "A sparkly-eyed white kitten", url: `${import.meta.env.BASE_URL}cats/cat-sparkle.png` },
];

const catSpots = [
  { left: "2%", top: "3%" },
  { right: "2%", top: "4%" },
  { left: "1%", top: "42%" },
  { right: "1%", top: "44%" },
  { left: "3%", bottom: "8%" },
  { right: "3%", bottom: "9%" },
  { left: "28%", top: "2%" },
  { right: "28%", bottom: "4%" },
];

const floatingDots = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  left: `${((index * 13.7 + 4) % 100).toFixed(2)}%`,
  top: `${((index * 21.3 + 9) % 100).toFixed(2)}%`,
  size: `${2.4 + (index % 7) * 0.7}px`,
  delay: `${((index * 0.41) % 10).toFixed(2)}s`,
  duration: `${9 + (index % 9)}s`,
  driftX: `${(index % 2 === 0 ? 1 : -1) * (8 + (index % 16))}px`,
  driftY: `${-18 - (index % 22)}px`,
  glow: index % 3 === 0,
}));

function shuffledIndices(): number[] {
  const indices = catImages.map((_, index) => index);
  for (let index = indices.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = indices[index];
    const swap = indices[swapIndex];
    if (current !== undefined && swap !== undefined) {
      indices[index] = swap;
      indices[swapIndex] = current;
    }
  }
  return indices;
}

function TypeChars({
  text,
  stagger = false,
  staggerMs = 26,
}: {
  text: string;
  stagger?: boolean;
  staggerMs?: number;
}) {
  return (
    <>
      {Array.from(text).map((char, index) => (
        <span
          key={`${index}-${char}`}
          className={char === " " ? "typed-space" : "typed-char"}
          style={
            stagger
              ? ({ "--char-delay": `${index * staggerMs}ms` } as CSSProperties)
              : undefined
          }
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </>
  );
}

function TypewriterText({
  text,
  className,
  as: Tag = "p",
  reducedMotion,
  speed = 62,
}: {
  text: string;
  className?: string;
  as?: "h1" | "p";
  reducedMotion: boolean;
  speed?: number;
}) {
  const [typed, setTyped] = useState(reducedMotion ? text : "");

  useEffect(() => {
    if (reducedMotion) {
      setTyped(text);
      return;
    }

    setTyped("");
    let count = 0;
    const timer = window.setInterval(() => {
      count += 1;
      setTyped(text.slice(0, count));
      if (count >= text.length) window.clearInterval(timer);
    }, speed);

    return () => window.clearInterval(timer);
  }, [reducedMotion, speed, text]);

  return (
    <Tag className={className} aria-label={text}>
      <TypeChars text={typed} />
      {typed.length < text.length && <span className="typing-caret" aria-hidden="true" />}
    </Tag>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Little Letter for LIZAAA" },
      {
        name: "description",
        content: "A tiny, heartfelt letter for LIZAAA, written one sweet line at a time.",
      },
      { property: "og:title", content: "A Little Letter for LIZAAA" },
      {
        property: "og:description",
        content: "A tiny, heartfelt letter for LIZAAA, written one sweet line at a time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Lora:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: LoveLetter,
});

function LoveLetter() {
  const [phase, setPhase] = useState<Phase>("greeting");
  const [floatingCats, setFloatingCats] = useState<number[]>(() =>
    catImages.map((_, index) => index),
  );
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const [typedMessage, setTypedMessage] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setFloatingCats(shuffledIndices());
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(motionQuery.matches);
    syncMotion();
    motionQuery.addEventListener("change", syncMotion);
    return () => motionQuery.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    if (phase === "letter") return;
    const timer = window.setTimeout(
      () => {
        setPhase(phase === "greeting" ? "message" : "letter");
      },
      reducedMotion ? 900 : 2400,
    );
    return () => window.clearTimeout(timer);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (phase !== "letter") return;

    let revealedCount = 0;
    let typedCount = 0;
    let typingTimer: number | undefined;
    const lineTimer = window.setInterval(
      () => {
        revealedCount += 1;
        setVisibleLineCount(revealedCount);
        if (revealedCount >= letterLines.length) {
          window.clearInterval(lineTimer);
          typingTimer = window.setInterval(
            () => {
              typedCount += 1;
              setTypedMessage(FINAL_MESSAGE.slice(0, typedCount));
              if (typedCount >= FINAL_MESSAGE.length && typingTimer !== undefined) {
                window.clearInterval(typingTimer);
              }
            },
            reducedMotion ? 18 : 68,
          );
        }
      },
      reducedMotion ? 28 : 150,
    );

    return () => {
      window.clearInterval(lineTimer);
      if (typingTimer !== undefined) window.clearInterval(typingTimer);
    };
  }, [phase, reducedMotion]);

  function replayLetter() {
    setVisibleLineCount(0);
    setTypedMessage("");
    setPhase("greeting");
  }

  return (
    <main className="diary-scene">
      <div className="starfield" aria-hidden="true" />
      <div className="glow-orbs" aria-hidden="true" />
      <div className="floating-dots" aria-hidden="true">
        {floatingDots.map((dot) => {
          const style = {
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            "--dot-delay": dot.delay,
            "--dot-duration": dot.duration,
            "--dot-x": dot.driftX,
            "--dot-y": dot.driftY,
          } as CSSProperties;
          return (
            <span
              key={dot.id}
              className={dot.glow ? "float-dot float-dot-glow" : "float-dot"}
              style={style}
            />
          );
        })}
      </div>
      <div className="cat-float-layer" aria-hidden="true">
        {floatingCats.map((catIndex, position) => {
          const cat = catImages[catIndex];
          const spot = catSpots[position];
          if (!cat || !spot) return null;
          const delay = `${((position * 0.73) % 4).toFixed(2)}s`;
          const duration = `${(7.5 + ((position * 1.3) % 3.4)).toFixed(2)}s`;
          const style = {
            ...spot,
            "--float-delay": delay,
            "--float-duration": duration,
          } as CSSProperties & {
            "--float-delay": string;
            "--float-duration": string;
          };
          return (
            <img
              key={cat.url}
              className="floating-cat"
              src={cat.url}
              alt=""
              width={96}
              height={96}
              style={style}
            />
          );
        })}
      </div>

      <div className="scene-center">
        {phase !== "letter" ? (
          <section className="intro-copy" key={phase} aria-live="polite">
            <span className="intro-ornament" aria-hidden="true">
              ✦
            </span>
            {phase === "greeting" ? (
              <TypewriterText
                as="h1"
                className="intro-title"
                text="Hey Mommy 💕"
                reducedMotion={reducedMotion}
                speed={70}
              />
            ) : (
              <>
                <h1 className="intro-title visually-hidden">A little letter for LIZAAA</h1>
                <TypewriterText
                  className="intro-message"
                  text="I have created something for you 💕"
                  reducedMotion={reducedMotion}
                  speed={48}
                />
              </>
            )}
          </section>
        ) : (
          <section className="letter-stage" aria-label="A letter for LIZAAA">
            <article className="diary-book">
              <p className="diary-kicker">a little note</p>
              <h1 className="diary-title">Made just for you</h1>
              <ol className="letter-lines" aria-label="The message as it is written">
                {letterLines.slice(0, visibleLineCount).map((line, index) => (
                  <li key={`${index}-${line}`} className="letter-line">
                    <TypeChars text={line} stagger staggerMs={reducedMotion ? 0 : 22} />
                  </li>
                ))}
              </ol>
              {typedMessage.length > 0 && (
                <p className="letter-finale" aria-live="polite">
                  <TypeChars text={typedMessage} />
                  {typedMessage.length < FINAL_MESSAGE.length && (
                    <span className="typing-caret" aria-hidden="true" />
                  )}
                </p>
              )}
              {typedMessage === FINAL_MESSAGE && (
                <span className="diary-heart" aria-label="Love">
                  ♥
                </span>
              )}
            </article>
            {typedMessage === FINAL_MESSAGE && (
              <div className="diary-controls">
                {/* <Button
                  variant="outline"
                  size="sm"
                  className="diary-replay"
                  onClick={replayLetter}
                >
                  <RotateCcw aria-hidden="true" />
                  Start again
                </Button> */}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
