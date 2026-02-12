interface AddServiceQuestionProps {
  onAddService: () => void;
}

export default function AddServiceQuestion({ onAddService }: AddServiceQuestionProps) {
  return (
    <div className="flex gap-4 justify-start items-center mt-4">
      <button
        type="button"
        onClick={onAddService}
        className="
          flex items-center gap-2 rounded-full px-4 py-1.5
          text-[var(--color-success)] border border-[var(--color-success)]
          bg-[rgba(0,171,85,0.04)] hover:bg-[rgba(0,171,85,0.1)]
          transition-colors duration-150 cursor-pointer text-sm font-medium
        "
      >
        Service hinzufügen?
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}
