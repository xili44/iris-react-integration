import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import base64 from "base-64";

type AddPatientPropsType = {
  patientList: IPatient[];
  setPatientList: (patients: IPatient[]) => void;
};
const AddPatient: React.FC<AddPatientPropsType> = ({
  patientList,
  setPatientList,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleSubmitForm = async (values: any) => {
    let headers = new Headers();
    const username = "_system";
    const password = "sys";
    values.DOB = dayjs(values.DOB).format("YYYY-MM-DD");
    headers.set(
      "Authorization",
      "Basic " + base64.encode(username + ":" + password)
    );
    await (
      await fetch("http://localhost:52773/api/prototype/patient", {
        method: "POST",
        body: JSON.stringify(values),
        headers: headers,
      })
    ).json();
    window.location.reload();
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 10 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 20 },
      sm: { span: 26 },
    },
  };
  const TitleOptions = [
    "Mr",
    "Ms",
    "Mrs",
    "Dr",
    "Prof",
    "Rev",
    "Honorable",
  ].map((item) => {
    return { value: item, label: item };
  });
  return (
    <div className="flex justify-end">
      <Modal open={isOpen} footer={null} onCancel={() => setIsOpen(false)}>
        <div className="text-xl font-semibold">Add New Patient</div>
        <Form
          {...formItemLayout}
          onFinish={handleSubmitForm}
          className="pt-8"
          variant="filled"
        >
          <Form.Item name="Name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="Title" label="Title">
            <Select options={TitleOptions} />
          </Form.Item>
          <Form.Item name="Gender" label="Gender">
            <Select
              options={[
                { value: "Female", label: "Female" },
                { value: "Male", label: "Male" },
              ]}
            />
          </Form.Item>
          <Form.Item name="DOB" label="Birthday">
            <DatePicker />
          </Form.Item>
          <Form.Item name="Ethnicity" label="Ethnicity">
            <Input />
          </Form.Item>
          <Form.Item name="HN" label="HN">
            <Input.OTP length={10} />
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              Add Patient
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button
        onClick={() => setIsOpen(true)}
        type="primary"
        className="font-bold"
      >
        Add New Patient
      </Button>
    </div>
  );
};

export default AddPatient;
