'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { calculateOnboardingPayload } from '@/app/lib/quizEngine';
import type {
  Intent,
  Approach,
  SliderValue,
  StructureValue,
  OnboardingPayload,
} from '@/app/types/quiz';

interface QuizState {
  intent: Intent;
  approach: Approach;
  direction: SliderValue;
  pace: SliderValue;
  structure: StructureValue;
  payload: OnboardingPayload | null;
  setIntent: (value: Intent) => void;
  setApproach: (value: Approach) => void;
  setDirection: (value: SliderValue) => void;
  setPace: (value: SliderValue) => void;
  setStructure: (value: StructureValue) => void;
  setPayload: (value: OnboardingPayload) => void;
  getPayload: () => OnboardingPayload;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      intent: null,
      approach: null,
      direction: null,
      pace: null,
      structure: null,
      payload: null,

      setIntent: (value) => set({ intent: value }),
      setApproach: (value) => set({ approach: value }),
      setDirection: (value) => set({ direction: value }),
      setPace: (value) => set({ pace: value }),
      setStructure: (value) => set({ structure: value }),
      setPayload: (value) => set({ payload: value }),

      getPayload: () => {
        const { intent, approach, direction, pace, structure } = get();
        return calculateOnboardingPayload({ intent, approach, direction, pace, structure });
      },
    }),
    {
      name: 'oriflow-quiz',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ payload: state.payload }),
    },
  ),
);
