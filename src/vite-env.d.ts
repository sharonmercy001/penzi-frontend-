/// <reference types="vite/client" />

declare interface MessageObj {
    "id": string;
    "timestamp": string;
    "shortcode": string;
    "phone_number": string;
    "message_content": string;
    "from_user_id": string;
    "indexer":number;
}

declare type ChatObj = Map<string, MessageObj>


declare interface UserObj {
    user_id: number | string;
    phone_number: string;
    messages: MessageObj[];
}