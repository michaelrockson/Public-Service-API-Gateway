import axios from "axios";

interface ApiParams {
  [key: string]: string | number | boolean | undefined;
}

export class HttpService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly apiKeyName: string;

  constructor(apiUrl: string, apiKey: string, apiKeyName: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
    this.apiKeyName = apiKeyName;
  }

  /**
   * Fetches data from a public API endpoint.
   *
   * @param endpoint - API path segment, example: "weather" or "forecast".
   * @param params
   */
  public async makeApiRequest(endpoint?: string, params?: {}) {
    return await axios.get(`${this.apiUrl}/${endpoint}`, {
      params: {
        ...params,
        [this.apiKeyName]: this.apiKey,
      },
    });
  }

  /**
   * Normalizes errors from Axios requests and throws a readable Error.
   *
   * @param error - The caught error from an API request.
   */
  public handleServiceErrors(error: unknown): never {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `API request failed [${this.apiUrl}]: 
        ${error.response.status} 
        ${JSON.stringify(error.response.data)}`,
        );
      }

      if (error.request) {
        throw new Error(
          `API did not respond [${this.apiUrl}] (network/timeout)`,
        );
      }
    }
    throw new Error(
      `Unexpected error during API request [${this.apiUrl}]: 
    ${(error as Error).message}`,
    );
  }
}
