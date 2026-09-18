import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ItemLista } from "./ItemLista";
import type { Vistoria } from "./types";

const REGISTROS: Vistoria[] = [
  { idLocal: "1", equipamento: "Neymar", status: "sincronizado" },
  { idLocal: "2", equipamento: "Painel A2", status: "na_fila" },
  { idLocal: "3", equipamento: "Compressor 1", status: "erro" },
];

type Tela = "inicio" | "vistorias";

export default function App() {
  const [telaAtual, setTelaAtual] = useState<Tela>("inicio");

  const sincronizados = REGISTROS.filter(
    (item) => item.status === "sincronizado"
  ).length;

  const pendentes = REGISTROS.filter(
    (item) => item.status === "na_fila"
  ).length;

  const comErro = REGISTROS.filter(
    (item) => item.status === "erro"
  ).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />

      {telaAtual === "inicio" ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Header titulo="Flamengo" subtitulo="Resumo da operação" />

          <View style={styles.syncCard}>
            <View style={styles.syncIcon}>
              <Text style={styles.syncIconText}>✓</Text>
            </View>

            <View style={styles.syncContent}>
              <Text style={styles.syncTitle}>Tudo sob controle</Text>
              <Text style={styles.syncDescription}>
                Dados sincronizados recentemente
              </Text>
            </View>

            <Text style={styles.onlineText}>Online</Text>
          </View>

          <Text style={styles.sectionTitle}>Visão geral</Text>

          <View style={styles.cardsRow}>
            <InfoCard
              valor={String(sincronizados)}
              titulo="Sincronizados"
              cor="#ECFDF5"
              destaque="#16A34A"
            />

            <InfoCard
              valor={String(pendentes)}
              titulo="Na fila"
              cor="#FFF7ED"
              destaque="#EA580C"
            />
          </View>

          <View style={styles.cardsRow}>
            <InfoCard
              valor={String(comErro)}
              titulo="Com erro"
              cor="#FEF2F2"
              destaque="#DC2626"
            />

            <InfoCard
              valor={String(REGISTROS.length)}
              titulo="Equipamentos"
              cor="#EEF2FF"
              destaque="#4F46E5"
            />
          </View>

          <Text style={styles.sectionTitle}>Acesso rápido</Text>

          <Pressable
            style={styles.actionCard}
            onPress={() => setTelaAtual("vistorias")}
          >
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>▣</Text>
            </View>

            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Ver todas as vistorias</Text>
              <Text style={styles.actionDescription}>
                Consulte os equipamentos cadastrados
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable style={styles.actionCard}>
            <View style={[styles.actionIcon, styles.purpleIcon]}>
              <Text style={styles.actionIconText}>+</Text>
            </View>

            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Nova vistoria</Text>
              <Text style={styles.actionDescription}>
                Registre um novo equipamento em campo
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </ScrollView>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Header titulo="Vistorias" subtitulo="Equipamentos cadastrados" />

          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{REGISTROS.length}</Text>
            <View>
              <Text style={styles.summaryTitle}>Vistorias registradas</Text>
              <Text style={styles.summaryDescription}>
                Acompanhe o status de cada equipamento
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Lista de equipamentos</Text>

          <View style={styles.list}>
            {REGISTROS.map((registro) => (
              <ItemLista key={registro.idLocal} item={registro} />
            ))}
          </View>

          <Pressable style={styles.newButton}>
            <Text style={styles.newButtonIcon}>+</Text>
            <Text style={styles.newButtonText}>Adicionar vistoria</Text>
          </Pressable>
        </ScrollView>
      )}

      <View style={styles.bottomBar}>
        <TabButton
          ativo={telaAtual === "inicio"}
          icone="⌂"
          titulo="Início"
          onPress={() => setTelaAtual("inicio")}
        />

        <TabButton
          ativo={telaAtual === "vistorias"}
          icone="▣"
          titulo="Vistorias"
          onPress={() => setTelaAtual("vistorias")}
        />
      </View>
    </View>
  );
}

