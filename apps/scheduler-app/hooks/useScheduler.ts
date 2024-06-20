import { useEffect } from "react";
import { initializeScheduler } from "../actions/scheduler";

export const useScheduler = async () => {
    useEffect(() =>{
        initializeScheduler()
      },[])
};