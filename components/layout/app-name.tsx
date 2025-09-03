import Image from "next/image";
import Link from "next/link";

export function AppName() {
  return (
    <Link href="/">
      <Image
        src={"./ProgressLens.svg"}
        alt="ProgressLens Logo"
        width={180}
        height={180}
        className="dark:invert dark:brightness-0 dark:contrast-200"
      />
    </Link>
  );
}
