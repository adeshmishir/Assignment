import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Loader2, Play } from "lucide-react";

function ActorDetails() {
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);
  const [schema, setSchema] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState(null);

  const fetchActorDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/actors/${actorId}`);
      setActor(res.data.actor);
      setSchema(res.data.schema || {});
    } catch (err) {
      toast.error("Failed to load actor details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActorDetails();
  }, [actorId]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleRun = async () => {
    setExecuting(true);
    setResult(null);
    try {
      const res = await axios.post(`/api/actors/${actorId}/run`, formData);
      setResult(res.data);
      toast.success("Actor run successfully!");
    } catch (err) {
      toast.error("Actor execution failed");
    } finally {
      setExecuting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold text-center mb-6">{actor?.title}</h1>

      <div className="space-y-4">
        {Object.keys(schema).length === 0 ? (
          <p className="text-center text-gray-500">No input schema found.</p>
        ) : (
          Object.entries(schema).map(([key, value]) => (
            <div key={key}>
              <label className="block font-medium mb-1">{value.title || key}</label>
              <input
                type="text"
                placeholder={value.description || ""}
                className="w-full px-4 py-2 border rounded-lg"
                value={formData[key] || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            </div>
          ))
        )}
      </div>

      <button
        onClick={handleRun}
        disabled={executing}
        className="mt-6 w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 flex items-center justify-center gap-2"
      >
        {executing ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
        Run Actor
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="font-semibold mb-2">Execution Result:</p>
          <pre className="text-sm whitespace-pre-wrap break-words">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ActorDetails;
