// ItemLista.tsx
import { StyleSheet, Text, View } from "react-native";
import type { StatusSync, Vistoria } from "./types";

const ESTADO: Record<StatusSync, { texto: string; cor: string }> = {
  rascunho: { texto: "Rascunho", cor: "#6B7280" },
  na_fila: { texto: "Salvo no aparelho", cor: "#B45309" },
  sincronizado: { texto: "Enviado", cor: "#166534" },
  erro: { texto: "Falha ao enviar", cor: "#B91C1C" },
};

function Badge({ status }: { status: StatusSync }) {
  const { texto, cor } = ESTADO[status] ?? {
    texto: status,
    cor: "#6B7280",
  };

  return (
    <View style={[styles.badge, { backgroundColor: cor }]}>
      <Text style={styles.badgeTexto}>{texto}</Text>
    </View>
  );
}

type Props = { item: Vistoria };

export function ItemLista({ item }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.titulo}>{item.equipamento}</Text>
        <Text style={styles.detalhe}>
          {item.observacao ?? "Sem observação"}
        </Text>
      </View>
      <Badge status={item.status} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  detalhe: {
    fontSize: 13,
    color: "#666666",
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeTexto: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
});