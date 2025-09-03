// components/layout/footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background" id="contact">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ProgressLens. All rights reserved.
          </p>
          <nav aria-label="Footer">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link className="hover:underline" href="/privacy">
                  Privacy
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/terms">
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline"
                  href="mailto:contact@example.com"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
