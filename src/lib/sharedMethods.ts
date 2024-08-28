import {AxiosError} from "axios";


export default function getErr(error: unknown | AxiosError | Error){
    if(error instanceof AxiosError)
        return error.response?.data.error??"Something went wrong with your request!"
    return "Something went wrong"
}

