const baseApi = "https://data.stortinget.no/eksport/";

export async function stortingFetch<T>(endpoint: string): Promise<T | null> {
  try {
    let jsonFormat;
    endpoint.includes("?")
      ? (jsonFormat = "&format=json")
      : (jsonFormat = "?format=json");

    const response = await fetch(`${baseApi}${endpoint}${jsonFormat}`);

    if (!response.ok) {
      throw new Error("API fetch failed");
    }
    return response.json() as Promise<T>;
  } catch (error) {
    return null;
  }
}
