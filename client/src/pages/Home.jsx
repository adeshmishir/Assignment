import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ActorCard from "../components/ActorCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate(); // ✅ Move this INSIDE the component
  const [apiKey, setApiKey] = useState("");
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const actorsPerPage = 6;

  const indexOfLastActor = currentPage * actorsPerPage;
  const indexOfFirstActor = indexOfLastActor - actorsPerPage;
  const currentActors = actors.slice(indexOfFirstActor, indexOfLastActor);
  const totalPages = Math.ceil(actors.length / actorsPerPage);

  const handleFetchActors = async () => {
    if (!apiKey.trim()) {
      toast.error("API Key is required");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get("https://api.apify.com/v2/acts", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      setActors(response.data.data?.items || []);
      toast.success("Actors fetched successfully");
    } catch {
      toast.error("Failed to fetch actors");
    } finally {
      setLoading(false);
    }
  };

  const handleRunActor = (actor) => {
    console.log("Run actor clicked:", actor);
    toast.success(`Selected actor: ${actor.name}`);
    navigate("/result", { state: { actor } });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Apify Actors Viewer</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Apify API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={handleFetchActors}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Fetch Actors
        </button>
      </div>

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

export default Home;
