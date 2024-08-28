import {createContext, ReactNode, useState} from "react";
import {useQuery} from "react-query";
import {notifications} from "@mantine/notifications";
import api from "../lib/api.ts";
import {AxiosResponse} from "axios";



interface ChatContext {
    messages: ChatObj,
    refetch: () => void,
}

export const MessagesContext = createContext<ChatContext>({
    messages: new Map(),
    refetch: ()=>{}
});

export default function MessagesContextProvider({children}: { children: ReactNode }) {
    // const _id = useContext(IdentityContext)
    const [messages, setMessages] = useState<ChatObj>(new Map())
    
    const {refetch} = useQuery({
        queryKey: ["messages"],
        queryFn: (): Promise<AxiosResponse> => new Promise((resolve, _reject) => {
            resolve(api.get('/messages'))
        }),
        onSuccess: ({data}) => {
            const sorted = (data as MessageObj[]).sort((a, b) => Number(a.indexer) - Number(b.indexer))
            //const sorted = (data as MessageObj[]).sort((a, b) => Number(new Date(a.timestamp)) - Number(new Date(b.timestamp)))
            console.log(sorted)
            sorted.forEach(message => {
                setMessages(prev => new Map(prev).set(message.id, message))
            })
            console.log(sorted)
        },
        onError: (err) => {
            notifications.show({message: (err as Error).message, color: 'red'})
        },
       
    })
    return (
        <MessagesContext.Provider value={{messages, refetch}}>
            {children}
        </MessagesContext.Provider>
    )
}
