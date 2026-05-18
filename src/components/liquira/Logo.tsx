import logoMark from "@/assets/logo-mark.png";

export function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <img
      src={logoMark}
      alt="Liquira"
      className={`${className} object-contain drop-shadow-[0_0_12px_hsl(152_100%_72%/0.35)]`}
    />
  );
}
