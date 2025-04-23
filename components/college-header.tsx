import Image from "next/image";

export default function CollegeHeader() {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="mr-4">
            <Image
              src="/viitlogo.png"
              alt="VIIT Logo"
              width={80}
              height={80}
              className="rounded-md"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-sky-600">Vignan's Institute of Information Technology</h1>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded">NAAC A+ Accredited</span>
              <span className="bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded">NBA Accredited</span>
              <span className="bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded">AICTE Approved</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
