const baseApi = "https://data.stortinget.no/eksport/";

export async function stortingFetch<T>(endpoint: string): Promise<T> {
  const jsonFormat = endpoint.includes("?") ? "&format=json" : "?format=json";

  const response = await fetch(`${baseApi}${endpoint}${jsonFormat}`);

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}
