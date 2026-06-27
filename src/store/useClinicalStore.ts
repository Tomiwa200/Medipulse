import { create} from 'zustand';

export type HospitalWard = 'EMERGENCY_ROOM' | 'ICU' | 'PEDIATRICS' | 'CARDIOLOGY';
export type TriageSeverity = 'ALL' | 'CRITICAL' | 'STABLE';

interface ClinicalState {
    activeWard : HospitalWard;
    severityFilter : TriageSeverity;
    selectedPatientId : string | null ;
    setActiveWard : (ward:HospitalWard) => void;
    setSeverityFilter : (filter:TriageSeverity) => void;
    setSelectedPatientId : (id:string | null) => void; 
}

export const useClinicalStore = create<ClinicalState>((set) => ({
    activeWard: 'EMERGENCY_ROOM',
    severityFilter: 'ALL',
    selectedPatientId: null,
    setActiveWard: (newWard) =>set({activeWard: newWard, selectedPatientId:null}), 
    setSeverityFilter: (filter) => set({severityFilter:filter}),
    setSelectedPatientId : (id) => set({selectedPatientId:id})
}))