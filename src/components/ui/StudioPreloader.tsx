import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AutomateLogo } from '../brand/AutomateLogo';

export function StudioPreloader() {
  const prefersReducedMotion = useReducedMotion();
  const [isBuffering, setIsBuffering] = useState(() => {
    if (typeof document === 'undefined') {
      return false;
    }
    const fontsLoaded = document.fonts ? document.fonts.status === 'loaded' : true;
    return !(document.readyState === 'complete' && fontsLoaded);
  });

  useEffect(() => {
    if (!isBuffering) {
      return;
    }

    let cancelled = false;
    const finishBuffering = () => {
      if (!cancelled) {
        setIsBuffering(false);
      }
    };

    const waitForFontsAndFinish = () => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(finishBuffering, finishBuffering);
      } else {
        finishBuffering();
      }
    };

    if (document.readyState === 'complete') {
      waitForFontsAndFinish();
      return () => {
        cancelled = true;
      };
    }

    window.addEventListener('load', waitForFontsAndFinish, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', waitForFontsAndFinish);
    };
  }, [isBuffering]);

  return (
    <AnimatePresence>
      {isBuffering ? (
        <motion.div
          key="automate-zero-buffer-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading Automate_Zero"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#090909] pointer-events-none select-none"
        >
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : { opacity: [0.72, 1, 0.72], scale: [0.98, 1, 0.98] }
            }
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <AutomateLogo
              tone="on-dark"
              className="scale-125 sm:scale-150"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
