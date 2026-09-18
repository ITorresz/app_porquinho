// NovaVistoriaScreen.tsx
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { RootStackParamList } from "./App";
import { carregar, salvar } from "./armazenamento";
import type { Vistoria } from "./types";

type Props = NativeStackScreenProps<RootStackParamList, "NovaVistoria">;

export default function NovaVistoriaScreen({ navigation }: Props) {
  const [equipamento, setEquipamento] = useState("");
  const [observacao, setObservacao] = useState("");
  const [salvando, setSalvando] = useState(false);

  // Validação: obrigatório preencher o equipamento[cite: 5, 6]
  const podeSalvar = equipamento.trim().length > 0 && !salvando;

  async function gravar() {
    if (!podeSalvar) return;

    setSalvando(true);
    const nova: Vistoria = {
      idLocal: String(Date.now()),
      equipamento: equipamento.trim(),
      observacao: observacao.trim() || undefined,
      status: "na_fila",
    };

    const atuais = await carregar();
    await salvar([nova, ...atuais]);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Equipamento *</Text>
      <TextInput
        style={styles.input}
        value={equipamento}
        onChangeText={setEquipamento}
        placeholder="Ex: Compressor 1"
      />

      <Text style={styles.label}>Observação</Text>
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        value={observacao}
        onChangeText={setObservacao}
        placeholder="Detalhes opcionais..."
        multiline
      />

      <Pressable
        onPress={gravar}
        disabled={!podeSalvar}
        style={[
          styles.botao,
          { backgroundColor: podeSalvar ? "#166534" : "#9CA3AF" },
        ]}
      >
        <Text style={styles.botaoTexto}>
          {salvando ? "Salvando..." : "Salvar Vistoria"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  label: { fontSize: 14, fontWeight: "bold", marginBottom: 6, color: "#374151" },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  inputMultiline: { height: 80, textAlignVertical: "top" },
  botao: {
    minHeight: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  botaoTexto: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});