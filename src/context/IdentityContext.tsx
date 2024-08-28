import * as React from "react";
import {createContext, ReactNode, useMemo} from "react";
import {useMutation, UseMutationResult} from "react-query";
import {notifications} from "@mantine/notifications";
import {useCookies} from "react-cookie";
import api from "../lib/api.ts";
import {AxiosResponse} from "axios";
import getErr from "../lib/sharedMethods.ts";


export const IdentityContext = createContext<{
    phone: string,
    handle: (e: React.ChangeEvent<HTMLInputElement>) => void | false,
    saved: boolean,
    save: UseMutationResult<{ message: string }, unknown, void, unknown>,
} | undefined>(undefined);

export default function IdentityContextProvider({children}: { children: ReactNode }) {
    const [phone, setPhone] = React.useState<string>('');
    const [cookies, setCookie, _removeCookie] = useCookies(['phone_number', 'user_id'])

    const handle = ({target: {value,}}: React.ChangeEvent<HTMLInputElement>) => {
        const startsWith = phone.startsWith("07") || phone.startsWith("01")
        if (value.length >= 9 && !startsWith)
            return false
        setPhone(value)
    }

    // _removeCookie('user_id')
    // _removeCookie('user_id')
    const saved = useMemo(() => {
        return cookies.phone_number && cookies.user_id
    }, [cookies.phone_number, cookies.user_id])

    const save = useMutation({
        mutationKey: ['login'],
        mutationFn: (): Promise<AxiosResponse> => new Promise((resolve, _reject) => {
            resolve(api.post('/sign-in', {phone_number: phone}))
        }),
        onSuccess: (result) => {
            console.log("vvv: ",result)
            setCookie('user_id', result.data.user?.user_id)
            setCookie('phone_number', result.data.user?.phone_number)
            notifications.show({message: result.data.message, color: 'green'})
        },
        onError: (err) => {
            notifications.show({message: getErr(err) ?? "Something went wrong!", color: 'red'})
        }
    })

    return (
        <IdentityContext.Provider value={{
            phone,
            handle,
            saved,
            save
        }}>
            {children}
        </IdentityContext.Provider>
    )
};

