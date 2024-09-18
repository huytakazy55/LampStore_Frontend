import React, { useState } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/material';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box 
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#f0f0f0',
        }}
      >
        <DateCalendar
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          sx={{
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            height: '100%',
            borderRadius: '5px',
            width: '100%',
            backgroundColor: '#fff',
            '.MuiPickersDay-root': {
              fontWeight: 'bold',
              color: '#fdad06',
            },
            '.Mui-selected': {
              backgroundColor: '#8946f8 !important',
              color: '#fff',
            },
            '.MuiPickersDay-root:hover': {
              backgroundColor: '#d1e4f9',
            },
            '.MuiDayCalendar-header': {
                justifyContent: 'space-around',
                color: '#8946f8 !important'
            },
            '.MuiDayCalendar-weekContainer': {
              justifyContent: 'space-around',
            },
            '.MuiPickersCalendarHeader-label': {
              fontWeight: '600',
              fontSize: '1.5rem',
              color: '#8946f8'
            },
            '.MuiPickersDay-today': {
                border: '2px solid #8946f8 !important',
            },
            '.MuiButtonBase-root': {
                lineHeight: '1',
            }
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CalendarComponent;