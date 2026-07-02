export interface Encuesta {
  id: string;
  titulo: string;
  descripcion: string;
  estado: 'borrador' | 'activa' | 'finalizada';
  creadoPor: string;
  creadoEn: string;
  actualizadoEn: string;
  activadaEn: string | null;
  finalizadaEn: string | null;
}
