export function formatRelativeTime(dateString: string | Date): string {
  const now = new Date();
  const past = new Date(dateString);
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = past.getTime() - now.getTime();

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });

  if (Math.abs(elapsed) < msPerMinute) {
    const seconds = Math.round(elapsed / 1000);
    return seconds === 0 ? "just now" : rtf.format(seconds, "second");
  } else if (Math.abs(elapsed) < msPerHour) {
    return rtf.format(Math.round(elapsed / msPerMinute), "minute");
  } else if (Math.abs(elapsed) < msPerDay) {
    return rtf.format(Math.round(elapsed / msPerHour), "hour");
  } else if (Math.abs(elapsed) < msPerMonth) {
    return rtf.format(Math.round(elapsed / msPerDay), "day");
  } else if (Math.abs(elapsed) < msPerYear) {
    return rtf.format(Math.round(elapsed / msPerMonth), "month");
  } else {
    return rtf.format(Math.round(elapsed / msPerYear), "year");
  }
}
