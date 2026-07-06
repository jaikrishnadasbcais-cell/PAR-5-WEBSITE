import type { Metadata } from 'next';
import { BuildMySystemReview } from '@/components/features/build-my-system';

export const metadata: Metadata = {
  title: 'Build My System — PAR5',
  description: 'Review your selected services, adjust your system, and take it to a conversation.',
};

export default function BuildMySystemPage() {
  return <BuildMySystemReview />;
}
