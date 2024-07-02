import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";
import { Modal, Button, Input, Table } from "antd";
import authorization from "../../../constants/auth";
type PatientTablePropsType = {
  patientList: IPatient[];
  getPatientData: () => Promise<void>;
};
const PatientTable: React.FC<PatientTablePropsType> = ({
  patientList,
  getPatientData,
}) => {
  const [isUpdateName, setIsUpdateName] = useState<boolean>(false);
  const [patientToUpdate, setPatientToUpdate] = useState<IPatient>();
  const [newName, setNewName] = useState<string>("");
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
  const updatePatientName = async () => {
    const PatientId = patientToUpdate?.PatientId;
    try {
      const response: {
        message: string;
        patient: { PatientId: number; Name: string };
      } = await (
        await fetch(
          `http://127.0.0.1:52773/api/prototype/patient/${PatientId}`,
          {
            method: "PUT",
            headers: {
              Authorization: authorization,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Name: newName }),
          }
        )
      ).json();
      getPatientData();
      setPatientToUpdate(undefined);
      setNewName("");
      setIsUpdateName(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
    </>
  );
};

export default PatientTable;
