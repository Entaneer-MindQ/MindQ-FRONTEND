import { useEffect, useState } from "react";
import { CaseData, QueueItem } from "../../types/queue";

async function intToTimeStamp(option: number) {
  const my_dict: { [key: number]: string } = {
    1: "09:00",
    2: "10:00",
    3: "11:00",
    4: "13:00",
    5: "14:00",
    6: "15:00",
  };

  const for_return = my_dict[option];
  if (!for_return) throw Error("time slot went worng");

  return for_return;
}
const AppointmentHistoryCard = ({ appointment, caseData }: { appointment: QueueItem, caseData: CaseData|null }) => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fetchTime = async () => {
      const timeString = await intToTimeStamp(appointment.slot);
      setTime(timeString);
    };
    fetchTime();
  }, [appointment.slot]);

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white">
      <div className="space-y-2">
        <div>
          <span className="font-semibold">Topic:</span> {caseData?.topic}
        </div>
        <div>
          <span className="font-semibold">Description:</span> {caseData?.description}
        </div>
        <div className="flex justify-between">
          <div>
            <span className="font-semibold">Date:</span> {appointment.date}
          </div>
          <div>
            <span className="font-semibold">Time:</span> {time}
          </div>
        </div>
        <div>
          <span className="font-semibold">Status:</span>{" "}
          {appointment.cancel_reason && (
            <div className="text-sm text-gray-600">
              <span className="font-semibold">เหตุผล:</span> {appointment.cancel_reason}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export {AppointmentHistoryCard}