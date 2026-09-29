"use client";

import { useEffect, useRef, useState } from "react";

interface PreviewState {
  visible: boolean;
  x: number;
  y: number;
  href: string;
  domain: string;
  imgSrc: string;
}

const INITIAL: PreviewState = {
  visible: false,
  x: 0,
  y: 0,
  href: "",
  domain: "",
  imgSrc: "",
};

const CARD_W = 280;
const CARD_MARGIN = 12;

function clampX(x: number) {
  const half = CARD_W / 2 + CARD_MARGIN;

  return Math.min(
    Math.max(x, half),
    window.innerWidth - half
  );
}

function getDomain(href: string) {
  try {
    return new URL(href).hostname.replace("www.", "");
  } catch {
    return href;
  }
}

function getMicrolinkSrc(url: string) {
  const params = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    colorScheme: "dark",
    "viewport.isMobile": "true",
    "viewport.deviceScaleFactor": "1",
    "viewport.width": "600",
    "viewport.height": "375",
  });

  return `https://api.microlink.io/?${params}`;
}

export default function LinkPreview() {
  const [state, setState] = useState(INITIAL);
  const [imgLoaded, setImgLoaded] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isExternal = (href: string) => {
      try {
        return (
          new URL(href).origin !==
          window.location.origin
        );
      } catch {
        return false;
      }
    };

    const onEnter = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;

      const href = anchor.href;

      if (!href || !isExternal(href)) return;

      const rect =
        anchor.getBoundingClientRect();

      setImgLoaded(false);

      setState({
        visible: true,
        x: clampX(rect.left + rect.width / 2),
        y: rect.top - 12,
        href,
        domain: getDomain(href),
        imgSrc: getMicrolinkSrc(href),
      });
    };

    const onMove = (e: MouseEvent) => {
      const anchor = e.currentTarget as HTMLAnchorElement;

      if (
        !anchor.href ||
        !isExternal(anchor.href)
      )
        return;

      setState((prev) => ({
        ...prev,
        x: clampX(e.clientX),
        y: e.clientY - 150,
      }));
    };

    const onLeave = () => {
      setState(INITIAL);
    };

    const attached = new WeakSet();

    const attach = () => {
      document
        .querySelectorAll<HTMLAnchorElement>("a[href]")
        .forEach((anchor) => {
          if (attached.has(anchor)) return;

          const href = anchor.href;

          if (!isExternal(href)) return;

          anchor.addEventListener(
            "mouseenter",
            onEnter
          );

          anchor.addEventListener(
            "mousemove",
            onMove
          );

          anchor.addEventListener(
            "mouseleave",
            onLeave
          );

          attached.add(anchor);
        });
    };

    attach();

    const observer =
      typeof MutationObserver === "undefined"
        ? null
        : new MutationObserver(attach);

    observer?.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer?.disconnect();

      document
        .querySelectorAll<HTMLAnchorElement>("a[href]")
        .forEach((a) => {
          a.removeEventListener(
            "mouseenter",
            onEnter
          );

          a.removeEventListener(
            "mousemove",
            onMove
          );

          a.removeEventListener(
            "mouseleave",
            onLeave
          );
        });
    };
  }, []);

  return (
    <div
      ref={cardRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        left: state.x,
        top: state.y,
        transform: `translate(-50%, -100%) scale(${
          state.visible ? 1 : 0.9
        })`,
        opacity: state.visible ? 1 : 0,
        pointerEvents: "none",
        zIndex: 9400,
        width: 280,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow:
          "0 24px 60px rgba(0,0,0,.7)",
        transition:
          "opacity .2s ease, transform .15s ease",
        transformOrigin: "50% 100%",
      }}
    >
      {/* Browser Bar */}
      <div
        style={{
          background: "var(--surface-2)",
          borderBottom:
            "1px solid var(--border)",
          padding: "9px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 5,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#ff5f57",
            }}
          />

          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#febc2e",
            }}
          />

          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#28c840",
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
            background:
              "rgba(255,255,255,.06)",
            borderRadius: 4,
            padding: "3px 8px",
            fontSize: 10,
            color:
              "rgba(255,255,255,.35)",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            fontFamily: "monospace",
          }}
        >
          {state.domain}
        </div>
      </div>

      {/* Preview Image */}
      <div
        style={{
          width: "100%",
          height: 160,
          background: "var(--surface-2)",
          position: "relative",
        }}
      >
        {state.imgSrc && (
          <>
            {!imgLoaded && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Loading...
              </div>
            )}

            <img
              src={state.imgSrc}
              alt={state.domain}
              onLoad={() =>
                setImgLoaded(true)
              }
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: imgLoaded ? 1 : 0,
                transition:
                  "opacity .2s ease",
              }}
            />
          </>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "10px 12px",
          color: "var(--accent)",
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        ↗ {state.domain}
      </div>
    </div>
  );
}