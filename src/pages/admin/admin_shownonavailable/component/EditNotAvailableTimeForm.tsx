import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useCookies } from 'react-cookie';
import { post } from '../../../../services/api';

interface SlotOption {
  id: number;
  label: string;
}

interface ExistingData {
  NVTID: number;
  Phy_ID: number;
  Slot: number[];
  created_at: string;
  end_date: string;
  reason: string;
  start_date: string;
  updated_at: string;
}

interface FormData {
  start_date: string;
  end_date: string;
  reason: string;
}

interface FormErrors {
  start_date?: string;
  end_date?: string;
  slots?: string;
}

interface EditNotAvailableTimeFormProps {
  existingData: ExistingData;
  onClose: () => void;
}

const slotOptions: SlotOption[] = [
  { id: 1, label: "9:00 - 10:00" },
  { id: 2, label: "10:00 - 11:00" },
  { id: 3, label: "11:00 - 12:00" },
  { id: 4, label: "13:00 - 14:00" },
  { id: 5, label: "14:00 - 15:00" },
  { id: 6, label: "15:00 - 16:00" },
];

const thaiMonths: string[] = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

// Convert Thai date string to YYYY-MM-DD format
const parseThatDate = (thaiDate: string): string => {
  const [day, month, year] = thaiDate.split(' ');
  const monthIndex = thaiMonths.indexOf(month);
  const gregorianYear = parseInt(year) - 543;
  const formattedMonth = (monthIndex + 1).toString().padStart(2, '0');
  const formattedDay = day.padStart(2, '0');
  return `${gregorianYear}-${formattedMonth}-${formattedDay}`;
};

// Convert YYYY-MM-DD to Thai date format
const formatThaiDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${date.getFullYear() + 543}`;
};

const EditNotAvailableTimeForm: React.FC<EditNotAvailableTimeFormProps> = ({ 
  existingData, 
  onClose 
}) => {
  // Convert Thai dates to YYYY-MM-DD format for the form inputs
  const initialStartDate = parseThatDate(existingData.start_date);
  const initialEndDate = parseThatDate(existingData.end_date);
  const [cookies] = useCookies(["auth_token"]);

  const [formData, setFormData] = useState<FormData>({
    start_date: initialStartDate,
    end_date: initialEndDate,
    reason: existingData.reason || '',
  });

  const [selectedSlots, setSelectedSlots] = useState<number[]>(existingData.Slot || []);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (existingData) {
      setFormData({
        start_date: parseThatDate(existingData.start_date),
        end_date: parseThatDate(existingData.end_date),
        reason: existingData.reason,
      });
      setSelectedSlots(existingData.Slot);
    }
  }, [existingData]);

  const isSameDay = formData.start_date === formData.end_date;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSlotSelect = (slotId: number): void => {
    if (!isSameDay) return;
    
    setSelectedSlots(prev =>
      prev.includes(slotId) 
        ? prev.filter(s => s !== slotId)
        : [...prev, slotId]
    );
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.start_date) {
      newErrors.start_date = 'กรุณาเลือกวันที่เริ่มต้น';
    }
    if (!formData.end_date) {
      newErrors.end_date = 'กรุณาเลือกวันที่สิ้นสุด';
    }
    if (isSameDay && selectedSlots.length === 0) {
      newErrors.slots = 'กรุณาเลือกช่วงเวลา';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const submitData = {
        NVTID: existingData.NVTID,
        phy_id: existingData.Phy_ID,
        start: formatThaiDate(formData.start_date),
        end: formatThaiDate(formData.end_date),
        slot: isSameDay ? selectedSlots : [7],
        reason: formData.reason,
      };
      const response = await post('/api/updateNotAvailableTime', {
        update: submitData,
        token: cookies["auth_token"],
      });

      if(response){
        alert('Updated successfully!');
      }

      // Replace this with your actual API call
      console.log('Submitting data:', submitData);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating Not Available Time:', error);
      alert('Update failed! T_T');
    }
  };

  // ฟังก์ชันสำหรับปุ่มลบ (Delete) - API integration ทีหลัง
  const handleDelete = async () => {
    try {
      const response = await post('/api/deleteNotAvailableTime', {
        NVTID: existingData.NVTID,
        token: cookies["auth_token"],
      });
      
      if(response){
        alert('Deleted successfully!');
        onClose();
        window.location.reload();
      }
     
    } catch (error) {
      console.error('Error deleting Not Available Time:', error);
      alert('Delete failed! T_T');
    }
  };

  if (!existingData) {
    return <div>No data to edit</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8">แก้ไขเวลาที่ไม่พร้อม</h2>
        <button 
          onClick={onClose}
          type="button"
          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          {/* ปุ่มกากบาท */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">วันที่เริ่มต้น</label>
          <input 
            type="date" 
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
          />
          {errors.start_date && (
            <p className="text-red-500 text-xs mt-1">{errors.start_date}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">วันที่สิ้นสุด</label>
          <input 
            type="date" 
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
          />
          {errors.end_date && (
            <p className="text-red-500 text-xs mt-1">{errors.end_date}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">ช่วงเวลาที่ไม่พร้อม</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {slotOptions.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => handleSlotSelect(slot.id)}
                disabled={!isSameDay}
                className={`p-3 rounded-md transition-colors duration-200 font-medium
                  ${selectedSlots.includes(slot.id) 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-white border border-gray-300 hover:bg-gray-100 text-gray-800'}
                  ${!isSameDay ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {slot.label}
              </button>
            ))}
          </div>
          {errors.slots && (
            <p className="text-red-500 text-xs mt-1">{errors.slots}</p>
          )}
          {!isSameDay && (
            <p className="text-gray-500 text-xs mt-2">เลือกต่างวัน slot จะเป็น 7 อัตโนมัติ</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">เหตุผล</label>
          <textarea 
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4">
          <button 
            type="button" 
            onClick={handleDelete}
            className="w-full sm:w-auto px-5 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 font-medium"
          >
            ลบ
          </button>
          <button 
            type="button" 
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            ยกเลิก
          </button>
          <button 
            type="submit" 
            className={`w-full sm:w-auto px-5 py-2 rounded-md transition-colors duration-200 font-medium
              ${(!formData.start_date || !formData.end_date) || (isSameDay && selectedSlots.length === 0)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            disabled={(!formData.start_date || !formData.end_date) || (isSameDay && selectedSlots.length === 0)}
          >
            ตกลง
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNotAvailableTimeForm;
