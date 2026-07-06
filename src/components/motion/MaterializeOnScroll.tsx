'use client';

import { motion } from 'framer-motion';

// First component in the motion/ folder the architecture doc describes — none
// existed yet, so this establishes the pattern rather than matching one.
// whileInView + viewport once:true: animates in the first time the element
// scrolls into view, never replays on subsequent scroll-past.
export function MaterializeOnScroll({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  // 'span' when nesting inside inline/phrasing-content contexts (e.g. a <p>) —
  // a block-level <div> there is invalid HTML and triggers hydration errors.
  as?: 'div' | 'span';
}) {
  const MotionTag = as === 'span' ? motion.span : motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
