import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS } from '../data/missionData';
import confetti from 'canvas-confetti';
import { Award, RotateCcw, ArrowRight, CheckCircle2, XCircle, Brain } from 'lucide-react';

export const KnowledgeCheck: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      if (score >= 7) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCompleted(false);
  };

  const progressPct = ((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <section id="knowledge-check" className="w-full py-space-2xl px-4 sm:px-margin-tablet lg:px-margin-desktop bg-surface border-b border-surface-container-highest/60">
      <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
        {/* Eyebrow and Headline */}
        <motion.div 
          className="flex flex-col gap-space-xs"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
            KNOWLEDGE CHECK / 11
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-headline-lg text-on-surface font-semibold uppercase">
            TEST YOUR LUNAR MISSION ENGINEERING KNOWLEDGE.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
            Evaluate your understanding of topocentric angles, terrain masks, libration cycles, and polar mission planning with instant validation and scientific rationale.
          </p>
        </motion.div>

        {/* Quiz Container */}
        <motion.div 
          className="bg-surface-container-high p-space-md sm:p-space-lg flex flex-col gap-space-lg shadow-xl border border-surface-container-highest"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Progress & Score Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container-highest">
            <div className="flex items-center gap-space-sm">
              <span className="font-label-caps text-label-caps text-outline uppercase">
                QUESTION
              </span>
              <span className="font-telemetry-lg text-telemetry-lg text-primary font-bold">
                {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1} / {QUIZ_QUESTIONS.length}
              </span>
            </div>

            <div className="flex items-center gap-space-md w-full sm:w-auto justify-between sm:justify-start tabular-nums">
              <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">
                SCORE: <strong className="text-secondary font-bold text-base">{score}</strong> / {QUIZ_QUESTIONS.length}
              </span>
              <div className="w-32 bg-surface-container-lowest h-2 overflow-hidden border border-surface-container-highest">
                <div 
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          {!isCompleted ? (
            /* Question Body with Smooth Transition */
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentQ.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-space-md min-h-[220px]"
              >
                <h3 className="font-headline-md text-lg sm:text-headline-md text-on-surface font-semibold leading-snug">
                  {currentQ.prompt}
                </h3>

                {/* Multiple Choice Options */}
                <div className="grid grid-cols-1 gap-2.5">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === currentQ.correctIndex;
                    let btnStyle = 'bg-surface-container-low border-surface-container-highest text-on-surface hover:bg-surface-container';

                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = 'bg-primary/20 border-primary text-primary font-semibold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-error/20 border-error text-error';
                      } else {
                        btnStyle = 'bg-surface-container-low border-surface-container-highest opacity-50 text-outline';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswered}
                        className={`p-3 text-left font-body-sm text-sm border flex items-center justify-between gap-3 transition-all cursor-pointer ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-telemetry-sm text-xs shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {isAnswered && isCorrect && (
                          <CheckCircle2 size={18} className="text-primary shrink-0" />
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <XCircle size={18} className="text-error shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Explanation */}
                {isAnswered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-1 text-xs font-telemetry-sm"
                  >
                    <span className="font-bold text-secondary flex items-center gap-1.5">
                      <Brain size={14} /> SCIENTIFIC RATIONALE:
                    </span>
                    <p className="text-on-surface-variant font-body-sm text-xs leading-relaxed">
                      {currentQ.rationale}
                    </p>
                  </motion.div>
                )}

                {/* Next Button */}
                {isAnswered && (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNext}
                      className="px-5 py-2 bg-primary-container text-on-primary-container font-telemetry-sm uppercase font-semibold flex items-center gap-2 hover:bg-primary transition-all shadow-md group cursor-pointer"
                    >
                      <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Complete Exam'}</span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            /* Exam Completed Screen */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-space-xl bg-surface-container-lowest border border-surface-container-highest flex flex-col items-center text-center gap-4"
            >
              <Award size={48} className="text-secondary" />
              <h3 className="font-headline-lg text-2xl text-on-surface font-semibold uppercase">
                EXAM EVALUATION COMPLETE
              </h3>
              <p className="font-body-md text-on-surface-variant max-w-md">
                You scored <strong className="text-secondary font-bold text-lg">{score}</strong> out of {QUIZ_QUESTIONS.length} on lunar south-pole celestial geometry, topographic horizon masking, and CLPS mission requirements.
              </p>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 bg-primary-container text-on-primary-container font-telemetry-sm uppercase font-semibold flex items-center gap-2 hover:bg-primary transition-all cursor-pointer"
              >
                <RotateCcw size={15} />
                <span>Retake Knowledge Check</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
