import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { post } from "../../services/api";

// Define the interface for psychologist data
export interface Psychologist {
  phyID: number;
  phy_name: string;
}

interface PsychologistResponse {
  status: number;
  data: Psychologist[];
}

interface PsychologistSelectorProps {
  selectedPsychologist: number;
  onPsychologistChange: (psychologistId: number) => void;
}

const PsychologistSelector: React.FC<PsychologistSelectorProps> = ({
  selectedPsychologist,
  onPsychologistChange,
}) => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [cookies] = useCookies(["auth_token"]);
  const dataFetchedRef = useRef<boolean>(false);

  // Fetch psychologists data
  useEffect(() => {
    // ตรวจสอบว่าเคยโหลดข้อมูลแล้วหรือยัง เพื่อป้องกันการโหลดซ้ำ
    if (dataFetchedRef.current) return;

    const authToken = cookies["auth_token"];
    if (!authToken) return;

    const fetchPsychologists = async () => {
      try {
        setLoading(true);
        const response = (await post("/api/getAdminData", {
          token: authToken,
        })) as PsychologistResponse;

        if (response.status === 200 && response.data) {
          setPsychologists(response.data);
          dataFetchedRef.current = true; // ทำเครื่องหมายว่าได้โหลดข้อมูลแล้ว
        }
      } catch (error) {
        console.error("Failed to fetch psychologists data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPsychologists();
  }, []); // ดึงข้อมูลแค่ครั้งเดียวตอน mount

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get the name of the selected psychologist
  const getSelectedPsychologistName = () => {
    const psychologist = psychologists.find(
      (psy) => psy.phyID === selectedPsychologist
    );
    return psychologist ? psychologist.phy_name : "กรุณาเลือก";
  };

  if (loading && !dataFetchedRef.current) {
    return (
      <div className="relative w-full sm:w-auto flex items-center gap-2">
        <span className="text-sm sm:text-base text-[var(--primary-color)] font-medium whitespace-nowrap">
          เลือกนักจิตวิทยา:
        </span>
        <div className="relative w-full min-w-[180px]">
          <button
            disabled
            className="w-full h-10 px-4 text-left text-sm sm:text-base bg-white border-2 border-gray-300 text-gray-400 rounded-lg focus:outline-none transition-colors duration-200 flex items-center justify-between"
          >
            <span>กำลังโหลด...</span>
            <span className="text-lg ml-2 flex-shrink-0">▾</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full sm:w-auto flex items-center gap-2"
      ref={dropdownRef}
    >
      <span className="text-sm sm:text-base text-[var(--primary-color)] font-medium whitespace-nowrap">
        เลือกนักจิตวิทยา:
      </span>
      <div className="relative w-full min-w-[180px]">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full h-10 px-4 text-left text-sm sm:text-base bg-white border-2 border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg hover:bg-[var(--hover-color)] focus:outline-none transition-colors duration-200 flex items-center justify-between"
        >
          <span className="truncate">{getSelectedPsychologistName()}</span>
          <span className="text-lg ml-2 flex-shrink-0">▾</span>
        </button>
        {showDropdown && (
          <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[var(--primary-color)] rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {psychologists.map((psy) => (
              <button
                key={psy.phyID}
                className="w-full h-10 px-4 text-left text-sm sm:text-base text-[var(--primary-color)] bg-white hover:bg-[var(--hover-color)] first:rounded-t-md last:rounded-b-md transition-colors duration-200 flex items-center"
                onClick={() => {
                  onPsychologistChange(psy.phyID);
                  setShowDropdown(false);
                }}
              >
                {psy.phy_name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PsychologistSelector;
