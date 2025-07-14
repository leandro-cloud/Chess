import { useBoardContext } from "../hooks/useBoardContext";

export const MovesDictionary = () => {
  const { moves } = useBoardContext();

  const { white, black } = moves;

  const maxLength = Math.max(white.length, black.length);

  return (
    <table className="*:text-ligth-gray">
      <thead>
        <tr>
          <th className="border px-2 py-1">#</th>
          <th className="border px-2 py-1">White</th>
          <th className="border px-2 py-1">Black</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: maxLength }).map((_, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-dark-gray" : "bg-black-smoke"}
          >
            <td className="border px-2 py-1">{index + 1}</td>
            <td className="border px-2 py-1">{white[index] || ""}</td>
            <td className="border border-gray-400 px-2 py-1">
              {black[index] || ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
