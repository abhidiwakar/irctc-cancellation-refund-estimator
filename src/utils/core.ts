import dayjs from "dayjs";
import { TRAIN_CLASSES } from "./constants";
import { Values } from "../types/core-form-values.type";
import { FormikValues } from "formik";

export const getFlatCancellationCharge = (classType: string) => {
  switch (classType) {
    case TRAIN_CLASSES[0]:
      return 240;
    case TRAIN_CLASSES[1]:
      return 200;
    case TRAIN_CLASSES[2]:
      return 180;
    case TRAIN_CLASSES[3]:
      return 120;
    case TRAIN_CLASSES[4]:
      return 60;
    default:
      return null;
  }
};

export const estimateRefund = (values: Values) => {
  const departureDate = dayjs(values.departureTime);
  const currentDate = dayjs();
  if (departureDate.diff(currentDate, "hours") > 48) {
    return getFlatCancellationCharge(values.class!);
  }

  if (
    departureDate.diff(currentDate, "hours") <= 48 &&
    departureDate.diff(currentDate, "hours") >= 12
  ) {
    const flatDeduction = getFlatCancellationCharge(values.class!);
    const deduction = Number(values.ticketPrice) * 0.25;
    return Math.max(flatDeduction ?? 0, deduction);
  }

  if (departureDate.diff(currentDate, "hours") >= 4) {
    const flatDeduction = getFlatCancellationCharge(values.class!);
    const deduction = Number(values.ticketPrice) * 0.5;
    return Math.max(flatDeduction ?? 0, deduction);
  }

  return 0;
};

export const handleFormValidation = (values: FormikValues) => {
  const errors: Record<string, string> = {};
  if (!values.class) {
    errors["class"] = "Please select class";
  }

  const price = Number(values.ticketPrice);
  if (isNaN(price) || price <= 0) {
    errors["ticketPrice"] = "Please enter ticket price";
  }

  const date = dayjs(values.departureTime);
  if (!date.isValid()) {
    errors["departureTime"] = "Please enter departure date & time";
  }
  return errors;
};
