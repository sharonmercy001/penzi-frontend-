import {Button, TextInput} from "@mantine/core";
import {BiSolidSend} from "react-icons/bi";
import {useMutation} from "react-query";
import api from "../lib/api.ts";
import {notifications} from "@mantine/notifications";
import getErr from "../lib/sharedMethods.ts";
import {useContext, useState} from "react";
import {MessagesContext} from "../context/MessagesContext.tsx";


export default function SendMessage() {
    const [message, setMessage] = useState("")
    const {refetch} = useContext(MessagesContext);
    const {mutate, isLoading} = useMutation({
        mutationKey: ['message'],
        mutationFn: () => new Promise(resolve => {
            const url = message.toLowerCase().startsWith('match') ? "/match" : "/interact";
            resolve(api.post(url, {message}))
        }),
        onSuccess: ()=>{
            setMessage("")
            refetch()
        },
        onError: (err) => {
            notifications.show({message: getErr(err), color: 'red'})
        }
    })
    return (
        <form onSubmit={e=>{
            e.preventDefault();
            mutate()
        }} className={'w-full h-[70px] flex gap-2 p-2'}>
            <TextInput
                radius={'xl'}
                value={message}
                disabled={isLoading}
                className={'flex-1'}
                placeholder={'Send message'}
                onChange={e => setMessage(e.target.value.trim())}
            />
            <Button onClick={()=>mutate()} loading={isLoading} disabled={isLoading}>
                <BiSolidSend/>
            </Button>
        </form>
    )
}

