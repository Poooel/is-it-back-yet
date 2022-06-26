import { useState } from "react";
import Confetti from "react-confetti";
import { useQuery } from "react-query";
import { useWindowSize } from "react-use";

function Home() {
  const { isLoading, data, refetch, isRefetching } = useQuery(
    "check-website",
    () => fetch("/api/check").then((res) => res.json())
  );
  const { width, height } = useWindowSize();
  const [open, setOpen] = useState(false);

  if (
    !isLoading &&
    !open &&
    (data.status || data.lastStatusChecked) === "OPEN"
  ) {
    setOpen(true);
  }

  return (
    <>
      <Confetti
        width={width}
        height={height}
        opacity={open ? 1 : 0.1}
        numberOfPieces={open ? 600 : 30}
      />
      <div className="text-xl flex h-screen bg-slate-100 p-12">
        <div className="m-auto text-center">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <p>
                The last time someone checked, Oat was{" "}
                {(data.status || data.lastStatusChecked) === "OPEN" ? (
                  <span>
                    open!{" "}
                    <span className="emoji" role="img" aria-label="confetti">
                      🎉
                    </span>
                  </span>
                ) : (
                  <span>
                    still closed.{" "}
                    <span className="emoji" role="img" aria-label="sad">
                      ☹️
                    </span>
                  </span>
                )}
              </p>
              {(data.status || data.lastStatusChecked) === "OPEN" && (
                <div>
                  <a
                    className="bg-slate-200 border-slate-500 border-2 rounded-lg p-2 m-4 hover:bg-slate-300 inline-flex justify-center"
                    href="https://www.oat.ie/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Order on Oat.ie
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mx-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}
              <p>
                It was last checked on{" "}
                <span className="font-bold">
                  {new Date(data.lastTimeChecked).toLocaleString("en-IE")}
                </span>
              </p>
              <button
                className="mt-4 px-4 py-2"
                type="button"
                onClick={refetch}
              >
                <div className={isRefetching ? "animate-spin" : ""}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 -scale-x-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
              </button>
              {data.errorMessage && (
                <div className="text-sm text-slate-400">
                  {data.errorMessage}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
