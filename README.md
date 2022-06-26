# [Is it back yet?](https://is-it-back-yet.com/)
A [React](https://reactjs.org/) website with a backend made with [Cloudflare Functions](https://developers.cloudflare.com/pages/platform/functions/) that checks if [Oat](https://www.oat.ie/) has re-opened or not.

## Frontend
The frontend is a [React](https://reactjs.org/) website, the source code is under [`/src`](./src/). Everything is contained in [`Home.js`](./src/Home.js).

## Backend
The backend is made with [Cloudflare Functions](https://developers.cloudflare.com/pages/platform/functions/), the source code is under [`/functions`](./functions/). There is a single endpoint `/api/check`, the source code is under [`/functions/api/check.js`](./functions/api/check.js).

It uses [Cloudflare's HTML Parser](https://blog.cloudflare.com/html-parsing-1/): [`HTMLRewriter`](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/) for parsing the [Oat](https://www.oat.ie/) website.
