export interface HttpResponse {
  readonly status: number;
  readonly body: string;
  readonly headers: Record<string, string>;
}

export interface HttpClient {
  post(url: string, headers: Record<string, string>, body: string): Promise<HttpResponse>;
}

export class FetchHttpClient implements HttpClient {
  async post(url: string, headers: Record<string, string>, body: string): Promise<HttpResponse> {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body,
    });
    return {
      status: res.status,
      body: await res.text(),
      headers: Object.fromEntries(res.headers.entries()),
    };
  }
}
