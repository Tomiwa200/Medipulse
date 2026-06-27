import { useQuery } from "@tanstack/react-query";
import { useClinicalStore } from "../store/useClinicalStore";


export interface Patient {
    id: string;
    name: string;
    age: number;
    ward: string;
    heartRate: number;
    bloodPressure: string;
    condition: string;
    severity: 'CRITICAL' | 'STABLE';
}

export default function usePatientData() {
    const { activeWard } = useClinicalStore();


     return   useQuery<Patient[]>({
            queryKey: ['patients', activeWard],
            queryFn: async () => {
                const res = await fetch(`http://localhost:3001/patients?ward=${activeWard}`);

                if (!res.ok) {
                    throw new Error('Clinical Database offline');
                }
                return res.json();
            },
            placeholderData: (previousData) => previousData,
        });
    
}