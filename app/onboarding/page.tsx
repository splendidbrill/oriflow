import OnboardingFlow from "@/app/components/onboarding/OnboardingFlow";

export const metadata = {
  title: "Oriflow — Set up your space",
  description:
    "Pick a few areas to start with. You can always change this later.",
};

export default function OnboardingPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#FFE4D6] via-[#F3E8FF] to-[#E0F2FE]">
      <OnboardingFlow />
    </main>
  );
}
