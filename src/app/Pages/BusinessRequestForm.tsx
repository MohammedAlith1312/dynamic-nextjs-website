"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";
import { DynamicApi } from "../lib/dynamicApi";
import { useLocale } from "next-intl";
import { logEvent } from "../lib/gtag";

interface BusinessFormValues {
  companyname: string;
  phone: string;
  email?: string;
  note?: string;
}

export default function BusinessRequestForm() {
  const locale = useLocale() as "ar" | "en";
  const isArabic = locale === "ar";

  const texts = {
    title: isArabic ? "نموذج طلب عمل" : "BUSINESS REQUEST FORM",
    company: isArabic ? "اسم الشركة" : "Company Name",
    phone: isArabic ? "رقم الهاتف" : "Phone",
    email: isArabic ? "البريد الإلكتروني (اختياري)" : "Email (Optional)",
    note: isArabic ? "ملاحظة" : "Note",
    submit: isArabic ? "إرسال" : "Submit",
    swalText:isArabic?"!please enter the mandatory fields":"please enter the mandatory fields!"
   };

  const methods = useForm<BusinessFormValues>({
    mode: "onSubmit",
    defaultValues: {
      companyname: "",
      phone: "",
      email: "",
      note: "",
    },
  });

  const { handleSubmit, reset, register } = methods;

  const onSubmit = async (data: BusinessFormValues) => {
    try {
      const payload = {
        EntityTypeId: 385, 
        Companyname: data.companyname,
        Phone: data.phone,
        Email: data.email || "",
        Note: data.note || "",
      };

      console.log("Business Request Payload:", payload);

      // ✅ Track GA event safely
    logEvent("Business_Request", payload);

      await DynamicApi(payload);

      Swal.fire({
        title: "Thank you!",
        text: "your request has submitted",
        icon: "success",
      
      });

      reset();
    } catch (error) {
     console.log("Something went wrong. Please try again later");
    }
  };

  const onError = () => {
    Swal.fire({
      text:`${texts.swalText}`,
      icon: "warning",
      // confirmButtonText: "OK",
      // confirmButtonColor: "#3085d6",
    });
  };

  return (
    <div
      className="container mx-auto py-6 bg-white rounded-2xl"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <h4 className="text-center font-semibold text-xl mb-6">
        {texts.title}
      </h4>

      <div className="max-w-lg mx-auto">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {/* Company Name */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">
                {texts.company}
                <span className="text-red-500 mx-1">*</span>
              </label>
              <input
                type="text"
                className="form-control w-full border rounded px-3 py-2"
                {...register("companyname", { required: true })}
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">
                {texts.phone}
                <span className="text-red-500 mx-1">*</span>
              </label>
              <input
                type="tel"
                className="form-control w-full border rounded px-3 py-2"
                {...register("phone", { required: true })}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">{texts.email}</label>
              <input
                type="email"
                className="form-control w-full border rounded px-3 py-2"
                {...register("email")}
              />
            </div>

            {/* Note */}
            <div className="mb-4">
              <textarea
                rows={5}
                placeholder={texts.note}
                className="form-control w-full border rounded px-3 py-2"
                {...register("note")}
              ></textarea>
            </div>

            {/* Submit */}
            <div className="text-center mt-6 mb-6">
              <button
                type="submit"
                className="btn bg-[#fdbd3f] text-white px-6 py-2 border-2 border-[#fdbd3f]  hover:bg-transparent hover:text-[#fdbd3f] transition-all duration-300"
              >
                {texts.submit}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
