import classNames from "classnames";
import { useState } from "react";
import Confetti from "react-confetti";
import { useQuery } from "react-query";
import { useWindowSize } from "react-use";
import MailSvg from "./svg/MailSvg";
import CodeSvg from "./svg/CodeSvg";
import ReloadSvg from "./svg/ReloadSvg";
import ExternalLinkSvg from "./svg/ExternalLinkSvg";
import ConfettiEmoji from "./emoji/ConfettiEmoji";
import SadEmoji from "./emoji/SadEmoji";
import FormattedDate from "./FormattedDate";

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
  } else if (
    !isLoading &&
    open &&
    (data.status || data.lastStatusChecked) !== "OPEN"
  ) {
    setOpen(false);
  }

  return (
    <>
      <Confetti
        width={width}
        height={height}
        opacity={open ? 1 : 0.1}
        numberOfPieces={open ? 800 : 30}
        className={classNames({ blur: !open })}
      />
      <div className="flex flex-col h-screen bg-slate-50 text-center px-10">
        <main className="m-auto text-xl">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <p>
                The last time someone checked, Oat was{" "}
                {open ? (
                  <span>
                    open! <ConfettiEmoji />
                  </span>
                ) : (
                  <span>
                    still closed. <SadEmoji />
                  </span>
                )}
              </p>
              {open && (
                <div>
                  <a
                    className="bg-slate-200 border-slate-500 border-2 rounded-lg p-2 m-2 hover:bg-slate-300 inline-flex"
                    href="https://www.oat.ie/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Order on Oat.ie
                    <ExternalLinkSvg />
                  </a>
                </div>
              )}
              <p>
                It was last checked on{" "}
                <FormattedDate
                  className="font-bold"
                  date={data.lastTimeChecked}
                />
              </p>
              <button
                className={classNames("mt-8", { "animate-spin": isRefetching })}
                type="button"
                onClick={refetch}
              >
                <ReloadSvg />
              </button>
              {data.errorMessage && (
                <div className="text-sm text-slate-400">
                  {data.errorMessage}
                </div>
              )}
            </div>
          )}
        </main>
        <footer className="pb-2">
          <div className="inline-flex gap-4 text-slate-400">
            <a
              href="https://github.com/Poooel/is-it-back-yet"
              target="_blank"
              rel="noreferrer"
            >
              <CodeSvg />
            </a>
            <a href="mailto:contact@is-it-back-yet.com">
              <MailSvg />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;
