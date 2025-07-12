
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-purple-700 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">The Finder</h1>
      <div className="space-x-4">
        <Link href="/login">Login</Link>
        <Link href="/signup">Sign Up</Link>
        <Link href="/saved">Saved</Link>
      </div>
    </nav>
  );
}
