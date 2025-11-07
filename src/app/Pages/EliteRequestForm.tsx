"use client";

import { FaPlus } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";
import Select from "react-select";
import { DynamicApi } from "../lib/dynamicApi";
import { useLocale } from "next-intl";

import { components } from "react-select";


const ClearIndicator = (props: any) => (
  <components.ClearIndicator {...props}>
    <FaTimes className="text-gray-500 hover:text-red-500 cursor-pointer" />
  </components.ClearIndicator>
);


interface EliteFormValues {
  name: string;
  mobile: string;
  email?: string;
  profession: string;
  nationality: string;
  otherNationality?: string;
  gender: string;
  ageFrom?: number;
  ageTo?: number;
  Langueges?: string;
  qualification?: string;
  housingType?: string;
  salary?: string;
  natureOfWork?: string;
}

export default function EliteRequestForm() {
  const locale = useLocale() as "ar" | "en";
  const isArabic = locale === "ar";

  const swalText = {
    warning: isArabic ? "!Fill all the fields" : "Fill all the fields!",
    success: isArabic
      ? "!Your request has been submitted successfully"
      : "Your request has been submitted successfully!",
  };

  const methods = useForm<EliteFormValues>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      profession: "",
      nationality: "",
      gender: "",
      Langueges: "",
      qualification: "",
      housingType: "",
      salary: "",
      natureOfWork: "",
    },
  });

  const { handleSubmit, register, watch, reset, setValue } = methods;
  const nationalityValue = watch("nationality");


  const professionOptions = [
      {value:" ",label:" "},
    { value: "Butler", label: "Butler" },
    { value: "House Master", label: "House Master" },
    { value: "Companion", label: "Companion" },
    { value: "Personal assistance", label: "Personal assistance" },
    { value: "Yacht Crew", label: "Yacht Crew" },
  ];

  const nationalityOptions = [
     {value:" ",label:" "},
    { value: "Russia", label: "Russia" },
    { value: "Finland", label: "Finland" },
    { value: "Ireland", label: "Ireland" },
    { value: "Poland", label: "Poland" },
    { value: "France", label: "France" },
    { value: "Portugal", label: "Portugal" },
    { value: "Albania", label: "Albania" },
    { value: "Georgia", label: "Georgia" },
    { value: "Brazil", label: "Brazil" },
    { value: "South Africa", label: "South Africa" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Philippines", label: "Philippines" },
    { value: "Other", label: "Other" },
  ];

  const genderOptions = [
     {value:" ",label:" "},
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const languageOptions = [
      {value:" ",label:" "},
    { value: "English", label: "English" },
    { value: "Arabic", label: "Arabic" },
  ];

  const qualificationOptions = [
      {value:" ",label:" "},
    { value: "High School", label: "High School" },
    { value: "Bachelor", label: "Bachelor" },
    { value: "Master Degree", label: "Master Degree" },
  ];

  const housingOptions = [
      {value:" ",label:" "},
    { value: "Live-in", label: "Live-in" },
    { value: "Live-out", label: "Live-out" },
  ];


  const onSubmit = async (data: EliteFormValues) => {
    if (
      !data.name ||
      !data.mobile ||
      !data.profession ||
      !data.nationality ||
      !data.gender ||
      (data.nationality === "Other" && !data.otherNationality)
    ) {
      Swal.fire("", `${swalText.warning}`, "warning");
      return;
    }

    try {
      const EliteData = {
        EntityTypeId: 258,
        Name: data.name,
        Mobile: data.mobile,
        Email: data.email || "",
        Profession: data.profession,
        Nationality:
          data.nationality === "Other"
            ? `Other - ${data.otherNationality}`
            : data.nationality,
        Gender: data.gender,
        AgeFrom: data.ageFrom,
        AgeTo: data.ageTo,
        Langueges: data.Langueges,
        Qualification: data.qualification,
        HousingType: data.housingType,
        Salary: data.salary,
        NatureofWork: data.natureOfWork,
      };

      console.log("Elite Request EliteData:", EliteData);

      await DynamicApi(EliteData);
      Swal.fire("Success", `${swalText.success}`, "success");
      reset();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div
      className="Elite-form container px-2 mx-auto py-16 bg-white"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <h4 className="text-center mb-6 text-2xl">ELITE REQUEST FORM</h4>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}
        className={`${isArabic ? "rtl" : "ltr"}`}>
          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input type="text" {...register("name")} className="form-control" />
          </div>

          {/* Mobile + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
            <div>
              <label className="block mb-1 font-medium">
                Mobile <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                {...register("mobile")}
                className="form-control"

              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email (Optional)</label>
              <input
                type="email"
                {...register("email")}
                className="form-control"
              />
            </div>
          </div>

          {/* Profession + Nationality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
            <div>
              <label className="block mb-1 font-medium">
                Profession <span className="text-red-500">*</span>
              </label>
              <div className="relative">
              <Select className="react-select"
                isClearable     
  components={{ ClearIndicator }} 
                instanceId="profession-select"
                options={professionOptions}
                
                value={professionOptions.find(
                  (o) => o.value === watch("profession")
                )}
                onChange={(opt) => setValue("profession", opt?.value || "")}
              
              
                placeholder=""
              />
               <span className="dropdown-toggle "></span>
               </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Nationality <span className="text-red-500">*</span>
              </label>
               <div className="relative">
              <Select
                          isClearable     
  components={{ ClearIndicator }} 
              instanceId="nationality-select"
                options={nationalityOptions}
                value={nationalityOptions.find(
                  (o) => o.value === watch("nationality")
                )}
                onChange={(opt) => setValue("nationality", opt?.value || "")}
              
              
                placeholder=""
              />
              <span className="dropdown-toggle "></span>
              </div>
              {nationalityValue === "Other" && (
                <input
                  type="text"
                  placeholder="Other Nationality"
                  {...register("otherNationality")}
                  className="form-control mt-2"
                />
              )}
            </div>
          </div>

          {/* Gender + Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
            <div>
              <label className="block mb-1 font-medium">
                Gender <span className="text-red-500">*</span>
              </label>
               <div className="relative">
              <Select
                          isClearable     
  components={{ ClearIndicator }} 
               instanceId="gender-select"
                options={genderOptions}
                value={genderOptions.find((o) => o.value === watch("gender"))}
                onChange={(opt) => setValue("gender", opt?.value || "")}
              
              
                placeholder=""
              />
              <span className="dropdown-toggle "></span>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Age</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="From"
                  {...register("ageFrom")}
                  className="form-control"
                />
                <input
                  type="number"
                  placeholder="To"
                  {...register("ageTo")}
                  className="form-control"
                />
              </div>
            </div>
          </div>

          {/* Languages + Qualification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
            <div>
              <label className="block mb-1 font-medium">Languages</label>
               <div className="relative">
              <Select
                          isClearable     
  components={{ ClearIndicator }} 
               instanceId="language-select"
                options={languageOptions}
                value={languageOptions.find(
                  (o) => o.value === watch("Langueges")
                )}
                onChange={(opt) => setValue("Langueges", opt?.value || "")}
              
              
                placeholder=""
              />
              <span className="dropdown-toggle "></span>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Qualification</label>
               <div className="relative">
              <Select
                          isClearable     
  components={{ ClearIndicator }} 
               instanceId="qualification-select"
                options={qualificationOptions}
                value={qualificationOptions.find(
                  (o) => o.value === watch("qualification")
                )}
                onChange={(opt) => setValue("qualification", opt?.value || "")}
              
              
                placeholder=""
              />
              <span className="dropdown-toggle "></span>
              </div>
            </div>
          </div>

          {/* Accommodation + Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
            <div>
              <label className="block mb-1 font-medium">Accommodation</label>
               <div className="relative">
              <Select
          isClearable     
  components={{ ClearIndicator }} 
               instanceId="accommodation-select"
                options={housingOptions}
                value={housingOptions.find(
                  (o) => o.value === watch("housingType")
                )}
                onChange={(opt) => setValue("housingType", opt?.value || "")}
              
              
                placeholder=""
              />
              <span className="dropdown-toggle "></span>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Salary</label>
              <input
                type="text"
                {...register("salary")}
                className="form-control"
              />
            </div>
          </div>

          {/* Nature of Work */}
          <div className="mb-6">
            <textarea
              rows={5}
              placeholder="Please provide us a brief about the nature of work..."
              {...register("natureOfWork")}
              className="form-control"
            ></textarea>
          </div>

          <div className="clearfix my-3">
            <span className="create_action">
              <button className="bg-amber-400">
                <i className="text-white">
                  <FaPlus />
                </i>
              </button>
            </span>
          </div>

          {/* Notice */}
          <div className="md:p-4 mb-6">
            <h6 className="text-lg mb-2">**Confidentiality Notice**</h6>
            <p className="text-lg">
              Please be assured that any information you provide to us will be
              treated with the utmost confidentiality. We are committed to
              maintaining the privacy and security of your personal data. Your
              trust is important to us, and we will take all necessary
              precautions to safeguard your information against unauthorized
              access, disclosure, or use.
            </p>
          </div>

          {/* Submit */}
          <div className="text-center mb-4">
            <button
              type="submit"
              className="btn bg-[#fdbd3f] text-white px-6 py-2 border-2 border-[#fdbd3f] hover:bg-transparent hover:text-[#fdbd3f] transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
