export type Intent = 'Calm' | 'Progress' | null;
export type Approach = 'Steady' | 'Progress' | null;
export type SliderValue = 'Low' | 'Mid' | 'High' | null;
export type StructureValue = 'Low' | 'High' | null;

export type Journey = 'Calm / Control' | 'Growth / Goals' | 'Explore';
export type FocusArea =
  | 'Mental clarity'
  | 'Physical health'
  | 'Emotional wellbeing'
  | 'Career'
  | 'Money'
  | 'Relationships'
  | 'Hobbies'
  | 'Learning'
  | 'Not sure yet'
  | 'Routines';

export interface QuizInputs {
  intent: Intent;
  approach: Approach;
  direction: SliderValue;
  pace: SliderValue;
  structure: StructureValue;
}

export interface OnboardingPayload {
  step1: Journey;
  step2: string;
  step3: FocusArea[];
}
