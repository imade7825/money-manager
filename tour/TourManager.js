import { driver } from "driver.js";
import { getSteps } from "./steps";

const KEY = "hasSeenTour";

async function createDriver() {
  const { driver } = await import("driver.js");
  return driver(createOpts());
}

export async function startTour() {
  const driver = await createDriver();
  driver.drive();
}

export async function restartTour() {
  localStorage.removeItem(KEY);
  await startTour();
}

export async function maybeStartTour() {
  try {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(KEY);
    if (seen === "true") return;
    const driver = await createDriver();
    driver.drive();
    driver.on("destroyed", () => {
      localStorage.setItem(KEY, "true");
    });
  } catch {
    // fail silently
  }
}

function getEl(target) {
  return target?.element || target;
}

function getGlowTarget(target) {
  const el = getEl(target);
  return el?.querySelector?.('[data-tour-target="inner"]') || el;
}

function createOpts() {
  return {
    showProgress: true,
    allowClose: true,
    overlayOpacity: 0.55,
    stagePadding: 16,
    stageRadius: 14,
    overlayColor: "rgba(9, 29, 93, 0.55)",
    popoverClass: "mm-tour",
    steps: getSteps(),
    onHighlightStarted: (t) => getGlowTarget(t)?.classList?.add("mm-glow"),
    onHighlighted: (t) => getGlowTarget(t)?.classList?.add("mm-glow"),
    onDeselected: (t) => getGlowTarget(t)?.classList?.remove("mm-glow"),
  };
}
