import SignOutButton from "@/app/components/workspace/SignOutButton";

export const metadata = {
  title: "Oriflow — Your quiet space",
  description: "Your adaptive scaffold is ready.",
};

export default function WorkspacePage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#FFE4D6] via-[#F3E8FF] to-[#E0F2FE]">
      <div className="text-center max-w-xl mx-auto px-2">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 leading-[1.05] tracking-tight mb-6">
          Welcome to your{' '}
          <span
            className="italic font-normal text-[#C2624D]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            quiet space
          </span>
          .
        </h1>
        <p
          className="text-lg md:text-xl text-slate-600 italic"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Your adaptive scaffold is ready.
        </p>
      </div>

      <div className="mt-16">
        <SignOutButton />
      </div>
    </main>
  );
}
