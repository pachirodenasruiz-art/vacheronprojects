export type ProjectStatus = 'en_curso' | 'planificacion' | 'paralizada' | 'finalizada';

export interface Project {
  id: string;
  code: string;
  name: string;
  client: string;
  location: string;
  manager: string;
  type: 'Residencial' | 'Comercial' | 'Obra Civil' | 'Reforma Integral' | 'Industrial';
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  plannedBudget: number;      // Presupuesto previsto de coste (CD + CI)
  targetContractValue: number; // Venta contratada al cliente
  actualCost: number;         // Coste real devengado acumulado
  certifiedAmount: number;    // Total certificado acumulado
  invoicedAmount: number;     // Total facturado
  collectedAmount: number;    // Total cobrado
  progressPercentage: number; // % avance físico
  cpi: number;                // Cost Performance Index (EV / AC)
  spi: number;                // Schedule Performance Index (EV / PV)
}

export type ResourceType = 'mano_obra' | 'material' | 'maquinaria' | 'subcontrata';

export interface DescompuestoItem {
  id: string;
  code: string;
  type: ResourceType;
  description: string;
  unit: string;
  yield: number; // Rendimiento por unidad de partida
  unitPrice: number;
  totalCost: number;
}

export interface Partida {
  id: string;
  chapterId: string;
  code: string;
  description: string;
  unit: string;
  plannedQuantity: number;
  plannedUnitPrice: number;
  plannedTotal: number;
  executedQuantity: number;
  certifiedQuantity: number;
  actualUnitPrice: number;
  realTotalCost: number;
  status: 'pendiente' | 'en_progreso' | 'ejecutada' | 'certificada';
  descompuestos?: DescompuestoItem[];
}

export interface Chapter {
  id: string;
  code: string;
  name: string;
  plannedTotal: number;
  realTotalCost: number;
  certifiedTotal: number;
  partidas: Partida[];
}

export interface GanttTask {
  id: string;
  projectId: string;
  name: string;
  code: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  progress: number;
  dependencies: string[]; // IDs of predecessor tasks
  isCritical: boolean;
  assignedResource: string;
  status: 'completada' | 'en_curso' | 'retrasada' | 'no_iniciada';
}

export interface Certification {
  id: string;
  number: number;
  projectId: string;
  projectName: string;
  period: string;
  date: string;
  totalToDate: number;
  previousCertification: number;
  currentCertification: number;
  retentionRate: number; // e.g. 5%
  retentionAmount: number;
  netPayable: number;
  status: 'borrador' | 'enviada' | 'aprobada' | 'facturada';
}

export interface WorkLog {
  id: string;
  date: string;
  workerName: string;
  category: string;
  hours: number;
  hourlyRate: number;
  totalCost: number;
  partidaCode: string;
  partidaName: string;
  notes: string;
}

export interface Subcontract {
  id: string;
  contractorName: string;
  cif: string;
  scope: string;
  contractAmount: number;
  certifiedAmount: number;
  pendingAmount: number;
  retentionHeld: number;
  progress: number;
  status: 'activo' | 'completado' | 'en_revision';
}

export interface MachineryLog {
  id: string;
  machineName: string;
  code: string;
  type: 'propia' | 'alquiler';
  supplier?: string;
  hoursWorked: number;
  hourlyCost: number;
  fuelCost: number;
  totalCost: number;
  currentLocation: string;
  status: 'operativa' | 'mantenimiento' | 'parada';
}

export interface PurchaseItem {
  id: string;
  materialCode: string;
  description: string;
  quantity: number;
  unit: string;
  targetPrice: number;
  bestQuotation: number;
  selectedSupplier: string;
  status: 'solicitado' | 'cotizado' | 'ordenado' | 'recibido_obra';
}

export interface SupplierComparison {
  id: string;
  material: string;
  quantity: number;
  unit: string;
  offers: {
    supplierName: string;
    unitPrice: number;
    totalPrice: number;
    deliveryDays: number;
    rating: number;
    selected: boolean;
  }[];
}

export interface WarehouseStock {
  id: string;
  code: string;
  name: string;
  category: string;
  location: string; // e.g. "Almacén Central Madrid" o "Obra Castellana"
  currentStock: number;
  minStock: number;
  unit: string;
  valuation: number;
  status: 'ok' | 'bajo_minimo' | 'excedente';
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  type: 'emitida' | 'recibida';
  counterpartName: string;
  cif: string;
  date: string;
  dueDate: string;
  taxBase: number;
  vatRate: number;
  vatAmount: number;
  total: number;
  status: 'pagada' | 'pendiente' | 'vencida';
  veriFactuHash: string;
  previousRecordHash: string;
  isVeriFactuCompliant: boolean;
  qrToken: string;
}

export interface FinancialThreeAxisPoint {
  period: string;
  pv: number; // Planned Value (Presupuesto Previsto)
  ac: number; // Actual Cost (Coste Real)
  ev: number; // Earned Value (Valor Ganado / Certificado)
}
