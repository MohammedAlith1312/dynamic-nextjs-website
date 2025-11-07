'use client'
import Link from "next/link";
import Login from "./Login";
import { usePathname } from "next/navigation";
import { FaLinkedinIn } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import Twitter from "@/app/assests/images/twittericon.png";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();

  // ✅ Check if current page is "first-aid-training"
  const hideLogin = pathname?.includes("first-aid-training");

  return (
    <div className="header bg-[#54585b] md:px-18 py-5 flex-shrink-1 w-screen">
      <div className="container mx-auto flex justify-between">
        {/* Social Links */}
        <div className="flex gap-5 text-white pt-1 items-center">
          <Link href="https://x.com/MawaridManpower" target="_blank">
            <Image
              src={Twitter}
              alt="twitter"
              width={16}
              height={16}
              className="twittericon"
            />
          </Link>

          <Link
            href="https://www.linkedin.com/company/mawarid-manpower-solutions-company-riyadh-saudi-arabia/"
            target="_blank"
          >
            <FaLinkedinIn size={16} />
          </Link>

          <Link href="#" target="_blank">
            <AiFillYoutube size={18} />
          </Link>
        </div>

        {/* ✅ Conditionally render Login */}
        {!hideLogin && (
          <div>
            <Login />
          </div>
        )}
      </div>
    </div>
  );
}
