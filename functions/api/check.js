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

    try {
      let lastCheckedFromKV = await env.IsItBackYet.get('LAST_CHECKED')
      let lastChecked

      if (lastCheckedFromKV === null) {
        lastChecked = new Date()
      } else {
        lastChecked = new Date(lastCheckedFromKV)
      }
  
      const now = new Date()
  
      let timeDiff = now - lastChecked
      timeDiff /= 1000
  
      if (timeDiff < 3600) {
        return new Response(JSON.stringify({ 
          errorMessage: 'You already checked less than an hour ago, you can only check every hour.',
          lastTimeChecked: lastChecked.toISOString()
        }), { status: 429 })
      } else {
        const body = await fetch('https://www.oat.ie/')    
          .then(response => response.text())
          .then(text => {
            if (/coming soon/i.test(text)) {
              { status: 'Still waiting :(' }
            } else {
              { status: "It's back!" }
            }
          })
  
        await env.IsItBackYet.put('LAST_CHECKED', lastChecked.toISOString())
  
        return new Response(JSON.stringify(body))
      }
    } catch(e) {
      return new Response(JSON.stringify(e), { status: 500 })
    }
}
