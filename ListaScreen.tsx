// ListaScreen.tsx
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { RootStackParamList } from "./App";
import { carregar } from "./armazenamento";
import { ItemLista } from "./ItemLista";
import type { Vistoria } from "./types";

type Props = NativeStackScreenProps<RootStackParamList, "Lista">;

function ListaVazia() {
  return (
    <View style={styles.vazioContainer}>
      <Text style={styles.vazioTitulo}>Nenhuma vistoria encontrada.</Text>
      <Text style={styles.vazioSubtitulo}>
        Toque no botão abaixo para cadastrar a primeira vistoria.
      </Text>
    </View>
  );
}

export default function ListaScreen({ navigation }: Props) {
  const [registros, setRegistros] = useState<Vistoria[]>([]);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      async function buscarDados() {
        setCarregando(true);
        const dados = await carregar();
        if (ativo) {
          setRegistros(dados);
          setCarregando(false);
        }
      }

      buscarDados();

      return () => {
        ativo = false;
      };
    }, [])
  );

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Flamengo</Text>
      <Text style={styles.variante}>Variante B - Campo</Text>

      {carregando ? (
        <ActivityIndicator size="large" color="#166534" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={registros}
          keyExtractor={(item) => item.idLocal}
          renderItem={({ item }) => <ItemLista item={item} />}
          ListEmptyComponent={<ListaVazia />}
          contentContainerStyle={
            registros.length === 0 ? styles.listaVazia : undefined
          }
        />
      )}

      <Pressable
        onPress={() => navigation.navigate("NovaVistoria")}
        style={[styles.botao, { minHeight: 48, backgroundColor: "#166534" }]}
        accessibilityRole="button"
        accessibilityLabel="Nova vistoria"
      >
        <Text style={styles.botaoTexto}>+ Nova vistoria</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, paddingTop: 16, paddingHorizontal: 16, backgroundColor: "#fff" },
  titulo: { fontSize: 22, fontWeight: "bold" },
  variante: { fontSize: 14, color: "#666", marginBottom: 16 },
  listaVazia: { flexGrow: 1, justifyContent: "center", alignItems: "center" },
  vazioContainer: { padding: 24, alignItems: "center" },
  vazioTitulo: { fontSize: 16, fontWeight: "bold", color: "#374151", textAlign: "center" },
  vazioSubtitulo: { fontSize: 14, color: "#6B7280", textAlign: "center", marginTop: 8 },
  botao: { marginVertical: 16, borderRadius: 8, justifyContent: "center", alignItems: "center" },
  botaoTexto: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});