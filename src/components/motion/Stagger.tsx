'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

// One choreographed sequence per viewport (v3 amendment B2): a StaggerGroup
// and its StaggerItem children form a single sequence — the container fires
// once on viewport entry and cascades its items at 80ms. Item entrance is the
// approved materialize (blur+scale+opacity) and stays inside the 400ms text
// budget. Reduced-motion collapses to a plain crossfade.
const GROUP_VARIANTS: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function StaggerGroup({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      variants={GROUP_VARIANTS}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion() ?? false;

  const itemVariants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
        show: {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          transition: { duration: 0.4, ease: 'easeOut' },
        },
      };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
