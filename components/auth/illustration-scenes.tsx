import Image from "next/image";

function IllustrationLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-[family-name:var(--font-mogra)] text-2xl text-white ${className}`}
    >
      CEven
    </span>
  );
}

export function SignupIllustration() {
  return (
    <div className="relative flex h-full min-h-screen flex-col bg-illustration-panel">
      <div className="p-10">
        <IllustrationLogo />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-16 pb-16">
        <div className="relative h-[328px] w-[424px]">
          <Image
            src="/illustrations/signup-family-back.png"
            alt=""
            width={277}
            height={328}
            className="absolute left-0 top-0"
          />
          <Image
            src="/illustrations/signup-family-front.png"
            alt=""
            width={250}
            height={250}
            className="absolute left-[174px] top-[78px]"
          />
        </div>
        <div className="flex flex-col items-center gap-2 text-center text-white">
          <h2 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold">
            Ready to Make Caring Easy?
          </h2>
          <p className="font-[family-name:var(--font-urbanist)] text-base">
            Create your admin account and start managing parent requests in minutes.
          </p>
        </div>
      </div>
    </div>
  );
}

export function LoginIllustration() {
  return (
    <div className="relative flex h-full min-h-screen flex-col overflow-hidden bg-illustration-panel">
      <div className="absolute left-0 top-0 z-10 p-10">
        <IllustrationLogo />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/illustrations/login-ellipse.png"
          alt=""
          width={439}
          height={439}
        />
      </div>
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-10 px-16">
        <Image
          src="/illustrations/login-illustration.png"
          alt=""
          width={300}
          height={304}
        />
        <div className="flex flex-col items-center gap-2 text-center text-white">
          <h2 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold">
            Welcome back, Care Champion!
          </h2>
          <p className="font-[family-name:var(--font-urbanist)] text-base">
            Sign in to manage parent requests and keep your creche running smoothly.
          </p>
        </div>
      </div>
    </div>
  );
}

export function SimpleIllustration() {
  return (
    <div className="relative flex h-full min-h-screen flex-col bg-illustration-panel">
      <div className="p-10">
        <IllustrationLogo />
      </div>
      <div className="flex flex-1 items-center justify-center pb-24">
        <Image
          src="/illustrations/reset-password-illustration.png"
          alt=""
          width={250}
          height={327}
        />
      </div>
    </div>
  );
}
