import { format, isAfter, parse } from 'date-fns';

let currentOrderNumber = 1;
let lastResetDate = new Date();

export const generateOrderNumber = (): string => {
  const now = new Date();
  const today22h = parse(format(now, 'yyyy-MM-dd 22:00:00'), 'yyyy-MM-dd HH:mm:ss', new Date());
  
  // Reset counter if it's after 22:00 and we haven't reset today
  // or if it's a new day and before 22:00
  if (
    (isAfter(now, today22h) && !isAfter(lastResetDate, today22h)) ||
    (format(now, 'yyyy-MM-dd') !== format(lastResetDate, 'yyyy-MM-dd'))
  ) {
    currentOrderNumber = 1;
    lastResetDate = now;
  }

  const orderNumber = `ORD${String(currentOrderNumber).padStart(5, '0')}`;
  currentOrderNumber++;
  
  return orderNumber;
};