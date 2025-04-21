import Link from "next/link";

export default function Header() {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center">
              <div className="shrink-0 text-white text-xl">Recipe Box</div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
