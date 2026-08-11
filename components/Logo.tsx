import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: number;
  showText?: boolean;
  textClassName?: string;
  className?: string;
}

export default function Logo({
  size = 36,
  showText = true,
  textClassName = "",
  className = "",
}: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div
        className="relative flex-shrink-0 items-center justify-center overflow-hidden"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.png"
          alt="Omnikon Academy Logo"
          width={size}
          height={size}
          className="object-contain"
        />
      </div>
      {showText && (
        <span
          className={`font-bold tracking-tight text-white group-hover:text-red-400 transition-colors ${textClassName}`}
        >
          Omnikon
          <span className="text-red-500 font-mono ml-1">Academy</span>
        </span>
      )}
    </Link>
  );
}
