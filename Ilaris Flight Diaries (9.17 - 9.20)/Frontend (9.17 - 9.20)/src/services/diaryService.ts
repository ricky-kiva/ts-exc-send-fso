import axios from "axios";
import { Diary, NewDiary } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(res => res.data);
}

export const createDiary = async (object: NewDiary) => {
  try {
    return await axios
      .post<Diary>(baseUrl, object)
      .then(res => res.data);
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      const errorObject = e.response?.data?.error;

      if (Array.isArray(errorObject) && errorObject.length > 0) {
        const firstError = errorObject[0];

        if (firstError?.code && firstError?.path) {
          return firstError.path.length > 0
            ? firstError.received
              ? `Incorrect ${firstError.path[0]}: ${firstError.received}`
              : firstError.path[0]
            : "A field is in an invalid format";
        }
      }

      return "An unexpected HTTP error occured";
    }

    if (e instanceof Error) return e.message;
  }
}
