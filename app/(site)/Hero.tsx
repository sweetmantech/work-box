import Link from "next/link";
import { Users } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="bg-[#212121] mt-6 min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl w-full mx-auto py-16 flex flex-col lg:flex-row justify-between items-center">
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
          <div className="flex justify-center lg:justify-start items-center gap-2 mb-5">
            <h2 className="text-2xl font-bold text-[#cfcfcf]">ONE BOX TEAM</h2>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-[#CFCFCF] leading-tight">
            Your Dream Team
            <br />
            <span className="bg-[#CFCFCF] text-[#2E1A05] px-2">in a Box</span>
          </h1>

          <p className="text-base text-[#CFCFCF] mb-8 max-w-2xl mx-auto lg:mx-0">
            Stop struggling with recruitment and team building. Black Box Team
            delivers a complete, ready-to-go team of elite professionals
            tailored to your startup&apos;s needs. From developers to designers,
            we&apos;re your instant dream team.
          </p>

          <Link
            href="#get-started"
            className="inline-flex mt-5 items-center justify-center gap-2 bg-[#a194a7] hover:bg-cyan-500 text-black px-8 sm:px-20 py-3 rounded-xl font-medium text-lg mb-6 duration-300 transition-colors"
          >
            <Users className="w-5 h-5" />
            Get Your Team
          </Link>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <div className="flex -space-x-1">
              {["agent.svg", "agent.svg", "agent.svg", "agent.svg"].map(
                (avatar, index) => (
                  <Image
                    key={index}
                    src={avatar}
                    alt={`Team Member ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-zinc-900"
                  />
                )
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-zinc-100 mt-1 text-sm sm:text-base">
                  <span className="font-medium">100+</span>
                  <span className="text-zinc-400 ml-2">teams assembled</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
          <Image
            src="/box.png"
            alt="Team Illustration"
            width={500}
            height={500}
            className="w-full max-w-md lg:max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
