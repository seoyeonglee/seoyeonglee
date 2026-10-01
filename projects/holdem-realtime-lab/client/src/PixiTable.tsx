import { useEffect, useRef } from "react";
import { Application, Container, Graphics, Text, TextStyle } from "pixi.js";

export function PixiTable() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    const app = new Application();

    (async () => {
      await app.init({
        width: 720,
        height: 360,
        antialias: true,
        background: "#0b1f19",
        resolution: window.devicePixelRatio || 1,
        autoDensity: true
      });
      if (cancelled || !hostRef.current) {
        app.destroy(true);
        return;
      }

      hostRef.current.appendChild(app.canvas);

      const table = new Graphics()
        .roundRect(80, 55, 560, 250, 120)
        .fill("#14532d")
        .stroke({ width: 8, color: "#6b4f2a" });
      app.stage.addChild(table);

      const seats = [
        [360, 35], [560, 90], [620, 210],
        [500, 325], [220, 325], [100, 210], [160, 90]
      ];

      const labelStyle = new TextStyle({
        fill: "#f8fafc",
        fontSize: 14,
        fontFamily: "Arial"
      });

      seats.forEach(([x, y], i) => {
        const seat = new Container();
        const chip = new Graphics().circle(0, 0, 28).fill("#111827").stroke({ width: 2, color: "#94a3b8" });
        const label = new Text({ text: `P${i + 1}`, style: labelStyle });
        label.anchor.set(0.5);
        seat.addChild(chip, label);
        seat.position.set(x, y);
        app.stage.addChild(seat);
      });

      const pot = new Text({ text: "POT 1,250", style: new TextStyle({ fill:"#fde68a", fontSize:18, fontFamily:"Arial", fontWeight:"bold" }) });
      pot.anchor.set(0.5);
      pot.position.set(360, 178);
      app.stage.addChild(pot);

      ["A♠", "K♥", "7♦", "7♣", "2♠"].forEach((card, i) => {
        const x = 250 + i * 55;
        const g = new Graphics().roundRect(x, 120, 44, 64, 6).fill("#f8fafc").stroke({ width: 1, color:"#cbd5e1" });
        const t = new Text({ text: card, style: new TextStyle({ fill: card.includes("♥") || card.includes("♦") ? "#b91c1c" : "#111827", fontSize:16, fontFamily:"Arial", fontWeight:"bold" }) });
        t.position.set(x + 8, 128);
        app.stage.addChild(g, t);
      });
    })();

    return () => {
      cancelled = true;
      app.destroy(true);
    };
  }, []);

  return <div ref={hostRef} aria-label="PixiJS Hold'em table rendering prototype" />;
}
