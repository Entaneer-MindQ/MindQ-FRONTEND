import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  MenuItem,
  Select,
  Grid,
  Button,
  CircularProgress,
  Tooltip,
  Fade,
  SelectChangeEvent,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RefreshIcon from "@mui/icons-material/Refresh";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

interface Holiday {
  date: string;
  description: string;
}
interface MyHoraHoliday {
  holiday_date_id: string;
  holiday_name: string;
  holiday_date: string;
  holiday_datename: string;
  lunardate: string;
  sidereal: string;
  zodiac: string;
  sidereal_hours: string;
}
const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const monthsEN = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "อาทิตย์",
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
  ];
  const daysEN = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // สร้างตัวเลือกเดือนสำหรับ dropdown
  const getAvailableMonths = () => {
    const currentMonth = new Date();
    const months = [];

    // เพิ่มเดือนก่อนหน้า 4 เดือน
    for (let i = -4; i <= 4; i++) {
      const date = new Date(currentMonth);
      date.setMonth(currentMonth.getMonth() + i);
      months.push({
        date: date,
        label: `${months[date.getMonth()]} ${date.getFullYear()}`,
      });
    }

    return months;
  };

  const availableMonths = getAvailableMonths();

  const fetchHolidays = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://www.myhora.com/calendar/ical/holiday.aspx?latest.json"
      );
      const data = await response.json();

      // แปลงข้อมูลจาก MyHora API ให้อยู่ในรูปแบบที่ต้องการ
      const formattedHolidays = data.map((holiday: MyHoraHoliday) => ({
        date: holiday.holiday_date,
        description: holiday.holiday_name,
        datename: holiday.holiday_datename,
        lunardate: holiday.lunardate,
      }));

      setHolidays(formattedHolidays);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, [currentDate]);

  const isHoliday = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return holidays.find((holiday) => {
      const holidayDate = new Date(holiday.date);
      return holidayDate.toISOString().split("T")[0] === dateStr;
    });
  };

  const getAvailableDates = () => {
    const availableDates = [4, 5, 6, 13, 20, 23, 24, 26, 27, 30];
    return availableDates;
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const handleMonthChange = (event: SelectChangeEvent<string>) => {
    const selectedMonth = availableMonths.find(
      (month) => month.label === event.target.value
    );
    if (selectedMonth) {
      setCurrentDate(selectedMonth.date);
    }
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    if (newDate >= availableMonths[0].date) {
      setCurrentDate(newDate);
    }
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    if (newDate <= availableMonths[availableMonths.length - 1].date) {
      setCurrentDate(newDate);
    }
  };

  const handleDateClick = (dayNumber: number) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dayNumber
    );
    const dayOfWeek = daysEN[selectedDate.getDay()];
    const monthYear = `${
      monthsEN[currentDate.getMonth()]
    }/${currentDate.getFullYear()}`;

    navigate("/booking", {
      state: {
        month: monthYear,
        date: dayNumber,
        dayOfWeek: dayOfWeek,
        categories: [],
        timeSlot: "",
        details: "",
      },
    });
  };

  const generateCalendarDays = () => {
    const availableDates = getAvailableDates();
    const calendarDays = [];
    const totalDays = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;

    for (let i = 0; i < totalDays; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const isAvailable = availableDates.includes(dayNumber);
      const holiday = isCurrentMonth ? isHoliday(dayNumber) : null;
      const isToday =
        isCurrentMonth &&
        new Date().getDate() === dayNumber &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

      calendarDays.push(
        <Paper
          key={i}
          elevation={isCurrentMonth ? 1 : 0}
          sx={{
            p: 2,
            height: "120px", // เพิ่มความสูงเพื่อรองรับข้อมูลเพิ่มเติม
            bgcolor: isCurrentMonth ? "white" : "grey.100",
            position: "relative",
            border: isToday ? 2 : 1,
            borderColor: isToday ? "primary.main" : "grey.200",
            "&:hover": isCurrentMonth && {
              boxShadow: 3,
            },
          }}
        >
          {isCurrentMonth && (
            <Box sx={{ height: "100%", position: "relative" }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: isToday ? "bold" : "normal",
                  color: holiday ? "error.main" : "text.primary",
                }}
              >
                {dayNumber}
              </Typography>

              {holiday && (
                <Tooltip
                  title={
                    <React.Fragment>
                      <Typography variant="body2">
                        {holiday.description}
                      </Typography>
                      {holiday.datename && (
                        <Typography variant="caption">
                          {holiday.datename}
                        </Typography>
                      )}
                      {holiday.lunardate && (
                        <Typography variant="caption" display="block">
                          จันทรคติ: {holiday.lunardate}
                        </Typography>
                      )}
                    </React.Fragment>
                  }
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "error.main",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      cursor: "help",
                    }}
                  >
                    {holiday.description}
                  </Typography>
                </Tooltip>
              )}

              {isAvailable && (
                <Box
                  sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    onClick={() => handleDateClick(dayNumber)}
                    startIcon={<EventAvailableIcon />}
                    disabled={holiday !== null}
                    sx={{
                      color: holiday ? "grey.500" : "#943131",
                      borderColor: holiday ? "grey.300" : "#943131",
                      "&:hover": {
                        backgroundColor: holiday ? "grey.100" : "#f5e6e6",
                        borderColor: holiday ? "grey.400" : "#7a2828",
                      },
                    }}
                  >
                    {holiday ? "วันหยุด" : "ว่าง"}
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Paper>
      );
    }
    return calendarDays;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, ml: "100px" }}>
      <Fade in timeout={800}>
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
          {/* Header */}
          <Box sx={{ bgcolor: "#943131", color: "white", p: 3 }}>
            <Typography
              variant="h5"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <CalendarMonthIcon />
              ปฏิทินการจองคิว
            </Typography>
          </Box>

          <Box sx={{ p: 3 }}>
            {/* Controls */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Select
                value={`${
                  months[currentDate.getMonth()]
                } ${currentDate.getFullYear()}`}
                onChange={handleMonthChange}
                sx={{ minWidth: 200 }}
              >
                {availableMonths.map((month, index) => (
                  <MenuItem key={index} value={month.label}>
                    {month.label}
                  </MenuItem>
                ))}
              </Select>

              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  onClick={handlePreviousMonth}
                  disabled={currentDate <= availableMonths[0].date}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton onClick={fetchHolidays} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : <RefreshIcon />}
                </IconButton>
                <IconButton
                  onClick={handleNextMonth}
                  disabled={
                    currentDate >=
                    availableMonths[availableMonths.length - 1].date
                  }
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Day Headers */}
            <Grid container spacing={1}>
              {days.map((day) => (
                <Grid item xs key={day}>
                  <Paper
                    sx={{
                      p: 1,
                      textAlign: "center",
                      bgcolor: "#943131",
                      color: "white",
                    }}
                  >
                    <Typography variant="subtitle2">{day}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Calendar Grid */}
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {generateCalendarDays().map((day, index) => (
                <Grid item xs key={index}>
                  {day}
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default Calendar;
