import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// tailwind-merge doesn't know the custom fluid type scale (globals.css
// @theme --text-*), so without this it classifies text-h2 etc. as text-COLOR
// classes and wrongly drops them when a real color like text-white appears
// later in the same cn() call.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['display', 'h1', 'h2', 'h3', 'body-lg', 'body', 'caption', 'eyebrow'] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
