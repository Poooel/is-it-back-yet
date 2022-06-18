import sentryPlugin from "@cloudflare/pages-plugin-sentry";

export const onRequest = sentryPlugin({
  dsn: "https://211d54e586444016b5a16919caf58d75@o1292315.ingest.sentry.io/6513803",
});
