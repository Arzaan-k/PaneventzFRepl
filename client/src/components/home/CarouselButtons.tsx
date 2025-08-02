import { useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ButtonProps = {
  enabled: boolean;
  onClick: () => void;
};

type DotButtonProps = {
  selected: boolean;
  onClick: () => void;
};

export const DotButton: React.FC<DotButtonProps> = (props) => {
  const { selected, onClick } = props;

  return (
    <button
      className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${
        selected ? 'bg-primary' : 'bg-gray-300'
      }`}
      type="button"
      onClick={onClick}
      aria-label={`Go to slide ${selected ? 'selected' : ''}`}
    />
  );
};

export const PrevButton: React.FC<ButtonProps> = ({ enabled, onClick }) => {
  return (
    <button
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none"
      onClick={onClick}
      disabled={!enabled}
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
};

export const NextButton: React.FC<ButtonProps> = ({ enabled, onClick }) => {
  return (
    <button
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none"
      onClick={onClick}
      disabled={!enabled}
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  );
};