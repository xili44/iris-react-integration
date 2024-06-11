'use client'
import { NextPage } from "next"
import { useEffect, useState } from "react"
import { Table, Input, Button, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import base64 from 'base-64';
import fetch from 'isomorphic-fetch'
const HomePage: NextPage = () => {
  const [patientList, setPatientList] = useState<IPatient[]>([]);
  const [isUpdateName, setIsUpdateName] = useState<boolean>(false);
  const [patientToUpdate, setPatientToUpdate] = useState<IPatient>()
  const [newName, setNewName] = useState<string>('')
  const getPatientData = async () => {
    const username = '_system'
    const password = 'sys'
    try {
        const response: IPatient[] = await (await fetch("http://localhost:52773/api/prototype/patients", {
        method: "GET",
        headers: {
          "Authorization": 'Basic ' + base64.encode(username + ":" + password),
          "Content-Type": "application/json"
        },
      })).json()
      setPatientList(response);
    } catch (error) {
      console.log(error)
    }
  }

  const updatePatientName = async () => {
     let headers = new Headers()
    const username = '_system'
    const password = 'sys'
    const ID = patientToUpdate?.ID
    try {
      headers.set("Authorization", "Basic " + base64.encode(username + ":" + password))
      const response: { message: string, patient: { ID: number, Name: string } } =
        await (await fetch(`http://127.0.0.1:52773/api/prototype/patient/${ID}`, {
        method: "POST",
          headers: headers,
          body: JSON.stringify({Name: newName})
      })).json()
      let patientIndex = patientList.findIndex((patient) => patient.ID == response.patient.ID)
      const newPatientList = patientList.slice()
      newPatientList[patientIndex] = {...patientList[patientIndex], Name: response.patient.Name}
      setPatientList(newPatientList);
      setPatientToUpdate(undefined);
      setNewName('')
      setIsUpdateName(false)
    } catch (error) {
      console.log(error)
    }
  }
  const columns: ColumnsType = [
    {
      title: 'ID',
      dataIndex: 'ID',
    },
    {
      title: "Title",
      dataIndex: "Title"
    },
    {
       title: 'Name',
      dataIndex: 'Name',
      render: (value, record, index) => {
        return (
          <div className="flex gap-3">
            <span>{value}</span>
            <span className="cursor-pointer" onClick={() => {
              setIsUpdateName(true)
              setPatientToUpdate(record)
            }}><EditOutlined /></span>
          </div>
        )
      }
    },
    {
      title: "Gender",
      dataIndex: 'Gender'
    },
    {
      title: "DOB",
      dataIndex: "DOB"
    },
    {
      title: "Ethnicity",
      dataIndex: "Ethnicity"
    },
    {
      title: 'HN',
      dataIndex: "HN"
    }
  ]

  useEffect(() => {
    getPatientData();
  }, [])
  return (
    <>
      <div className="min-h-screen">
        <Modal open={isUpdateName} footer={null} onCancel={() => {
          setIsUpdateName(false);
          setPatientToUpdate(undefined);
          setNewName('')
        }}>
          <div className="flex flex-col gap-5 pb-5">
            <div>
              <div className="text-2xl font-bold">Update name for patient {patientToUpdate?.ID} </div>
            </div>
            <div className="text-xl">Original Name: { patientToUpdate?.Name}</div>
            <div className="flex flex-row gap-2">
              <Input className="w-60" value={newName} onChange={(event) => setNewName(event.target.value)} />
              <Button type="primary" onClick={updatePatientName}>OK</Button>
              <Button onClick={() => {
                setIsUpdateName(false)
                setPatientToUpdate(undefined);
                setNewName('')
              }}>Cancel</Button>
            </div>
          </div>
        </Modal>
      <div className="flex justify-center py-10">
        <div className="h-full w-4/5">
          {patientList.length > 0 && <Table dataSource={patientList} columns={columns}/>}
        </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
