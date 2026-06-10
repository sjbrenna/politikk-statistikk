const baseApi = "https://data.stortinget.no/eksport/";
const jsonFormat = "&format=json";

export async function stortingFetch<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${baseApi}${endpoint}`);

    if (!response.ok) {
      throw new Error("API fetch failed");
    }
    return response.json() as Promise<T>;
  } catch (error) {
    return null;
  }
}
