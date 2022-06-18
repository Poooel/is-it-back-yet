import { jsonResponse } from "../utils/jsonResponse";

const keyName = "lastTimeChecked"

export async function onRequestGet(context) {
  const { env } = context;

  const lastCheckedFromKV = await env.LAST_CHECKED.get(keyName)
  let lastChecked

  if (lastCheckedFromKV === null) {
    lastChecked = new Date(new Date().setDate(new Date().getDate() - 1))
  } else {
    lastChecked = new Date(lastCheckedFromKV)
  }

  const now = new Date()

  let timeDiff = now - lastChecked
  timeDiff /= 1000

  if (timeDiff < 3600) {
    return jsonResponse(
      {
        errorMessage: 'You already checked less than an hour ago, you can only check every hour.',
        lastTimeChecked: lastChecked.toISOString()
      },
      {
        status: 429
      }
    )
  } else {
    const status = await fetch('https://www.oat.ie/')    
      .then(response => response.text())
      .then(text => {
        if (/coming soon/i.test(text)) {
          'COMING_SOON'
        } else {
          'OPEN'
        }
      })

    await env.LAST_CHECKED.put(keyName, now.toISOString())

    return jsonResponse(
      {
        status,
        lastTimeChecked: now.toISOString()
      },
      { 
        status: 200 
      }
    )
  }
}
