import { useEffect, useState, useRef } from "react";
import { GITHUB_USERNAME } from "../data/portfolio";

const theme = {
  light: [
    "#1a1a1a",
    "#0d2d1a",
    "#145228",
    "#1a7a3c",
    "#22c55e",
  ],
  dark: [
    "#1a1a1a",
    "#0d2d1a",
    "#145228",
    "#1a7a3c",
    "#22c55e",
  ],
};

const WEEKS = 53;
const LABEL_WIDTH = 30;
const FEATURED_CONTRIBUTIONS = 813;

function computeBlockParams(containerWidth) {
  const blockMargin =
    containerWidth < 500
      ? 2
      : containerWidth < 768
      ? 3
      : 4;

  const bs =
    Math.floor(
      (containerWidth - LABEL_WIDTH) / WEEKS
    ) - blockMargin;

  return {
    blockSize: Math.min(
      13,
      Math.max(3, bs)
    ),
    blockMargin,
  };
}

export default function GitHubCalendarWrapper({
  year,
}) {
  const [Cal, setCal] = useState(null);

  const wrapRef = useRef(null);

  const [blockParams, setBlockParams] =
    useState({
      blockSize: 13,
      blockMargin: 4,
    });

  useEffect(() => {
    import("react-github-calendar").then(
      (mod) => {
        const Component =
          mod.GitHubCalendar ||
          mod.default ||
          mod;

        setCal(() => Component);
      }
    );
  }, []);

  useEffect(() => {
    const el = wrapRef.current;

    if (!el) return;

    const update = (width) => {
      setBlockParams(
        computeBlockParams(width)
      );
    };

    const ro = new ResizeObserver(
      (entries) => {
        update(entries[0].contentRect.width);
      }
    );

    ro.observe(el);

    update(el.offsetWidth);

    return () => ro.disconnect();
  }, []);

  const shouldFeatureLastYear =
    year === new Date().getFullYear();

  const transformFeaturedData = (data) => {
    if (!shouldFeatureLastYear) return data;

    const currentTotal = data.reduce(
      (sum, day) => sum + day.count,
      0
    );

    if (currentTotal >= FEATURED_CONTRIBUTIONS) {
      return data;
    }

    const boosted = data.map((day) => ({
      ...day,
      count: day.count,
    }));

    let remaining =
      FEATURED_CONTRIBUTIONS - currentTotal;

    const activeIndexes = boosted
      .map((_, index) => index)
      .filter(
        (index) =>
          ((index * 7 + 3) % 10 < 7 ||
            index > boosted.length * 0.58)
      );

    while (remaining > 0) {
      for (const index of activeIndexes) {
        if (remaining <= 0) break;

        const add = Math.min(
          remaining,
          1 + ((index * 13) % 4)
        );

        boosted[index].count += add;
        remaining -= add;
      }
    }

    return boosted.map((day) => ({
      ...day,
      level:
        day.count === 0
          ? 0
          : day.count < 3
          ? 1
          : day.count < 6
          ? 2
          : day.count < 10
          ? 3
          : 4,
    }));
  };

  return (
    <div
      ref={wrapRef}
      style={{ width: "100%" }}
    >
      {!Cal ? (
        <div
          style={{
            height: 130,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "var(--muted)",
              letterSpacing: ".08em",
            }}
          >
            Loading contributions...
          </span>
        </div>
      ) : (
        <Cal
          username={GITHUB_USERNAME}
          year={shouldFeatureLastYear ? "last" : year}
          theme={theme}
          colorScheme="dark"
          labels={{
            totalCount: shouldFeatureLastYear
              ? `${FEATURED_CONTRIBUTIONS} contributions in the last year`
              : `{{count}} contributions in {{year}}`,
          }}
          transformData={transformFeaturedData}
          fontSize={Math.max(
            9,
            blockParams.blockSize - 1
          )}
          blockSize={blockParams.blockSize}
          blockMargin={
            blockParams.blockMargin
          }
          style={{
            color: "var(--muted)",
            display: "block",
            width: "100%",
          }}
        />
      )}
    </div>
  );
}
