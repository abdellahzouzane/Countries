import { create } from "zustand";
import axios from "axios";
 
export const useStore = create((set) => ({
  countries: [],
  searchQuery: "",
  selectedRegion: "All",
  loading: true,
  fetchCountries: async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countryData = response.data.map((country) => ({
        name: country.name.common,
        capital: country.capital ? country.capital[0] : "N/A",
        population: country.population,
        flag: country.flags.png,
        region: country.region,
      }));
      set({ countries: countryData, loading: false });
    } catch (error) {
      console.error("Erreur lors de la récupération des pays :", error);
      set({ loading: false });
    }
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedRegion: (region) => set({ selectedRegion: region }),
}));