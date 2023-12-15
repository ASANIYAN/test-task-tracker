import { Id, Task } from "@/types/types";

export const  generateId = () => {
    /* Generate a random number between 0 and 10001 */
    return Math.floor(Math.random() * 10001);
}

