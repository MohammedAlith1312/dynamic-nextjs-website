"use client";
import React from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import { DynamicApi } from "../lib/dynamicApi";
import { useLocale } from "next-intl";
import { logEvent } from "../lib/gtag";

interface Employee {
  EmployeeName: string;
  EmployeeMobileNumber: string;
  EmployeeEmail: string;
}

interface FirstAidFormValues {
  CustomerName: string;
  Location: string;
  RequesterMobileNumber: string;
  Note: string;
  employees: Employee[];
}

export default function FirstAidTraining() {
  const locale = useLocale() as "ar" | "en";
  const isArabic = locale === "ar";
  const MAX_EMPLOYEES = 15;

  const texts = {
    company: isArabic ? "اسم الشركة" : "Company Name",
    location: isArabic ? "موقع الشركة" : "Location",
    requestedMobileNumber: isArabic ? "رقم الجوال" : "Requester Mobile Number",
    participant: isArabic ? "المشاركون" : "Participants",
    note: isArabic ? "ملاحظات" : "Note",
    submit: isArabic ? "إرسال" : "Submit",
    employeeName: isArabic ? "اسم الموظف" : "Employee Name",
    email: isArabic ? "البريد الإلكتروني" : "Email",
    mobileNumber: isArabic ? "رقم الجوال" : "Mobile Number",
    addParticipants: isArabic ? "أضف مشاركين" : "Add Participants",
    maxAlert: isArabic
      ? `يمكنك إضافة ${MAX_EMPLOYEES} مشاركًا فقط لكل نموذج. يرجى الإرسال والتسجيل مرة أخرى لإضافة المزيد.`
      : `You can only add ${MAX_EMPLOYEES} participants per form. Please submit and re-register to add more.`,
    mandatoryAlert: isArabic
      ? "يرجى ملء جميع الحقول الإلزامية"
      : "Please fill all mandatory fields",
    employeeAlert: isArabic
      ? "يرجى ملء جميع حقول المشاركين"
      : "Please fill all participant fields",
    success: isArabic
      ? "لقد تم تقديم طلب الإسعافات الأولية الخاص بك"
      : "Your First Aid request has been submitted!",
    error: isArabic
      ? "حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقا."
      : "Something went wrong. Please try again.",
  };

  const methods = useForm<FirstAidFormValues>({
    mode: "onSubmit",
    defaultValues: {
      CustomerName: "",
      Location: "",
      RequesterMobileNumber: "",
      Note: "",
      employees: [
        { EmployeeName: "", EmployeeMobileNumber: "", EmployeeEmail: "" },
      ],
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "employees",
  });

  
  const onError = (errors: any) => {
    if (
      errors.CustomerName ||
      errors.RequesterMobileNumber ||
      errors.Location ||
      errors.Note
    ) {
    Swal.fire({
  icon: "warning",
  title: "Warning",
  text: texts.mandatoryAlert,
  confirmButtonText: "OK",
  confirmButtonColor: "#3085d6",
});
    } else if (errors.employees) {
     Swal.fire({
  icon: "warning",
  title: "Warning",
  text: texts.mandatoryAlert,
  confirmButtonText: "OK",
  confirmButtonColor: "#3085d6",
});
    }
  };

 
const onSubmit = async (data: FirstAidFormValues) => {
  // --- Validation like old jQuery version ---
  if (!data.CustomerName || !data.RequesterMobileNumber || !data.Location || !data.Note) {
   Swal.fire({
  icon: "warning",
  title: "Warning",
  text: texts.mandatoryAlert,
  confirmButtonText: "OK",
  confirmButtonColor: "#3085d6",
});
    return;
  }

  let isValid = true;

  for (const emp of data.employees) {
    if (!emp.EmployeeName || !emp.EmployeeMobileNumber || !emp.EmployeeEmail) {
      Swal.fire({
  icon: "warning",
  title: "Warning",
  text: texts.mandatoryAlert,
  confirmButtonText: "OK",
  confirmButtonColor: "#3085d6",
});
      isValid = false;
      break;
    }
  }

  if (!isValid) return;

  // --- Proceed if all valid ---
  try {
    for (const emp of data.employees) {
      const FirstAidData = {
        EntityTypeId: 393,
        CustomerName: data.CustomerName,
        RequesterMobileNumber: data.RequesterMobileNumber,
        Location: data.Location,
        Note: data.Note,
        EmployeeName: emp.EmployeeName,
        EmployeeMobileNumber: emp.EmployeeMobileNumber,
        Email: emp.EmployeeEmail,
      };

      console.log("First Aid Request Data:", FirstAidData);
      logEvent("First_Aid_Request", FirstAidData);
      await DynamicApi(FirstAidData);
    }
Swal.fire({
  icon: "success",
  title: "Success",
  text: texts.success,
  confirmButtonText: "OK",
  confirmButtonColor: "#3085d6",
});
    reset();
  } catch (error) {
    console.error(error);
  Swal.fire({
  icon: "error",
  title: "Error",
  text: texts.error,
  confirmButtonText: "OK",
  confirmButtonColor: "#3085d6",
});
  }
};


  return (
    <div className="py-12 px-2 container mx-auto">
      <div className="py-5">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              
              <div className="mb-3">
                <label className="form-label">
                  {texts.company} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("CustomerName", { required: true })}
                  className="form-control"
                />
              </div>

              {/* Location */}
              <div className="mb-3">
                <label className="form-label">
                  {texts.location} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("Location", { required: true })}
                  className="form-control"
                />
              </div>

              {/* Requester Mobile */}
              <div className="mb-3">
                <label className="form-label">
                  {texts.requestedMobileNumber}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register("RequesterMobileNumber", { required: true })}
                  className="form-control"
                />
              </div>

              {/* Note */}
              <div className="mb-3">
                <label className="form-label">
                  {texts.note} <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  {...register("Note", { required: true })}
                  className="form-control"
                />
              </div>

              {/* Employees Section */}
              <label className="form-label">
                {texts.participant} <span className="text-red-500">*</span>
              </label>
              {fields.map((field, index) => (
                <div className="mb-2 flex gap-2 w-[90%]" key={field.id}>
                  <input
                    type="text"
                    placeholder={texts.employeeName}
                    {...register(
                      `employees.${index}.EmployeeName` as const,
                      { required: true }
                    )}
                    className="form-control"
                  />
                  <input
                    type="tel"
                    placeholder={texts.mobileNumber}
                    {...register(
                      `employees.${index}.EmployeeMobileNumber` as const,
                      { required: true }
                    )}
                    className="form-control"
                  />
                  <input
                    type="email"
                    placeholder={texts.email}
                    {...register(
                      `employees.${index}.EmployeeEmail` as const,
                      { required: true }
                    )}
                    className="form-control"
                  />
                  {index !== 0 && (
                    <button
                      type="button"
                      className="bg-[#dc3545] text-white px-6 py-2 border-2 hover:bg-[#dc3545] transition-all duration-300"
                      onClick={() => remove(index)}
                    >
                      ✖
                    </button>
                  )}
                </div>
              ))}

              {/* Add Participant */}
              {fields.length < MAX_EMPLOYEES && (
                <button
                  type="button"
                  className="btn bg-[#fdbd3f] text-white px-6 py-2 border-2 border-[#fdbd3f] hover:bg-transparent hover:text-[#fdbd3f] transition-all duration-300"
                  onClick={() =>
                    append({
                      EmployeeName: "",
                      EmployeeMobileNumber: "",
                      EmployeeEmail: "",
                    })
                  }
                >
                  ➕ {texts.addParticipants}
                </button>
              )}

              {fields.length >= MAX_EMPLOYEES && (
                <p className="text-red-500 fw-bold">{texts.maxAlert}</p>
              )}

              {/* Submit */}
              <div className="text-center mt-4 mb-4">
                <button
                  type="submit"
                  className="btn bg-[#fdbd3f] text-white px-6 py-2 border-2 border-[#fdbd3f] hover:bg-transparent hover:text-[#fdbd3f] transition-all duration-300"
                >
                  {texts.submit}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
