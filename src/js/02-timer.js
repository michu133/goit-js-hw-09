import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const dateTimePicker = document.getElementById('datetime-picker');

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date().getTime();

    const selectedDate = selectedDates[0].getTime();

    const remainingTime = selectedDate - currentDate;

    const roundedTime = Math.round(remainingTime / 1000);

    if (currentDate >= selectedDate) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        let intervalTimer = setInterval(() => {
          const currentDate = new Date().getTime();

          const selectedDate = selectedDates[0].getTime();

          if (currentDate >= selectedDate) {
            clearInterval(intervalTimer);
            return Notiflix.Notify.failure(
              'The chosen date has passed. Please choose a date in the future'
            );
          }
          const distance = selectedDate - currentDate;
          const roundedDistance = Math.floor(distance / 1000);

          const convertedDistance = convertMs(distance);

          function addLeadingZero(value) {
            return String(value).padStart(2, '0');
          }
          days.innerHTML = addLeadingZero(convertedDistance.days);
          hours.innerHTML = addLeadingZero(convertedDistance.hours);
          minutes.innerHTML = addLeadingZero(convertedDistance.minutes);
          seconds.innerHTML = addLeadingZero(convertedDistance.seconds);

          startBtn.disabled = true;

          if (roundedDistance === 0) {
            clearInterval(intervalTimer);
            Notiflix.Notify.success('Timer finished');
          }
        }, 1000);
      });
    }
  },
};
flatpickr(dateTimePicker, options);
