import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { runId } = location.state || {};

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRunStatus = async () => {
      try {
        const interval = setInterval(async () => {
          const response = await fetch(`https://api.apify.com/v2/actor-runs/${runId}`);
          const data = await response.json();

          if (data.data?.status === "SUCCEEDED") {
            clearInterval(interval);
            const resultUrl = data.data?.output?.resultUrl || data.data?.output?.defaultDatasetId;

            setResult(resultUrl);
            setLoading(false);
          } else if (["FAILED", "TIMED-OUT", "ABORTED"].includes(data.data?.status)) {
            clearInterval(interval);
            setResult("Actor run failed.");
            setLoading(false);
          }
        }, 3000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error("Error fetching result:", error);
        setResult("An error occurred while fetching results.");
        setLoading(false);
      }
    };

    if (runId) {
      fetchRunStatus();
    } else {
      setResult("No run ID provided.");
      setLoading(false);
    }
  }, [runId]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h2 className="text-2xl font-semibold mb-6">Actor Run Result</h2>

      {loading ? (
        <div className="flex items-center gap-2 text-lg">
          <Loader2 className="animate-spin" />
          Fetching result...
        </div>
      ) : typeof result === "string" ? (
        <div className="text-center">
          <p className="mb-4 break-all">
            {result.startsWith("http") ? (
              <>
                Result URL:
                <br />
                <a
                  href={result}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-words"
                >
                  {result}
                </a>
              </>
            ) : (
              result
            )}
          </p>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Result;
