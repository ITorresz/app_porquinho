// types.ts
export type StatusSync = "rascunho" | "na_fila" | "sincronizado" | "erro";
export type Vistoria = {
  // <-- troque pela SUA entidade
  idLocal: string;
  equipamento: string;
  observacao?: string; // o "?" quer dizer: pode nao vir
  status: StatusSync;
};
// O texto que o USUARIO le (aula 08), nao o nome da variavel:
export function textoDoStatus(status: StatusSync): string {
  switch (status) {
    case "rascunho":
      return "Rascunho - nao enviado";
    case "na_fila":
      return "Salvo no aparelho";
    case "sincronizado":
      return "Enviado";
    case "erro":
      return "Falha ao enviar";
  }
}
