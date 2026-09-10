// Minimal shim for the Cloudflare Pages Functions types we actually use, so the
// project type-checks without pulling in @cloudflare/workers-types.
declare type PagesFunction<Env = unknown> = (context: {
  request: Request;
  env: Env;
  params: Record<string, string | string[]>;
  waitUntil: (promise: Promise<unknown>) => void;
}) => Response | Promise<Response>;

interface Body {
  json<T = unknown>(): Promise<T>;
}
