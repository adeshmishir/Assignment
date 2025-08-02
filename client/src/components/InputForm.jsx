import { useEffect, useState } from "react";
import { Loader2, Play } from "lucide-react";

function InputForm({ actor, onRunActor }) {
  const [inputSchema, setInputSchema] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInputSchema = async () => {
      try {
        const res = await fetch(`https://api.apify.com/v2/acts/${actor.id}`);
        const data = await res.json();
        const schema = data?.inputSchema || {};
        setInputSchema(schema);
        const defaultValues = {};
        Object.keys(schema?.properties || {}).forEach((key) => {
          defaultValues[key] = schema.properties[key].default || "";
        });
        setInputValues(defaultValues);
      } catch (err) {
        console.error("Failed to fetch schema", err);
      } finally {
        setLoading(false);
      }
    };

    if (actor?.id) fetchInputSchema();
  }, [actor]);

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onRunActor(inputValues);
  };

  if (loading) {
    return (
      <div className="text-center py-6 text-gray-600 flex items-center justify-center gap-2">
        <Loader2 className="animate-spin w-5 h-5" />
        Loading input form...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Fill in Actor Input</h3>
      {Object.entries(inputSchema.properties || {}).map(([key, val]) => (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor={key}>
            {val.title || key}
          </label>
          <input
            type="text"
            id={key}
            name={key}
            value={inputValues[key]}
            onChange={handleChange}
            placeholder={val.description || ""}
            className="w-full border border-gray-300 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
      ))}
      <button
        type="submit"
        className="mt-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-all flex items-center gap-2"
      >
        <Play className="w-4 h-4" />
        Run Now
      </button>
    </form>
  );
}

export default InputForm;
