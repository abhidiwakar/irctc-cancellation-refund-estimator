import { Formik, FormikHelpers, FormikValues } from "formik";
import { useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import Button from "./components/Button";
import Disclaimer from "./components/Disclaimer";
import Modal from "./components/Modal";
import Select from "./components/Select";
import TextInput from "./components/TextInput";
import { Values } from "./types/core-form-values.type";
import { TRAIN_CLASSES } from "./utils/constants";
import { estimateRefund, handleFormValidation } from "./utils/core";

const initialValues: Values = {
  departureTime: "",
  ticketPrice: "",
  class: "",
};

export default function App() {
  const [refundAmount, setRefundAmount] = useState(0);
  const disclaimerModalRef = useRef<HTMLDialogElement>(null);
  const refundAmountModalRef = useRef<HTMLDialogElement>(null);
  const trainClasses = useMemo(
    () => TRAIN_CLASSES.map((e) => ({ label: e, value: e })),
    []
  );

  const handleSubmit = (
    values: FormikValues,
    helper: FormikHelpers<Values>
  ) => {
    helper.resetForm();
    const refundAmount = estimateRefund(values);
    if (refundAmount === null) {
      toast.error("Failed to calculate estimated refund!");
      return;
    }

    setRefundAmount(refundAmount);
    refundAmountModalRef.current?.showModal();
  };

  const handleDisclaimerOpen = () => disclaimerModalRef.current?.showModal();

  return (
    <div className="flex flex-col items-center container p-4 h-screen">
      <div className="w-full max-w-md bg-white rounded-xl p-5 mt-10">
        <h1 className="text-3xl font-semibold text-center">
          Train e-Ticket cancellation refund estimator
        </h1>
        <Formik
          validate={handleFormValidation}
          onSubmit={(values, helper) => handleSubmit(values, helper)}
          initialValues={initialValues}
        >
          {({
            handleSubmit,
            getFieldProps,
            values,
            handleBlur,
            handleChange,
            errors,
          }) => (
            <form
              noValidate
              className="mt-10 flex flex-col gap-4 "
              onSubmit={handleSubmit}
            >
              <Select
                options={trainClasses}
                label="Select Class"
                name="class"
                value={values.class ?? ""}
                onBlur={handleBlur}
                onChange={handleChange}
                errorMessage={errors.class}
              />
              <TextInput
                placeholder="2000"
                label="Ticket Price"
                {...getFieldProps("ticketPrice")}
                prefix="₹"
                errorMessage={errors.ticketPrice}
              />
              <TextInput
                placeholder="12121"
                label="Departure Date & Time"
                {...getFieldProps("departureTime")}
                type="datetime-local"
                errorMessage={errors.departureTime}
              />
              <Button type="submit" label="Calculate Estimated Refund" />
            </form>
          )}
        </Formik>
        <Disclaimer
          variant="short"
          onReadmoreClick={handleDisclaimerOpen}
          className="text-xs text-center mt-5"
        />
      </div>
      <Modal ref={refundAmountModalRef} cancelButtonPosition="topRight">
        <div className="text-center">
          <p>Your estimated refund</p>
          <p className="text-4xl">
            {Intl.NumberFormat("en-US", {
              currency: "INR",
              style: "currency",
            }).format(refundAmount)}
          </p>
          <div className="divider"></div>
          <Disclaimer variant="short" className="text-xs text-center mt-5" />
        </div>
      </Modal>
      <Modal ref={disclaimerModalRef}>
        <Disclaimer className="text-xs" />
      </Modal>
    </div>
  );
}
