// ItemLista.tsx
import { StyleSheet, Text, View } from "react-native";
import type { Vistoria } from "./types"; // so o TIPO
import { textoDoStatus } from "./types"; // a FUNCAO
type Props = { item: Vistoria };
export function ItemLista({ item }: Props) {
  return (
    <View style={styles.item}>
      <Text style={styles.titulo}>{item.equipamento}</Text>
      <Text style={styles.status}>{textoDoStatus(item.status)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  titulo: { fontSize: 16, fontWeight: "bold" },
  status: { fontSize: 13, color: "#666" },
});
