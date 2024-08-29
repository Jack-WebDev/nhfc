"use client";



import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeft,

} from "lucide-react";
import { TabComponent } from "./Tabs";


type RegisterRiskSChema = {
  id: string;
  priority: string;
  riskType: string;
  description: string;
  riskOwner: string;
};

export default function ViewRiskRegister() {
  const params = useParams();
  const riskRegisterID = params.id;
  const [riskRegisterData, setRiskRegisterData] = useState<
    RegisterRiskSChema[]
  >([]);
  const router = useRouter();
  // console.log(loanData);

  useEffect(() => {
    const fetchRiskRegisterData = async () => {
      const res = await axios.get(`/api/erm/${riskRegisterID}`);
      const usersData = await res.data;
      setRiskRegisterData(usersData);
    };

    fetchRiskRegisterData();
  }, [riskRegisterID]);


  return (
    <>
      <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
      <TabComponent data={riskRegisterData} />

    </>
  );
}
