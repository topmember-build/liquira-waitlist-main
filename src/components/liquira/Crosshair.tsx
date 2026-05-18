export function Crosshairs() {
  const base = "absolute h-[7px] w-[7px] text-primary pointer-events-none";
  const Mark = ({ className }: { className: string }) => (
    <svg viewBox="0 0 10 10" className={`${base} ${className}`} aria-hidden>
      <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
  return (
    <>
      <Mark className="-top-[3.5px] -left-[3.5px]" />
      <Mark className="-top-[3.5px] -right-[3.5px]" />
      <Mark className="-bottom-[3.5px] -left-[3.5px]" />
      <Mark className="-bottom-[3.5px] -right-[3.5px]" />
    </>
  );
}
