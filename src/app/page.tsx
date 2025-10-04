'use client';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to BookStore</h1>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => {
          window.location.href = '/dashboard';
        }}
      >
        Go to Dashboard
      </button>
    </main>
  );
}