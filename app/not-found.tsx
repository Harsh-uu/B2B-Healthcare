import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Error 404</p>
        <h1 className="text-4xl font-bold text-text mb-2">Page not found</h1>
        <p className="text-sm text-text-secondary mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