function Header({
  titulo,
  subtitulo,
}: {
  titulo: string;
  subtitulo: string;
}) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>OPERAÇÃO DE CAMPO</Text>
        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.subtitle}>{subtitulo}</Text>
      </View>

      <View style={styles.profile}>
        <Text style={styles.profileText}>FC</Text>
      </View>
    </View>
  );
}

function InfoCard({
  valor,
  titulo,
  cor,
  destaque,
}: {
  valor: string;
  titulo: string;
  cor: string;
  destaque: string;
}) {
  return (
    <View style={[styles.infoCard, { backgroundColor: cor }]}>
      <Text style={[styles.infoValue, { color: destaque }]}>{valor}</Text>
      <Text style={styles.infoTitle}>{titulo}</Text>
    </View>
  );
}

function TabButton({
  ativo,
  icone,
  titulo,
  onPress,
}: {
  ativo: boolean;
  icone: string;
  titulo: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.tabButton} onPress={onPress}>
      <Text style={[styles.tabIcon, ativo && styles.activeTab]}>{icone}</Text>
      <Text style={[styles.tabText, ativo && styles.activeTab]}>
        {titulo}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    backgroundColor: "#111827",
    paddingTop: 58,
    paddingHorizontal: 22,
    paddingBottom: 58,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eyebrow: {
    color: "#A7F3D0",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.4,
    marginBottom: 8,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
  },
  subtitle: {
    color: "#CBD5E1",
    fontSize: 14,
    marginTop: 5,
  },
  profile: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#6EE7B7",
  },
  profileText: {
    color: "#A7F3D0",
    fontWeight: "800",
  },
  syncCard: {
    marginHorizontal: 18,
    marginTop: -30,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },
  syncIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  syncIconText: {
    color: "#16A34A",
    fontSize: 22,
    fontWeight: "800",
  },
  syncContent: {
    flex: 1,
  },
  syncTitle: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
  },
  syncDescription: {
    color: "#6B7280",
    fontSize: 11,
    marginTop: 4,
  },
  onlineText: {
    color: "#15803D",
    fontSize: 11,
    fontWeight: "800",
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 28,
    marginBottom: 14,
    paddingHorizontal: 18,
  },
  cardsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  infoCard: {
    flex: 1,
    minHeight: 110,
    borderRadius: 18,
    padding: 16,
    justifyContent: "space-between",
  },
  infoValue: {
    fontSize: 32,
    fontWeight: "800",
  },
  infoTitle: {
    color: "#4B5563",
    fontSize: 12,
    fontWeight: "700",
  },
  actionCard: {
    marginHorizontal: 18,
    marginBottom: 12,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  purpleIcon: {
    backgroundColor: "#EDE9FE",
  },
  actionIconText: {
    color: "#4F46E5",
    fontSize: 22,
    fontWeight: "800",
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "800",
  },
  actionDescription: {
    color: "#6B7280",
    fontSize: 11,
    marginTop: 4,
  },
  arrow: {
    color: "#9CA3AF",
    fontSize: 28,
  },
  summaryCard: {
    marginHorizontal: 18,
    marginTop: -30,
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },
  summaryNumber: {
    color: "#4F46E5",
    fontSize: 36,
    fontWeight: "800",
    marginRight: 16,
  },
  summaryTitle: {
    color: "#111827",
    fontWeight: "800",
    fontSize: 15,
  },
  summaryDescription: {
    color: "#6B7280",
    fontSize: 11,
    marginTop: 4,
  },
  list: {
    gap: 10,
    paddingHorizontal: 18,
  },
  newButton: {
    margin: 18,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#111827",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  newButtonIcon: {
    color: "#A7F3D0",
    fontSize: 22,
    marginRight: 8,
  },
  newButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 76,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  tabIcon: {
    color: "#9CA3AF",
    fontSize: 24,
    marginBottom: 3,
  },
  tabText: {
    color: "#9CA3AF",
    fontSize: 11,
    fontWeight: "700",
  },
  activeTab: {
    color: "#4F46E5",
  },
});