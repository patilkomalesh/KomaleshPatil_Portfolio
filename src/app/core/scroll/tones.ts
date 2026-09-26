// Background tones the page drifts through while scrolling. All of them stay
// on the amber side of the palette — no blue/cyan anywhere on the main page.
// Each section declares a tone with data-tone and the page eases towards it.

export type Tone = 'base' | 'amber' | 'gold' | 'ember';

export interface ToneColors {
  /** Page background. */
  bg: string;
  /** Colour of the slow ambient glow behind the content. */
  glow: string;
  /** Second, smaller glow that trails the first. */
  glowAlt: string;
}

export const TONES: Record<'dark' | 'light', Record<Tone, ToneColors>> = {
  dark: {
    base: { bg: '#000000', glow: 'rgba(242, 168, 50, 0.13)', glowAlt: 'rgba(242, 168, 50, 0.05)' },
    amber: { bg: '#130c02', glow: 'rgba(242, 168, 50, 0.20)', glowAlt: 'rgba(242, 120, 30, 0.10)' },
    gold: { bg: '#170f01', glow: 'rgba(255, 196, 84, 0.20)', glowAlt: 'rgba(242, 168, 50, 0.09)' },
    ember: { bg: '#1c1103', glow: 'rgba(242, 168, 50, 0.28)', glowAlt: 'rgba(255, 140, 60, 0.10)' },
  },
  light: {
    base: { bg: '#f5f8fa', glow: 'rgba(242, 168, 50, 0.20)', glowAlt: 'rgba(242, 168, 50, 0.08)' },
    amber: { bg: '#fbf2e2', glow: 'rgba(242, 168, 50, 0.30)', glowAlt: 'rgba(242, 120, 30, 0.12)' },
    gold: { bg: '#fdf0d9', glow: 'rgba(255, 196, 84, 0.32)', glowAlt: 'rgba(242, 168, 50, 0.14)' },
    ember: { bg: '#fbe9c9', glow: 'rgba(242, 150, 30, 0.38)', glowAlt: 'rgba(240, 120, 40, 0.12)' },
  },
};
