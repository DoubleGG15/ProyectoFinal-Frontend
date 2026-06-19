export type UserRole =
  | 'admin'
  | 'mediador'
  | 'ciudadano'
  | 'Mediador'
  | 'Ciudadano'
  | 'Admin';

export type ConflictStatus=
  |'nuevo' | 'asignado' | 'en mediacion' | 'resuelto' | 'cerrado sin acuerdo';

export type ConflictType=
  |'ruido'|'limites'|'areas comunes'|'mascotas'|'otros';

export type SessionStatus= 'programada' | 'realizada' | 'reprogramada' ;

export type SessionModality ='presencial' | 'virtual';

export type ComplienceStatus='pendiente'|'cumplido'| 'incumplido';

export interface User{
  uid:string;
  email:string;
  fullname:string;
  address:string;
  role:UserRole;
  zoneId?:string;
  createdAt:string;
  isActive:boolean;
}

export interface Mediator{
  uid:string;
  email:string;
  fullname:string;
  coverageZone: string;
  speciality: ConflictType[];
  availability:boolean;
  activeCasesCount:number;
  isActive:boolean;
}

export interface ConflictCase {
  id: string;
  reporterId: string;
  reporterName: string;
  respondentId: string;
  respondentName: string;
  conflictType: ConflictType;
  description: string;
  address: string;
  status: ConflictStatus;
  mediatorId?: string;
  evidenceUrls: string[];
  assignedAt?: string;
  closedAt?: string;
}



export interface MediationSession {
  id: string;
  caseId: string;
  mediatorId: string;
  scheduledDate: string; // Formato YYYY-MM-DD
  scheduledTime: string; // Formato hh:mm (24h)
  modality: SessionModality;
  meetingLink?: string;
  status: SessionStatus;
  sessionNotes?: string;
  createdAt: string;
}

export interface AgreementPoint{
  id: string;
  description: string;
  deadline: string;
  complianceStatus:ComplienceStatus
}

export interface Agreement{
  id: string;
  caseId: string;
  mediatorId: string;
  agreementText: string;
  points: AgreementPoint[];
  confirmedByReporter: boolean;
  confirmedByRespondent: boolean;
  formalizedAt?: string;
  isImmutable: boolean;
}

export interface CaseStatistics {
  totalRegistered: number;
  totalActive: number;
  totalResolved: number;
  totalUnassigned: number;
  resolvedPercentageByMediator: { [mediatorId: string]: number };
  resolvedPercentageByZone: { [zoneName: string]: number };
  averageResolutionTimeDaysByType: { [type in ConflictType]?: number };
  casesByStatus: { [status in ConflictStatus]: number };
  casesByType: { [type in ConflictType]: number };
  monthlyTrend: {
    month: string;
    registered: number;
    resolved: number;
  }[];
}
