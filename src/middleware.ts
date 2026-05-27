export interface RequestContext {
  endpoint: string;
  body: string;
  headers: Record<string, string>;
}

export interface Middleware {
  name: string;
  onRequest?: (ctx: RequestContext) => RequestContext | Promise<RequestContext>;
  onResponse?: (response: Response, ctx: RequestContext) => Response | Promise<Response>;
  onError?: (error: Error, ctx: RequestContext) => void | Promise<void>;
}
