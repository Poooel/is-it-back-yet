export async function onRequestGet(context) {
    // Contents of context object
    const {
      request, // same as existing Worker API
      env, // same as existing Worker API
      params, // if filename includes [id] or [[path]]
      waitUntil, // same as ctx.waitUntil in existing Worker API
      next, // used for middleware or to fetch assets
      data, // arbitrary space for passing data between middlewares
    } = context;

    const lastChecked = await env.IsItBackYet.get('LAST_CHECKED')

    if (lastChecked === null) {
      return new Response("Value not found", { status: 404 })
    } else {
      return new Response(lastChecked)
    }
}

/*
const now = new Date()
  const lastChecked = Date.parse(localStorage.getItem('lastChecked')) || Date.parse('01 Jan 1970 00:00:00 GMT')

  let timeDiff = now - lastChecked
  timeDiff /= 1000

  if (timeDiff < 3600) {
    res.status(429).json({ 
      errorMessage: 'You already checked less than an hour ago, you can only check every hour.',
      lastTimeChecked: lastChecked.toISOString()
    })
  } else {
    return fetch('https://www.oat.ie/')    
      .then(response => response.text())
      .then(text => {
        if (/coming soon/i.test(text)) {
          res.status(200).json({ status: 'Still waiting :(' })
        } else {
          res.status(200).json({ status: 'Its back!' })
        }

        localStorage.setItem('lastChecked', now.toISOString())
      })
  }
*/