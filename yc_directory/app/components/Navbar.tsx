import { auth, signOut, signIn } from "@/auth";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  const section = await auth();

  return (
    <header className="px-5 py-3 bg-white font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={133}
            height={40}
            className="cursor-pointer"
          />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {section && section?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit">Logout</button>
              </form>

              <Link href={`/users/${section?.id}`}>
                <span>{section?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
