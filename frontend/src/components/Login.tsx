import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";

interface Country {
  code: string;
  name: string;
  dialCode: string;
}

const countries: Country[] = [
  { code: "US", name: "United States", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", dialCode: "+44" },
  { code: "CA", name: "Canada", dialCode: "+1" },
  { code: "NG", name: "Nigeria", dialCode: "+234" },
  { code: "IN", name: "India", dialCode: "+91" },
  { code: "AU", name: "Australia", dialCode: "+61" },
  { code: "DE", name: "Germany", dialCode: "+49" },
  { code: "FR", name: "France", dialCode: "+33" },
];

export default function Login() {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries[0] ?? { code: "US", name: "United States", dialCode: "+1" }
  );
  const [showCountryPicker, setShowCountryPicker] = useState<boolean>(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const isFormValid = name.trim().length > 0 && phoneNumber.trim().length > 9;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setUser({
        name,
        phoneNumber: `${selectedCountry.dialCode}${phoneNumber}`,
        countryCode: selectedCountry.code,
        countryName: selectedCountry.name,
      });

      console.log("Login:", {
        name,
        phoneNumber: `${selectedCountry.dialCode}${phoneNumber}`,
        countryCode: selectedCountry.code,
        countryName: selectedCountry.name,
      });

      navigate("/", { replace: true });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="px-4 py-5 flex items-center justify-between border-b border-gray-200">
        <div className="flex-1"></div>
        <h1 className="text-lg font-semibold text-[#111b21] flex-1 text-center">
          Phone number
        </h1>
        <div className="flex-1 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`text-sm ${
              isFormValid ? "text-blue-600 font-medium" : "text-gray-400"
            }`}
          >
            Done
          </button>
        </div>
      </header>

      <div className="flex-1 px-4 py-6">
        <p className="text-[#111b21] text-sm mb-6 text-center">
          Please confirm your country code and
          <br />
          enter your phone number
        </p>

        <div className="mb-4 mt-10">
          <label className="block text-sm font-medium text-[#111b21] mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full text-[#111b21] text-base py-3 border-b border-gray-200 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCountryPicker(!showCountryPicker)}
            className="w-full flex items-center justify-between py-3 border-b border-gray-200"
          >
            <span className="text-blue-600 text-base">
              {selectedCountry.name}
            </span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          {/* Country Picker Dropdown */}
          {showCountryPicker && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto mt-1">
              {countries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(country);
                    setShowCountryPicker(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between ${
                    selectedCountry.code === country.code ? "bg-blue-50" : ""
                  }`}
                >
                  <span className="text-[#111b21]">{country.name}</span>
                  <span className="text-gray-500 text-sm">
                    {country.dialCode}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <div className="mt-4">
          <div className="flex items-center border-b border-gray-200">
            <span className="text-[#111b21] text-base py-3 pr-2">
              {selectedCountry.dialCode}
            </span>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/\D/g, ""))
              }
              placeholder="phone number"
              className="flex-1 text-[#111b21] text-base py-3 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
