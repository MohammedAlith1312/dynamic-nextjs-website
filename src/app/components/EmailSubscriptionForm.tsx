"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";
import { DynamicApi } from "../lib/dynamicApi"; 
import { useLocale } from "next-intl";

// Form types
export interface FormValues {
  NewsType: string[];
  email: string;
  firstname?: string;
  lastname?: string;
  profession?: string;
  country?: string;
  
}

export default function EmailSubscriptionForm() {
  const locale = useLocale() as "ar" | "en";
   const isArabic = locale === "ar";
const texts = {
   
    checkLabel: isArabic ? "اختر من الخيارات أدناه لتلقي الأخبار والمعلومات المالية الأخرى عبر البريد الإلكتروني ": "Select from the options below to receive news and other financial information by email",
    checkbox1: isArabic ? "الإعلانات والنشرات الدورية" : "Announcements and Circulars",
      checkbox2: isArabic ? "التقويم المالي" : "Financial Calendar",
        checkbox3: isArabic ? "تنبيهات الأسهم (البريد الإلكتروني)" : "Share Alerts(Email)",
    Email: isArabic
      ? "البريد الإلكتروني"
      : "Email",
    FirstName: isArabic
      ? "الاسم الأول"
      : "First Name",
      LastName: isArabic
      ? "الأسم الأخير"
      : "Last Name",
       Subscribe: isArabic
      ? "الاشتراك"
      : " Subscribe",
    Error:  isArabic?"!please enter your email id and name":"please enter your email id and name!"
  };

  const methods = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      NewsType: [],
    },
  });

  const { handleSubmit, reset } = methods;

  // ✅ Submit logic
  const onSubmit = async (data: FormValues) => {
    try {
      const subscriber = {
        EntityTypeId: 381,
        Email: data.email,
        FirstName: data.firstname || "",
        LastName: data.lastname || "",
        NewsType: data.NewsType?.join(",") || "",
      };

      console.log("subscriber", subscriber);
      await  DynamicApi(subscriber);

      Swal.fire({
        title: "Thank you!",
        text: "Thank you for subscription.",
        icon: "success",
      });

      reset();
    } catch (error) {
      console.log("Something went wrong. Please try again later");
    }
  };

  // ✅ Error handler
  const onError = (errors: any) => {
    if (errors.email?.message) {
      Swal.fire({
        text: errors.email.message,
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl"  dir={isArabic ? "rtl" : "ltr"}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <p className="text-gray-600 mb-4">
           {texts.checkLabel}:
          </p>

          {/* ✅ Checkboxes */}
          <div className="space-y-2 mb-6 px-4">
            {[
              `${texts.checkbox1}`,
               `${texts.checkbox2}`,
               `${texts.checkbox3}`,
            ].map((label) => (
              <label key={label} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={label}
                  {...methods.register("NewsType")}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>

          {/* ✅ Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium text-gray-700"
            >
              {texts.Email} <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...methods.register("email", {
                required: `${texts.Error}`,
              })}
              className="form-control"
            />
          </div>

          {/* ✅ First Name */}
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block font-medium text-gray-700"
            >
               {texts.FirstName}
            </label>
            <input
              id="firstname"
              type="text"
              {...methods.register("firstname")}
              className="form-control"
            />
          </div>

          {/* ✅ Last Name */}
          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="block font-medium text-gray-700"
            >
              {texts.LastName}
            </label>
            <input
              id="lastname"
              type="text"
              {...methods.register("lastname")}
              className="form-control"
            />
          </div>

        
          <button
            type="submit"
            className="inline-block px-4 py-2 border-2 transition-all duration-300 bg-[#fdbd3f] border-[#fdbd3f] hover:bg-transparent hover:text-[#fdbd3f]"
          >
            {texts.Subscribe}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
