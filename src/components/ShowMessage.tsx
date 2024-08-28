import * as React from "react";
import {useMemo} from "react";
import {Text} from "@mantine/core";
import {useCookies} from "react-cookie";
import dayjs from "dayjs";


interface props extends React.HtmlHTMLAttributes<HTMLDivElement> {
    message: MessageObj;
}

export const ShowMessage = ({message, ...rest}: props) => {
    const [cookie, _setCookie, _getCookie] = useCookies(['user_phone', 'user_id'])
    const sentByMe = useMemo(() => {
        return message.from_user_id === cookie.user_id
    }, [cookie.user_id, message.from_user_id])

    return (
        <div {...rest}
             className={`w-full p-3 max-w-[350px] rounded-md ${sentByMe ? "ml-auto bg-gray-100 border" : "mr-auto bg-blue-100"} ${rest.className}`}>
            <Text className={'break-words text-wrap w-full'}>
                {message.message_content}
            </Text>
            <Text size={'sm'} className={`italic text-right`}>{dayjs(message.timestamp).format("DD MMM YYYY")}</Text>
        </div>
    )
}

