import { useState } from "react";

function App() {

  const [repoUrl, setRepoUrl] = useState("");
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateReadme() {

    try {

      setLoading(true);
      setError("");
      setReadme("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            repoUrl
          })
        }
      );
       const data = await response.json();

      if (data.success) {

        setReadme(data.readme);

      } else {

        setError(data.message || "Something went wrong");

      }

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }

  }

  function copyReadme() {

    navigator.clipboard.writeText(readme);

    alert("README copied!");

     }

  function downloadReadme() {

    const blob = new Blob([readme], {
      type: "text/markdown"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "README.md";

    a.click();

  }

   return (

   <div className="min-h-screen relative overflow-hidden bg-black text-white p-10">

    {/* Lightning Background */}

<div className="absolute inset-0 overflow-hidden">

  <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500 opacity-20 blur-[150px] animate-pulse"></div>

  <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500 opacity-20 blur-[150px] animate-pulse"></div>

  <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-400 opacity-10 blur-[120px] animate-ping"></div>

</div>

     <div className="relative z-10 max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          AI README Generator
        </h1>

        <p className="text-gray-400 mb-10">
          Generate professional README files using AI.
        </p>

        <div className="flex gap-4 mb-6">

          <input
            type="text"
            placeholder="Enter GitHub Repository URL"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="
flex-1
p-4
rounded-xl
bg-white/5
backdrop-blur-lg
border border-white/10
outline-none
"
          />

          <button
            onClick={generateReadme}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-xl font-semibold"
          >
            {
              loading
               ? "Generating..."
                : "Generate"
            }
          </button>

        </div>

        {
          error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-xl mb-6">
              {error}
            </div>
          )
        }

        {
          loading && (
            <div className="bg-[#161b22] p-6 rounded-xl mb-6 animate-pulse">
              AI is analyzing repository and generating README...
            </div>
          )
        }
         {
          readme && (

            <div>

              <div className="flex gap-4 mb-6">

                <button
                  onClick={copyReadme}
                  className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl"
                >
                  Copy README
                </button>

                <button
                  onClick={downloadReadme}
                  className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl"
                >
                  Download README
                </button>

              </div>
                <textarea
                value={readme}
                readOnly
                className="
w-full
h-[600px]
bg-white/5
backdrop-blur-xl
p-6
rounded-2xl
border border-white/10
text-green-400
shadow-2xl
"
              />

            </div>

          )
        }

      </div>

    </div>

  );

}

export default App;