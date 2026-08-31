"use client";

import { Check, CircleX, ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  onClose: () => void;
};

const industries = [
  "Power & Utilities",
  "Oil & Gas",
  "Construction & Infra",
  "Railways & Metro",
  "Mining & Metals",
  "Renewable Energy",
  "Telecom & Broadband",
  "Shipbuilding & Marine",
  "Defence & Aerospace",
  "Steel & Cement Plants",
];

const cableProducts = [
  "Power Cables",
  "Control Cables",
  "Instrumentation Cables",
  "Fire Survival Cables",
  "Solar Cables",
  "Flexible Cables",
  "Armoured Cables",
  "Submersible Cables",
  "Communication Cables",
  "Specialty Cables",
];

export default function ConnectStepForm({ onClose }: Props) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    industries: [] as string[],
    cables: [] as string[],
    specifications: "",
    timeline: "",
  });

  const totalSteps = 4;

  const toggleIndustry = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      industries: prev.industries.includes(item)
        ? prev.industries.filter((x) => x !== item)
        : [...prev.industries, item],
    }));
  };

  const toggleCable = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      cables: prev.cables.includes(item)
        ? prev.cables.filter((x) => x !== item)
        : [...prev.cables, item],
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    } else {
      setStep(5);
    }
  };

  const previousStep = () => {
    if (step > 1 && step <= totalSteps) {
      setStep((prev) => prev - 1);
    }
  };

  const progress = step === 5 ? 100 : (step / totalSteps) * 100;

  return (
    <div className="fixed inset-0 z-[999999999] flex items-center justify-center bg-black/50 p-4 md:p-5">

      <div className="relative flex w-full max-w-[900px] overflow-hidden rounded-[18px] bg-white shadow-2xl">

        {/* ================= LEFT PANEL ================= */}
        <div className="relative hidden w-[40%] shrink-0 overflow-hidden 
        bg-[url('/assets/rpggroup/hoverbg.jpg')]
    bg-cover
    bg-center
    transition-all duration-500 p-9 text-white md:block">

          {/* Logo */}
          <img
            src="/assets/footer-logo.png"
            alt="Asian Cables"
            className="w-[120px]"
          />

          <div className="mt-12">
            <h2 className="font-[Magistral] text-[32px] font-bold italic leading-[1]">
              Let's Connect
            </h2>

            <p className="mt-5 max-w-[240px] font-[Work_Sans] text-[14px] leading-[21px] text-white/90">
              Partner with India's most respected industrial house to power your
              critical infrastructure.
            </p>
          </div>

          {/* Bottom Contact */}
          <div className="absolute bottom-10 left-9">
            <p className="text-[12px] text-white/80">
              Technical Support Desk
            </p>

            <p className="mt-1 text-[16px] font-semibold">
              +91 22 1234 5678
            </p>
          </div>
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="relative min-h-[520px] flex-1 p-7 md:p-9">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 cursor-pointer text-[#767676] transition hover:text-[#1E3C8C]"
          >
        
            <CircleX size={16} />
          </button>

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <div className="animate-[fadeStep_0.35s_ease-out]">
              <StepHeading
                title="Tell Us About Yourself"
                subtitle="Required fields are marked with an asterisk (*)"
              />

              <div className="mt-6 space-y-4">

                <Input
                  label="Full Name *"
                  placeholder="Jane Doe"
                  value={formData.fullName}
                  onChange={(value) =>
                    setFormData({ ...formData, fullName: value })
                  }
                />

                <Input
                  label="Business Email *"
                  placeholder="jane@company.com"
                  type="email"
                  value={formData.email}
                  onChange={(value) =>
                    setFormData({ ...formData, email: value })
                  }
                />

                <Input
                  label="Company *"
                  placeholder="Abc Corporation"
                  value={formData.company}
                  onChange={(value) =>
                    setFormData({ ...formData, company: value })
                  }
                />

                <Input
                  label="Phone Number *"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(value) =>
                    setFormData({ ...formData, phone: value })
                  }
                />

              </div>
            </div>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <div className="animate-[fadeStep_0.35s_ease-out]">
              <StepHeading
                title="Select Your Industry *"
                subtitle="Required fields are marked with an asterisk (*)"
              />

              <div className="mt-5 grid grid-cols-2 gap-2.5">

                {industries.map((item) => {
                  const selected = formData.industries.includes(item);

                  return (
                    <CheckBox
                      key={item}
                      label={item}
                      selected={selected}
                      onClick={() => toggleIndustry(item)}
                    />
                  );
                })}

              </div>
            </div>
          )}

          {/* ================= STEP 3 ================= */}
          {step === 3 && (
            <div className="animate-[fadeStep_0.35s_ease-out]">
              <StepHeading
                title="Select Cable Products You Need *"
                subtitle="Required fields are marked with an asterisk (*)"
              />

              <div className="mt-5 grid grid-cols-2 gap-2.5">

                {cableProducts.map((item) => {
                  const selected = formData.cables.includes(item);

                  return (
                    <CheckBox
                      key={item}
                      label={item}
                      selected={selected}
                      onClick={() => toggleCable(item)}
                    />
                  );
                })}

              </div>
            </div>
          )}

          {/* ================= STEP 4 ================= */}
          {step === 4 && (
            <div className="animate-[fadeStep_0.35s_ease-out]">
              <StepHeading
                title="Additional Requirements"
                subtitle="Describe your specification and timelines"
              />

              <div className="mt-5 space-y-4">

                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#383838]">
                    Cable Specifications *
                  </label>

                  <textarea
                    value={formData.specifications}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specifications: e.target.value,
                      })
                    }
                    placeholder="Describe your specific cable requirements, quantities, or any special specifications..."
                    className="h-[100px] w-full resize-none rounded-[6px] border border-[#D2D2D2] bg-[#FAFAFA] p-3 text-[14px] outline-none focus:border-[#1E3C8C]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#383838]">
                    Preferred Delivery Timeline
                  </label>

                  <div className="relative">
                    <select
                      value={formData.timeline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          timeline: e.target.value,
                        })
                      }
                      className="h-[38px] w-full appearance-none rounded-[6px] border border-[#D2D2D2] bg-[#FAFAFA] px-3 text-[14px] text-[#777] outline-none focus:border-[#1E3C8C]"
                    >
                      <option value="">Select timeline</option>
                      <option value="Immediate">Immediate</option>
                      <option value="1-3 Months">1-3 Months</option>
                      <option value="3-6 Months">3-6 Months</option>
                      <option value="6-12 Months">6-12 Months</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777]"
                    />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================= THANK YOU ================= */}
          {step === 5 && (
            <div className="flex h-[430px] flex-col items-center justify-center text-center animate-fadeStep">

              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#EFFFF8]">
                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-[#BDF5DE]">
                  <Check
                    size={30}
                    strokeWidth={1.5}
                    className="text-[#00A878]"
                  />
                </div>
              </div>

              <h2 className="mt-7 font-[Magistral] text-[30px] font-bold italic text-[#1E3C8C]">
                Thank You!
              </h2>

              <p className="mt-3 text-[15px] font-semibold text-[#383838]">
                Your inquiry has been submitted successfully.
              </p>

              <p className="mt-3 max-w-[400px] text-[14px] leading-[21px] text-[#777]">
                Our team will review your requirements and get back to you
                within 24 hours.
              </p>

              <button
                onClick={onClose}
                className="mt-6 h-[44px] w-[220px] rounded-[5px] bg-[#1E3C8C] text-[14px] font-medium text-white shadow-md transition hover:bg-[#163477]"
              >
                Back to Home
              </button>

            </div>
          )}

          {/* ================= FOOTER ================= */}
          {step <= totalSteps && (
            <div className="absolute bottom-7 left-7 right-7 md:left-9 md:right-9">

              <div className="flex items-center justify-between">

                <button
                  onClick={previousStep}
                  disabled={step === 1}
                  className={`h-[32px] rounded-[4px] border border-[#1E3C8C] px-5 text-[12px] font-semibold text-[#1E3C8C] transition ${
                    step === 1
                      ? "pointer-events-none opacity-0"
                      : "hover:bg-[#1E3C8C] hover:text-white"
                  }`}
                >
                  Previous
                </button>

                <button
                  onClick={nextStep}
                  className="h-[32px] rounded-[4px] bg-[#1E3C8C] px-8 text-[12px] font-semibold text-white shadow-md transition hover:bg-[#163477]"
                >
                  {step === totalSteps ? "Submit" : "Next"}
                </button>

              </div>

              {/* Progress */}
              <div className="mt-4 h-[4px] w-full overflow-hidden rounded-full bg-[#E4E7EA]">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${progress}%`,
                    background:
                      "linear-gradient(270.03deg, #3CAADF 3.18%, #F04123 53.61%, #FFD212 104.05%)",
                  }}
                />
              </div>

            </div>
          )}

        </div>
      </div>

      {/* Animation */}
     

    </div>
  );
}


/* ================= COMPONENTS ================= */

function StepHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <h2 className="font-[Magistral] text-[25px] leading-[1.1] font-bold italic text-[#1E3C8C] md:text-[26px]">
        {title}
      </h2>

      <p className="mt-2 text-[12px] text-[#777]">
        {subtitle}
      </p>
    </>
  );
}


function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-[#383838]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-[38px] w-full rounded-[6px] border border-[#D2D2D2] bg-[#FAFAFA] px-3 text-[14px] outline-none transition focus:border-[#1E3C8C]"
      />
    </div>
  );
}


function CheckBox({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[37px] items-center gap-2 rounded-[6px] border px-3 text-left text-[13px] transition-all ${
        selected
          ? "border-[#1E3C8C] bg-[#F5F7FC] font-semibold text-[#1E3C8C]"
          : "border-[#D2D2D2] bg-[#FAFAFA] text-[#444] hover:border-[#1E3C8C]"
      }`}
    >
      <span
        className={`flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[2px] border ${
          selected
            ? "border-[#1E3C8C] bg-[#1E3C8C] text-white"
            : "border-[#D2D2D2] bg-white"
        }`}
      >
        {selected && <Check size={12} strokeWidth={3} />}
      </span>

      <span className="truncate">{label}</span>
    </button>
  );
}