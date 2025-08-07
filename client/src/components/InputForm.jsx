import { useEffect, useState } from "react";
import { Loader2, Play } from "lucide-react";
import { useAuth } from "../context/authStore";

function InputForm({ actor, onRunActor }) {
  const [inputSchema, setInputSchema] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [loading, setLoading] = useState(true);
  const { apiKey } = useAuth();

  useEffect(() => {
    const fetchInputSchema = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.apify.com/v2/acts/${actor?.id}`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
        const data = await res.json();
        setInputSchema(data?.data?.input?.schema || {});
        // Set default values
        const defaultValues = {};
        Object.entries(data?.data?.input?.schema?.properties || {}).forEach(
          ([key, value]) => {
            defaultValues[key] = value.default || "";
          }
        );
        setInputValues(defaultValues);
      } catch (err) {
        console.error("Failed to fetch schema", err);
      } finally {
        setLoading(false);
      }
    };

    if (actor?.id && apiKey) fetchInputSchema();
  }, [actor, apiKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRunActor(inputValues);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!Object.keys(inputSchema).length) {
    return (
      <p className="text-sm text-gray-500 mt-2">
        This actor does not have a defined input schema.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white shadow-md p-4 rounded-md space-y-4"
    >
      {Object.entries(inputSchema.properties || {}).map(([key, value]) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {key}
          </label>
          <input
            type="text"
            name={key}
            placeholder={value.description || key}
            value={inputValues[key] || ""}
            onChange={handleChange}
            required={inputSchema.required?.includes(key)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      <button
        type="submit"
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        <Play size={16} />
        Run Actor
      </button>
    </form>
  );
}

export default InputForm;
