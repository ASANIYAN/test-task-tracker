import { Id, Task } from "@/types/types";

export const generateId = () => {
    /* Generate a random number between 0 and 10001 */
    return Math.floor(Math.random() * 10001);
}

export const getDayMonthYearTime = (date: Date | undefined) => {
    if (date === undefined) return "";
    const currentDate = date;

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months start at 0
    const year = currentDate.getFullYear();

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Format the date and time
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const formattedDateTime = formattedDate + " " +  formattedTime; 

    return formattedDateTime;
}

export const setBodyOverflow = (property: string) => {
    const bodyElement = document.body;
    bodyElement.className = `${property}`;
    // console.log(property, "property");
    
  };

