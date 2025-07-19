export function aggregateCandles(history, interval) {
  if (!history.length) return [];

  const grouped = {};

  history.forEach((point) => {
    const bucket = Math.floor(point.timestamp / interval) * interval;
    if (!grouped[bucket]) {
      grouped[bucket] = {
        time: bucket,
        open: point.baseFee,
        high: point.baseFee,
        low: point.baseFee,
        close: point.baseFee,
      };
    } else {
      grouped[bucket].high = Math.max(grouped[bucket].high, point.baseFee);
      grouped[bucket].low = Math.min(grouped[bucket].low, point.baseFee);
      grouped[bucket].close = point.baseFee;
    }
  });

  return Object.values(grouped).sort((a, b) => a.time - b.time);
}
