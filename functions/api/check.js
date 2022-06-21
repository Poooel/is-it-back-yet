import { jsonResponse } from "../utils/jsonResponse";

const lastTimeCheckedKey = "lastTimeChecked";
const lastStatusCheckedKey = "lastStatusChecked";

export async function onRequestGet(context) {
  const { env } = context;

  const lastCheckedFromKV = await env.LAST_CHECKED.get(lastTimeCheckedKey);
  let lastChecked;

  if (lastCheckedFromKV === null) {
    lastChecked = new Date(new Date().setDate(new Date().getDate() - 1));
  } else {
    lastChecked = new Date(lastCheckedFromKV);
  }

  const now = new Date();

  let timeDiff = now - lastChecked;
  timeDiff /= 1000;

  if (timeDiff < 3600) {
    const lastStatusChecked = await env.LAST_CHECKED.get(lastStatusCheckedKey);

    return jsonResponse(
      {
        errorMessage:
          "You (or someone else) already checked less than an hour ago, you can only check once an hour.",
        lastTimeChecked: lastChecked.toISOString(),
        lastStatusChecked,
      },
      {
        status: 429,
      }
    );
  } else {
    const status = await fetch("https://www.oat.ie/")
      .then((response) => response.text())
      .then((text) => {
        if (/coming soon/i.test(text)) {
          return "COMING_SOON";
        } else {
          return "OPEN";
        }
      });

    await env.LAST_CHECKED.put(lastStatusCheckedKey, status);
    await env.LAST_CHECKED.put(lastTimeCheckedKey, now.toISOString());

    return jsonResponse(
      {
        status,
        lastTimeChecked: now.toISOString(),
      },
      {
        status: 200,
      }
    );
  }
}
