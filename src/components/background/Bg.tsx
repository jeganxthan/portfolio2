import { useEffect, useRef } from "react";
import {
  CANVAS,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  FIXED_STEP,
  setCanvasSize,
} from "./config";
import { FishRenderer } from "./fish-renderer";
import { School } from "./school";
import { connectSettingsEffects } from "./settings/effects";
import { connectPersistence, loadInto } from "./settings/persistence";
import { useSettingsMeta } from "./settings/react";
import { settings } from "./settings/store";
import { getWeatherPreset } from "./weather";

// Restores (or migrates) localStorage settings into the store before the first
// render, and keeps saving from then on.
loadInto(settings);
connectPersistence(settings);

function pondRenderSize(display: HTMLElement): { width: number; height: number } {
  const { width, height } = display.getBoundingClientRect();
  const portrait =
    window.matchMedia("(max-width: 700px) and (orientation: portrait)").matches &&
    width > 0 &&
    height > 0;
  if (!portrait) return { width: CANVAS.width, height: CANVAS.height };

  const renderWidth = Math.min(
    CANVAS.width,
    Math.max(CANVAS.height, Math.round(width * 0.7)),
  );
  return {
    width: renderWidth,
    height: Math.max(CANVAS.height, Math.round((renderWidth * height) / width)),
  };
}

interface PondRuntime {
  school: School;
  renderer: FishRenderer;
}

/**
 * Koi pond rendered behind the hero content.
 *
 * The pond layer itself is `pointer-events: none` so it never swallows a click
 * meant for the hero copy. Instead a `pointerdown` is observed on the hero
 * section that hosts it and mapped back into simulation space, which is what
 * drives the click ripples.
 */
export default function PondBackground() {
  const displayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runtimeRef = useRef<PondRuntime | null>(null);

  const { weather: weatherPreset, rain: rainEnabled } = useSettingsMeta();

  useEffect(() => {
    runtimeRef.current?.renderer.setWeatherPreset(weatherPreset);
  }, [weatherPreset]);

  useEffect(() => {
    runtimeRef.current?.school.setRainIntensity(rainEnabled ? 1 : 0);
  }, [rainEnabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const display = displayRef.current;
    if (!canvas || !display) return;

    const initialSize = pondRenderSize(display);
    setCanvasSize(initialSize.width, initialSize.height);

    // Purely decorative: if WebGL is unavailable, render nothing and leave the
    // hero exactly as it looks today.
    let school: School;
    let renderer: FishRenderer;
    try {
      school = new School();
      renderer = new FishRenderer(canvas);
    } catch {
      return;
    }

    runtimeRef.current = { school, renderer };
    const activeWeather = getWeatherPreset(settings.meta().weather);
    renderer.setWeatherPreset(activeWeather.id);
    school.setRainIntensity(settings.meta().rain ? 1 : 0);
    const disconnectEffects = connectSettingsEffects(settings, { school, renderer });

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        const nextSize = pondRenderSize(display);
        if (nextSize.width === CANVAS_WIDTH && nextSize.height === CANVAS_HEIGHT) return;
        const oldWidth = CANVAS_WIDTH;
        const oldHeight = CANVAS_HEIGHT;
        setCanvasSize(nextSize.width, nextSize.height);
        school.resize(nextSize.width / oldWidth, nextSize.height / oldHeight);
        renderer.resize(nextSize.width, nextSize.height, oldWidth, oldHeight);
      });
      resizeObserver.observe(display);
    }

    // Click ripples. The `.pond` layer is `pointer-events: none`, so the event
    // target is whatever hero content sits under the cursor. Clicks that land
    // on a real control are left alone; everything else drops a ripple at the
    // matching spot in simulation space and calls the koi over to it.
    const rippleHost = display.closest<HTMLElement>(".hero");
    const onPointerDown = (event: PointerEvent): void => {
      if (event.button !== 0) return;
      if (event.target instanceof Element && event.target.closest("a, button")) return;

      const rect = display.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const point = {
        x: ((event.clientX - rect.left) / rect.width) * CANVAS_WIDTH,
        y: ((event.clientY - rect.top) / rect.height) * CANVAS_HEIGHT,
      };
      if (point.x < 0 || point.y < 0 || point.x > CANVAS_WIDTH || point.y > CANVAS_HEIGHT) {
        return;
      }

      school.callTo(point);
    };

    rippleHost?.addEventListener("pointerdown", onPointerDown);

    let animationFrame = 0;
    let accumulator = 0;
    let simulationTime = 0;
    let previousTime = performance.now();
    const animate = (now: number): void => {
      accumulator += Math.min((now - previousTime) / 1000, 0.1);
      previousTime = now;
      while (accumulator >= FIXED_STEP) {
        simulationTime += FIXED_STEP;
        school.update(FIXED_STEP, simulationTime);
        accumulator -= FIXED_STEP;
      }

      renderer.draw(school, simulationTime, false);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      rippleHost?.removeEventListener("pointerdown", onPointerDown);
      disconnectEffects();
      resizeObserver?.disconnect();
      renderer.dispose();
      runtimeRef.current = null;
    };
  }, []);

  return (
    <div className="pond" aria-hidden="true">
      <div className="pond-display" ref={displayRef}>
        <canvas ref={canvasRef} id="pond" />
      </div>
    </div>
  );
}
