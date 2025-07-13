
// components/NavBar.js
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      backgroundColor: '#eee',
    }}>
      <Link href="/" style={{ marginRight: '1rem' }}>Home</Link>
      <div>
        <Link href="/login" style={{ marginRight: '1rem' }}>Login</Link>
        <Link href="/signup" style={{ marginRight: '1rem' }}>Signup</Link>
        <Link href="/saved">Saved</Link>
      </div>
    </nav>
  );
}
