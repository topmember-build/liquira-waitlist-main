export function Sparkline({
  data,
  color = "hsl(var(--primary))",
  height = 28,
}: {
  data: number[];
  color?: string;
  height?: number;
}) {
  const w = 120;
  const h = height;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${h - ((v - min) / range) * (h - 4) - 2}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-7 w-full" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.25"
        points={pts}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function MiniBars({
  data,
  color = "hsl(var(--primary))",
}: {
  data: number[];
  color?: string;
}) {
  const max = Math.max(...data);
  return (
    <div className="flex h-7 items-end gap-[2px]">
      {data.map((v, i) => (
        <div
          key={i}
          style={{
            height: `${(v / max) * 100}%`,
            background: color,
            opacity: 0.7 + (i / data.length) * 0.3,
          }}
          className="w-[3px] rounded-[1px]"
        />
      ))}
    </div>
  );
}
