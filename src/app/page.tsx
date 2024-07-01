"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Table, Input, Button, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import base64 from "base-64";
import fetch from "isomorphic-fetch";
import AddPatient from "../components/AddPatient";
const HomePage: NextPage = () => {
  const [patientList, setPatientList] = useState<IPatient[]>([]);
  const [isUpdateName, setIsUpdateName] = useState<boolean>(false);
  const [patientToUpdate, setPatientToUpdate] = useState<IPatient>();
  const [newName, setNewName] = useState<string>("");
  const getPatientData = async () => {
    const username = "_system";
    const password = "sys";
    try {
      const response: IPatient[] = await (
        await fetch("http://localhost:52773/api/prototype/patients", {
          method: "GET",
          headers: {
            Authorization: "Basic " + base64.encode(username + ":" + password),
            "Content-Type": "application/json",
          },
        })
      ).json();
      setPatientList(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePatientName = async () => {
    let headers = new Headers();
    const username = "_system";
    const password = "sys";
    const PatientId = patientToUpdate?.PatientId;
    try {
      headers.set(
        "Authorization",
        "Basic " + base64.encode(username + ":" + password)
      );
      const response: {
        message: string;
        patient: { PatientId: number; Name: string };
      } = await (
        await fetch(
          `http://127.0.0.1:52773/api/prototype/patient/${PatientId}`,
          {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({ Name: newName }),
          }
        )
      ).json();
      let patientIndex = patientList.findIndex(
        (patient) => patient.PatientId == response.patient.PatientId
      );
      const newPatientList = patientList.slice();
      newPatientList[patientIndex] = {
        ...patientList[patientIndex],
        Name: response.patient.Name,
      };
      setPatientList(newPatientList);
      setPatientToUpdate(undefined);
      setNewName("");
      setIsUpdateName(false);
    } catch (error) {
      console.log(error);
    }
  };
  const columns: ColumnsType = [
    {
      title: "PatientId",
      dataIndex: "PatientId",
    },
    {
      title: "Title",
      dataIndex: "Title",
    },
    {
      title: "Name",
      dataIndex: "Name",
      render: (value, record, index) => {
        return (
          <div className="flex gap-3">
            <span>{value}</span>
            <span
              className="cursor-pointer"
              onClick={() => {
                setIsUpdateName(true);
                setPatientToUpdate(record);
              }}
            >
              <EditOutlined />
            </span>
          </div>
        );
      },
    },
    {
      title: "Gender",
      dataIndex: "Gender",
    },
    {
      title: "DOB",
      dataIndex: "DOB",
    },
    {
      title: "Ethnicity",
      dataIndex: "Ethnicity",
    },
    {
      title: "HN",
      dataIndex: "HN",
    },
  ];

  useEffect(() => {
    getPatientData();
  }, []);
  return (
    <div className="flex flex-col w-4/5 m-auto pt-10 gap-5">
      <AddPatient patientList={patientList} setPatientList={setPatientList} />
      <div className="min-h-screen">
        <Modal
          open={isUpdateName}
          footer={null}
          onCancel={() => {
            setIsUpdateName(false);
            setPatientToUpdate(undefined);
            setNewName("");
          }}
        >
          <div className="flex flex-col gap-5 pb-5">
            <div>
              <div className="text-2xl font-bold">
                Update name for patient {patientToUpdate?.PatientId}{" "}
              </div>
            </div>
            <div className="text-xl">
              Original Name: {patientToUpdate?.Name}
            </div>
            <div className="flex flex-row gap-2">
              <Input
                className="w-60"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
              />
              <Button type="primary" onClick={updatePatientName}>
                OK
              </Button>
              <Button
                onClick={() => {
                  setIsUpdateName(false);
                  setPatientToUpdate(undefined);
                  setNewName("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
        <div className="w-full flex justify-center">
          <div className="h-full w-full">
            {patientList.length > 0 && (
              <Table dataSource={patientList} columns={columns} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
