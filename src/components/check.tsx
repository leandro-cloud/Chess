export const Check = ({ turn }: { turn: string }) => {
  return (
    <h2 className="text-red-700">
      {turn[0].toUpperCase()}
      {turn.slice(1)} in check!!!
    </h2>
  );
};
