import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 flex h-(--header-height) w-full items-center bg-white px-4 shadow-[0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1)]">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/mascot.png"
          alt="Friendly Salad Mascot"
          width={40}
          height={40}
        />
        <span className="font-serif text-lg font-semibold">샐러드만세</span>
      </Link>
    </header>
  );
}
