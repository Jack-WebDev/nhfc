import crypto from "crypto";

export function randomGenerator (length: number) {
    return crypto.randomBytes(length).toString('hex')
}

export function formatDate(date: string, withTime? : boolean): string{

    const dateObj = new Date(date);
    const month = dateObj.getMonth();
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    

    const newDate = withTime ? new Date(date).toDateString() + " " + new Date(date).toLocaleTimeString() : new Date(date).toDateString();

    return newDate
}