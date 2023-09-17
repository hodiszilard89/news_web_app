import { FC, useEffect } from "react";

interface MyTimeFormatParams {
  date: Date;
}

export const MyTimeFormat: FC<MyTimeFormatParams> = ({ date }) => {
  /// console.log(new Date( Date.now()-new Date(date).getTime()))
  const ago = Date.now() - new Date(date).getTime();

  const secund = Math.floor(ago / 1000);
  const minute = Math.floor(secund / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);
  const week = Math.floor(day / 7);
  const month = Math.floor(day / 30);
  if (month > 0) {
    return <>{month} hónappal ezelőtt</>;
  } else if (day > 0) {
    return <>{day} nappal ezelőtt</>;
  } else if (hour > 0) {
    return <>{hour} órával ezelőtt</>;
  } else if (minute > 0) {
    return <>{minute} percel ezelőtt</>;
  } else if (secund > 0) {
    return <>{secund} másod percel ezelőtt</>;
  }
  return <div>éppen most</div>;
};
