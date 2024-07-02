"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import authorization from "../constants/auth";
import AddPatient from "../components/AddPatient";
import PatientTable from "../components/AddPatient/PatientTable";
const HomePage: NextPage = () => {
  const [patientList, setPatientList] = useState<IPatient[]>([]);
  const getPatientData = async () => {
    try {
      ("use server");
      const response: IPatient[] = await (
        await fetch("http://localhost:52773/api/prototype/patients", {
          method: "GET",
          cache: "no-cache",
          headers: {
            Authorization: authorization,
            "Content-Type": "application/json",
          },
          next: {
            tags: ["patients"],
          },
        })
      ).json();
      setPatientList(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientData();
  }, []);
  return (
    <div className="flex flex-col w-4/5 m-auto pt-10 gap-5">
      <AddPatient getPatientData={getPatientData} />
      <PatientTable getPatientData={getPatientData} patientList={patientList} />
    </div>
  );
};

export default HomePage;
