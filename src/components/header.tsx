import Link from "next/link";

export default function Header() {
  return (
    <header className="h-[55px] flex items-center" >
      <nav className="flex flex-row w-full justify-between" >
        <div>
          <Link href={"/"}>
            <p className="text-2xl" >Amplify Todo Demo</p>
          </Link>
        </div>

        <div>
          <button> Sign In </button>
        </div>
      </nav>
    </header>
  );
}
