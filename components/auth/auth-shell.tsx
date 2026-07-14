import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

type AuthShellProps = {
  mode: "login" | "register";
  children: ReactNode;
};

const copy = {
  login: {
    art: "/assets/images/login.png",
    eyebrow: "Welcome back",
    title: "Login to your account",
    footer: "Dont have an account?",
    action: "Create New Account",
    href: "/register",
  },
  register: {
    art: "/assets/images/registration.png",
    eyebrow: "Get Started Now",
    title: "Registration",
    footer: "Already have an account?",
    action: "Login now",
    href: "/login",
  },
};

export function AuthShell({ mode, children }: AuthShellProps) {
  const item = copy[mode];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0F2F5] px-4 py-10 lg:py-24">
      <Image
        src="/assets/images/shape1.svg"
        alt=""
        width={230}
        height={230}
        className="auth-shape left-0 top-0 hidden sm:block"
      />
      <Image
        src="/assets/images/shape2.svg"
        alt=""
        width={210}
        height={210}
        className="auth-shape right-5 top-0 hidden sm:block"
      />
      <Image
        src="/assets/images/shape3.svg"
        alt=""
        width={180}
        height={180}
        className="auth-shape bottom-0 right-[20%] hidden lg:block"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_430px]">
        <div className="hidden lg:block">
          <Image
            src={item.art}
            alt=""
            width={720}
            height={620}
            priority
            className="h-auto w-full object-contain"
          />
        </div>

        <Card className="mx-auto w-full max-w-[430px] border-0 p-8 shadow-none sm:p-12">
          <div className="mb-7 flex justify-center">
            <Image src="/assets/images/logo.svg" alt="Buddy Script" width={161} height={42} />
          </div>
          <p className="mb-2 text-center text-base text-[#2D3748]">{item.eyebrow}</p>
          <h1 className="mb-10 text-center text-[28px] font-semibold leading-tight text-[#1A202C]">
            {item.title}
          </h1>
          {children}
          <p className="mt-10 text-center text-base text-[#2D3748]">
            {item.footer}{" "}
            <Link href={item.href} className="font-medium text-primary">
              {item.action}
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}
