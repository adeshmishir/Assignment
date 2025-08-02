import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import InputForm from "./InputForm";

function ActorDetails({ actor, apiKey }) {
  const [inputSchema, setInputSchema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const { data } = await axios.get(`/api/actors/${actor.id}/input-schema`, {
          headers: { Authorization: `Bearer ${apiKey}` },
        });
        setInputSchema(data);
      } catch {
        toast.error("Failed to fetch input schema");
      } finally {
        setLoading(false);
      }
    };
    fetchSchema();
  }, [actor.id, apiKey]);

  const toggleForm = () => setShowInput(!showInput);

  return (
    <div className="border p-4 rounded bg-white shadow">
      <h3 className="text-lg font-semibold mb-2">{actor.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{actor.description}</p>
      <button
        onClick={toggleForm}
        className="px-4 py-1 text-sm bg-blue-600 text-white rounded"
      >
        {showInput ? "Hide" : "Run"} Actor
      </button>
      {showInput && !loading && inputSchema && (
        <InputForm actorId={actor.id} schema={inputSchema} apiKey={apiKey} />
      )}
    </div>
  );
}

export default ActorDetails;
