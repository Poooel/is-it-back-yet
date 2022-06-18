// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
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
}
