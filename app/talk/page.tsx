import QuizFlow from "@/app/components/quiz/QuizFlow";

export const metadata = {
  title: "Oriflow — A starting point that fits you",
  description:
    "A quiet space to find a starting point — without overthinking, without performance.",
};

export default function TalkPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#FFE4D6] via-[#F3E8FF] to-[#E0F2FE]">
      <QuizFlow />
    </main>
  );
}
