import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
const fieldsValue = document.querySelectorAll('.field');
const daysElement = fieldsValue[0].firstElementChild;
const hoursElement = fieldsValue[1].firstElementChild;
const minutesElement = fieldsValue[2].firstElementChild;
const secondsElement = fieldsValue[3].firstElementChild;
let delta = 0;
let intervalId;
let userSelectedDate;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    
  delta = userSelectedDate - Date.now();

  if (delta > 0) {
    startBtn.disabled = false;
  } else {
    startBtn.disabled = true;
    iziToast.error({
      message: 'Please choose a date in the future',
      messageColor: '#fff',
    messageSize: '',
    messageLineHeight: '',
      backgroundColor: '#ef4040',
      icon: 'x',
    position: "topRight"
});
    
    
    daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  }


    setDateToField(delta);
    
  },
};


const input = document.querySelector('#datetime-picker');
flatpickr(input, options);



function setDateToField(delta) {
  delta = userSelectedDate - Date.now();
  daysElement.textContent = convertMs(delta).days.toString().padStart(2,'0');
  hoursElement.textContent = convertMs(delta).hours.toString().padStart(2,'0');
  minutesElement.textContent = convertMs(delta).minutes.toString().padStart(2,'0');
  secondsElement.textContent = convertMs(delta).seconds.toString().padStart(2,'0');
  
  if (delta <= 0) {
    stopTimer();
}
}

startBtn.addEventListener('click', startTimer);

function startTimer() {
  input.disabled = true;
  startBtn.disabled = true;
  intervalId = setInterval(() => {
    setDateToField(delta);
  }, 1000);

}

function stopTimer() {
  clearInterval(intervalId);
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  
}
  

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}








