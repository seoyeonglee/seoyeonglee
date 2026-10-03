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

      const arena = new Graphics()
        .roundRect(80, 55, 560, 250, 120)
        .fill("#14532d")
        .stroke({ width: 8, color: "#6b4f2a" });
      app.stage.addChild(arena);

      const positions = [
        [360, 35], [560, 90], [620, 210],
        [500, 325], [220, 325], [100, 210], [160, 90]
      ];

      const labelStyle = new TextStyle({
        fill: "#f8fafc",
        fontSize: 14,
        fontFamily: "Arial"
      });

      positions.forEach(([x, y], i) => {
        const participant = new Container();
        const node = new Graphics()
          .circle(0, 0, 28)
          .fill("#111827")
          .stroke({ width: 2, color: "#94a3b8" });
        const label = new Text({ text: `P${i + 1}`, style: labelStyle });
        label.anchor.set(0.5);
        participant.addChild(node, label);
        participant.position.set(x, y);
        app.stage.addChild(participant);
      });

      const pool = new Text({
        text: "POOL 1,250",
        style: new TextStyle({
          fill:"#fde68a",
          fontSize:18,
          fontFamily:"Arial",
          fontWeight:"bold"
        })
      });
      pool.anchor.set(0.5);
      pool.position.set(360, 178);
      app.stage.addChild(pool);
    })();

    return () => {
      cancelled = true;
      app.destroy(true);
    };
  }, []);

  return <div ref={hostRef} aria-label="PixiJS multiplayer table rendering prototype" />;
}
