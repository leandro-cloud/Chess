export const Check = ({ turn }: { turn: string }) => {
  return (
    <h2 className="text-[#e74c3c]">
      {turn[0].toUpperCase()}
      {turn.slice(1)} in check!!!
    </h2>
  );
};
