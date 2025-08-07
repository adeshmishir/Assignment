import { useEffect, useState } from "react";
import { fetchActors, fetchActorInputSchema, runActor } from "../api";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function Dashboard() {
  const [apiKey, setApiKey] = useState("");
  const [actors, setActors] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [inputSchema, setInputSchema] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const key = localStorage.getItem("apiKey");
    if (!key) {
      navigate("/");
    } else {
      setApiKey(key);
      loadActors(key);
    }
  }, []);

  const loadActors = async (key) => {
    try {
      setLoading(true);
      const { data } = await fetchActors(key);
      setActors(data);
    } catch (err) {
      setError("Failed to fetch actors");
    } finally {
      setLoading(false);
    }
  };

  const handleActorSelect = async (actor) => {
    setSelectedActor(actor);
    setLoading(true);
    try {
      const { data } = await fetchActorInputSchema(actor.id, apiKey);
      setInputSchema(data);

      // Pre-fill input values with default if available
      const defaults = {};
      for (const key in data) {
        defaults[key] = data[key].default || "";
      }
      setInputValues(defaults);
    } catch (err) {
      setError("Failed to fetch input schema");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInputValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedActor) return;

    try {
      setLoading(true);
      const { data } = await runActor(selectedActor.id, inputValues, apiKey);
      localStorage.setItem("runResult", JSON.stringify(data));
      navigate("/result");
    } catch (err) {
      setError("Failed to run actor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Available Actors</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin h-6 w-6" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {actors.map((actor) => (
            <button
              key={actor.id}
              onClick={() => handleActorSelect(actor)}
              className={`border p-4 rounded-lg shadow-sm ${
                selectedActor?.id === actor.id
                  ? "bg-blue-100 border-blue-500"
                  : "bg-white"
              }`}
            >
              <h2 className="text-lg font-semibold">{actor.name}</h2>
              <p className="text-sm text-gray-600">{actor.description}</p>
            </button>
          ))}
        </div>
      )}

      {selectedActor && Object.keys(inputSchema).length > 0 && (
        <form
          onSubmit={handleSubmit}
          className="border p-6 rounded-lg bg-white shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Run: {selectedActor.name}
          </h2>

          {Object.entries(inputSchema).map(([key, field]) => (
            <div key={key} className="mb-4">
              <label className="block mb-1 font-medium">{field.title || key}</label>
              <input
                type="text"
                name={key}
                value={inputValues[key]}
                onChange={handleChange}
                placeholder={field.description || ""}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Running..." : "Run Actor"}
          </button>
        </form>
      )}
    </div>
  );
}

export default Dashboard;
