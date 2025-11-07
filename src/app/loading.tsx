import Image from "next/image";
import Loader from './assests/images/preloader.gif'
export default function Loading() {
  return <div className="flex justify-center items-center h-screen">
    <Image src={Loader}
    height={100}
    width={100}
    alt="preLoader"/>
  </div>;
}