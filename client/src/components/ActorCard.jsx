import { PlayIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ActorCard({ actor, onRun }) {
  const navigate = useNavigate();

  const handleRunClick = () => {
    onRun(actor);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between hover:shadow-md transition-all">
      <div>
        <h3 className="text-xl font-semibold mb-2">{actor.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{actor.title || "No description available."}</p>
      </div>
      <button
        onClick={handleRunClick}
        className="mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all"
      >
        <PlayIcon className="w-4 h-4" />
        Run Actor
      </button>
    </div>
  );
}

export default ActorCard;
