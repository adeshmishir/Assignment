import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const actor = location.state?.actor;

  const buttonClasses =
    "px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition";

  if (!actor) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center mt-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          No Actor Selected
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Please go back and select an actor to view details.
        </p>
        <button className={buttonClasses} onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-gray-100">
        Actor Details
      </h1>
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {actor.name}
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
          {actor.description || "No description available."}
        </p>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-semibold">Username:</span> {actor.username}
          </p>
          <p>
            <span className="font-semibold">Build Tag:</span>{" "}
            {actor.defaultRunOptions?.build || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Memory:</span>{" "}
            {actor.defaultRunOptions?.memory || "N/A"} MB
          </p>
          <p>
            <span className="font-semibold">Timeout:</span>{" "}
            {actor.defaultRunOptions?.timeoutSecs || "N/A"} secs
          </p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <button className={buttonClasses} onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
