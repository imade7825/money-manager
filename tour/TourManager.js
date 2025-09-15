import { driver } from "driver.js";
import { getSteps } from "./steps";

const KEY = "hasSeenTour";

export async function startTour() {
  const tourDriver = driver(opts);
  tourDriver.drive();
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
    const tourDriver = await driver(opts);
    tourDriver.drive();
    tourDriver.on("destroyed", () => {
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

const opts = {
  showProgress: true,
  allowClose: true,
  overlayOpacity: 0.55,
  stagePadding: 16,
  stageRadius: 14,
  overlayColor: "rgba(9, 29, 93, 0.55)",
  popoverClass: "mm-tour",
  steps: getSteps(),
  onHighlightStarted: (target) =>
    getGlowTarget(target)?.classList?.add("mm-glow"),
  onHighlighted: (target) => getGlowTarget(target)?.classList?.add("mm-glow"),
  onDeselected: (target) => getGlowTarget(target)?.classList?.remove("mm-glow"),
};
