// armazenamento.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Vistoria } from "./types";

const CHAVE_STORAGE = "@flamengo_vistorias"; // Nome do seu app[cite: 5]

export async function carregar(): Promise<Vistoria[]> {
  try {
    const json = await AsyncStorage.getItem(CHAVE_STORAGE);
    return json != null ? JSON.parse(json) : [];
  } catch (error) {
    console.error("Erro ao carregar vistorias:", error);
    return [];
  }
}

export async function salvar(vistorias: Vistoria[]): Promise<void> {
  try {
    const json = JSON.stringify(vistorias);
    await AsyncStorage.setItem(CHAVE_STORAGE, json);
  } catch (error) {
    console.error("Erro ao salvar vistorias:", error);
  }
}