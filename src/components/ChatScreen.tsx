import {useContext, useMemo} from "react";
import {MessagesContext} from "../context/MessagesContext.tsx";
import {ShowMessage} from "./ShowMessage.tsx";

const defaultMessage: MessageObj = {
    id: "*",
    message_content: "welcome to penzi our dating service with 6000 potential dating partners!\n" +
        "To register SMS start#name#age#gender#county#town to 22141.\n" +
        "\n" +
        "register:start#name#age#gender#county#town\n" +
        "to 22141",
    phone_number: "",
    from_user_id: "",
    shortcode: "",
    timestamp: Date.now().toString(),
}

export default function ChatScreen() {
    const {messages} = useContext(MessagesContext)
    const chats = useMemo(() => {
        if (messages.size < 1)
            return [defaultMessage, ...messages.values()]
        return [...messages.values()]
    }, [messages])
    return (
        <div className={'w-full h-[calc(100vh-140px)] overflow-y-auto grid auto-rows-max gap-2 p-2 bg-slate-50'}>
            {chats.map((msg) =>
                <ShowMessage
                    message={msg}
                    key={msg.id}
                />
            )}
        </div>
    )
}

