import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import ActorCard from "../components/ActorCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Dashboard() {
  const { apiToken } = useAuth();
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const actorsPerPage = 6;

  const indexOfLastActor = currentPage * actorsPerPage;
  const indexOfFirstActor = indexOfLastActor - actorsPerPage;
  const currentActors = actors.slice(indexOfFirstActor, indexOfLastActor);
  const totalPages = Math.ceil(actors.length / actorsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchActors = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.apify.com/v2/acts", {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      setActors(res.data.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleRunActor = async (actor) => {
    try {
      const res = await axios.post(
        `https://api.apify.com/v2/acts/${actor.username}~${actor.name}/runs?token=${apiToken}`
      );
      const runId = res.data.data.id;
      navigate(`/result/${runId}`);
    } catch (err) {
      toast.error("Failed to start actor.");
      console.error("Run Actor Error:", err);
    }
  };

  useEffect(() => {
    if (apiToken) fetchActors();
  }, [apiToken]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Your Actors</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentActors.map((actor) => (
              <ActorCard key={actor.id} actor={actor} onRun={handleRunActor} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
