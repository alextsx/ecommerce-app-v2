export const SectionSeparator = ({ innerText }: { innerText?: string }) => {
  return (
    <div className="mt-10 relative w-10/12">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-2"></span>
      </div>
      {innerText && (
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-muted px-4 text-muted-foreground">{innerText}</span>
        </div>
      )}
    </div>
  );
};

export default SectionSeparator;
