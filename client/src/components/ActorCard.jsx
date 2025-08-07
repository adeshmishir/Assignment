import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

function ActorCard({ actor }) {
  const navigate = useNavigate();

  const handleRunClick = () => {
    navigate(`/dashboard`, { state: { actor } });
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg hover:shadow-xl transition duration-300">
      <h2 className="text-lg font-semibold mb-2">{actor.name}</h2>
      <p className="text-sm text-gray-600 mb-4">{actor.description}</p>
      <button
        onClick={handleRunClick}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        <Play size={18} />
        Run Actor
      </button>
    </div>
  );
}

export default ActorCard;
