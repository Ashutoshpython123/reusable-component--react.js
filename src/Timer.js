import React, { useState, useRef, useEffect } from 'react';

function Timer(props) {
  const [day, setDay] = useState('00')
  const [hour, setHour] = useState('00')
  const [minute, setMinute] = useState('00')
  const [second, setSecond] = useState('00')
  const [timestart, setTimeStart] = useState(props.x)
  const [timeend, setTimeEnd] = useState(1647769447000)
  const [timerCheck, setTimerCheck] = useState(0);

  console.log(1)
  let interval = useRef();

  const startTimer = () => {
    interval = setInterval(() => {
      var date = new Date();
      var now_utc = Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
      );
     
      if (timeend < now_utc) {
        setTimerCheck(0) //closed
      } else if (now_utc < timestart) {
        setTimerCheck(1) //startIn

        let closes_in_sec = (timestart - now_utc) / 1000

        let closes_in_days = Math.floor(closes_in_sec / (3600 * 24));

        closes_in_sec -= closes_in_days * 86400;

        let closes_in_hours = Math.floor(closes_in_sec / 3600) % 24;
        closes_in_sec -= closes_in_hours * 3600;

        let closes_in_minutes = Math.floor(closes_in_sec / 60) % 60;
        closes_in_sec -= closes_in_minutes * 60;

        let closes_seconds = Math.floor(closes_in_sec % 60);

        if (timestart - now_utc >= 0) {
          setDay(closes_in_days);
          setHour(closes_in_hours)
          setMinute(closes_in_minutes)
          setSecond(closes_seconds)
        } else {
          clearInterval(interval.current)
        }
      } else if (timeend >= now_utc && now_utc >= timestart) {
        setTimerCheck(2) //endIn

        let closes_in_sec = (timeend - now_utc) / 1000

        let closes_in_days = Math.floor(closes_in_sec / (3600 * 24));

        closes_in_sec -= closes_in_days * 86400;

        let closes_in_hours = Math.floor(closes_in_sec / 3600) % 24;
        closes_in_sec -= closes_in_hours * 3600;

        let closes_in_minutes = Math.floor(closes_in_sec / 60) % 60;
        closes_in_sec -= closes_in_minutes * 60;

        let closes_seconds = Math.floor(closes_in_sec % 60);

        if (timeend - now_utc >= 0) {
          setDay(closes_in_days);
          setHour(closes_in_hours)
          setMinute(closes_in_minutes)
          setSecond(closes_seconds)
        }
      }


    }, 1000)
  }


  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current)
    }
  }, [])

  return (
    <div className="App">
      {
        timerCheck === 0 ? <h2>END</h2> : ""
      }
       {
        timerCheck === 1 ? <h2>Start In : {day}D : {hour}H : {minute}M : {second}S</h2> : ""
      }
      {
        timerCheck === 2 ? <h2>Ends In : {day}D : {hour}H : {minute}M : {second}S</h2> : ""
      }
      
    </div>
  );
}

export default Timer;
