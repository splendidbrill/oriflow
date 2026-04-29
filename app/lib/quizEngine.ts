import type { QuizInputs, OnboardingPayload, Journey } from '@/app/types/quiz';

const DEFAULT: OnboardingPayload = {
  step1: 'Growth / Goals',
  step2: 'Building toward something bigger over time',
  step3: ['Mental clarity', 'Learning', 'Career'],
};

export function calculateOnboardingPayload(inputs: QuizInputs): OnboardingPayload {
  const { direction, intent, approach, pace, structure } = inputs;

  // CASE 1 — Direction = LOW
  if (direction === 'Low') {
    const step1: Journey = 'Explore';
    if (structure === 'Low') {
      return { step1, step2: 'Try a few things and see what helps', step3: ['Learning', 'Hobbies', 'Mental clarity'] };
    }
    if (structure === 'High') {
      return { step1, step2: 'Gently get more structure over time', step3: ['Routines', 'Learning', 'Mental clarity'] };
    }
    return DEFAULT;
  }

  // CASE 2 — Direction = MID + Intent = CALM
  if (direction === 'Mid' && intent === 'Calm') {
    const step1: Journey = 'Calm / Control';
    if (approach === 'Steady' && pace === 'Low') {
      return { step1, step2: 'Something I can improve soon', step3: ['Mental clarity', 'Emotional wellbeing', 'Routines'] };
    }
    if (approach === 'Steady' && (pace === 'Mid' || pace === 'High')) {
      return { step1, step2: 'Something I can build steadily over time', step3: ['Routines', 'Physical health', 'Emotional wellbeing'] };
    }
    if (approach === 'Progress' && pace === 'Low') {
      return { step1, step2: 'Something I can improve soon', step3: ['Mental clarity', 'Routines', 'Physical health'] };
    }
    if (approach === 'Progress' && (pace === 'Mid' || pace === 'High')) {
      return { step1, step2: 'Something I can build steadily over time', step3: ['Routines', 'Physical health', 'Mental clarity'] };
    }
    return DEFAULT;
  }

  // CASE 3 — Direction = MID + Intent = PROGRESS
  if (direction === 'Mid' && intent === 'Progress') {
    const step1: Journey = 'Growth / Goals';
    const step2 = 'Building toward something bigger over time';
    if (approach === 'Steady' && structure === 'Low') {
      return { step1, step2, step3: ['Learning', 'Hobbies', 'Career'] };
    }
    if (approach === 'Steady' && structure === 'High') {
      return { step1, step2, step3: ['Routines', 'Learning', 'Career'] };
    }
    if (approach === 'Progress' && pace === 'Low') {
      return { step1, step2, step3: ['Learning', 'Career', 'Mental clarity'] };
    }
    if (approach === 'Progress' && (pace === 'Mid' || pace === 'High')) {
      return { step1, step2, step3: ['Career', 'Learning', 'Money'] };
    }
    return DEFAULT;
  }

  // CASE 4 — Direction = HIGH
  if (direction === 'High') {
    const step1: Journey = 'Growth / Goals';
    if (approach === 'Progress' && pace === 'High') {
      return { step1, step2: 'I have something specific I want to achieve soon', step3: ['Career', 'Learning', 'Money'] };
    }
    if (approach === 'Progress' && pace === 'Mid') {
      return { step1, step2: 'Building toward something bigger over time', step3: ['Career', 'Learning', 'Money'] };
    }
    if (approach === 'Progress' && pace === 'Low') {
      return { step1, step2: 'Building toward something bigger over time', step3: ['Career', 'Learning', 'Mental clarity'] };
    }
    if (approach === 'Steady') {
      return { step1, step2: 'Building toward something bigger over time', step3: ['Learning', 'Career', 'Hobbies'] };
    }
    return DEFAULT;
  }

  return DEFAULT;
}
