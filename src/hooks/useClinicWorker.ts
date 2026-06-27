import { useState, useEffect, useRef } from "react";
import usePatientData from "./usePatientData";
import { useClinicalStore } from "../store/useClinicalStore";
import { type WorkerOutputMessage } from "../workers/clinic.worker";

export default function useClinicWorker() {
    const { severityFilter } = useClinicalStore();
  
  // Fetch raw server payloads from your server hook
  const { data: rawPatients, isLoading: isNetworkLoading } = usePatientData();
  
  const [computedData, setComputedData] = useState<WorkerOutputMessage | null>(null);
  const [isComputing, setIsComputing] = useState(false);
  
  const workerRef = useRef<Worker | null>(null);
    useEffect(()=>{
        if(!rawPatients) return;

    setIsComputing(true);

    // Instantiate  background processing thread natively using Vite modules
    workerRef.current = new Worker(
      new URL('../workers/clinic.worker.ts', import.meta.url),
      { type: 'module' }
    );

    // 1. Handle incoming results back from  worker thread script
    workerRef.current.onmessage = (event: MessageEvent<WorkerOutputMessage>) => {
      setComputedData(event.data);
        setIsComputing(false);
    };

    // 2. Dispatch a message payload task down to  worker 
    workerRef.current.postMessage({ 
        patients: rawPatients, 
        severityFilter
     });

    // Clean up layer to abort processing on rapid UI changes
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
    },[rawPatients, severityFilter]);

    return { computedData, isLoading: isNetworkLoading || isComputing };
}