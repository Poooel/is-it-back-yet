import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css'

function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
