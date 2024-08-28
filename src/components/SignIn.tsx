import {AiFillHeart} from "react-icons/ai";
import {Avatar, Button, Loader, Text, TextInput} from "@mantine/core";
import {useContext} from "react";
import {IdentityContext} from "../context/IdentityContext.tsx";
import {BiSolidSend} from "react-icons/bi";


export default function SignIn() {
    const context = useContext(IdentityContext)

    if (!context)
        return <div className={'w-full h-screen bg-white flex absolute top-0 left-0'}>
            <div className={'w-max grid grid-flow-row auto-rows-max m-auto bg-white shadow-2xl p-5 rounded-md gap-2'}>
                <Loader className={'m-auto'}/>
                <Text className={'m-auto'}>Wait...</Text>
            </div>
        </div>
    return (
        <div className={'w-[90%] h-max absolute left-0 right-0 top-0 bottom-0 border p-3 rounded-md m-auto grid gap-2'}>
            <div className={'w-max text-2xl m-auto font-bold grid flex gap-1 flex-wrap'}>
                <p className={'m-auto'}>Onfon Dating Bot </p>
                <span className={'flex m-auto'}><p className={'m-auto'}>(Penzi </p><AiFillHeart
                    className={'m-auto'}/><p>)</p></span>
                <Avatar color={'blue'} className={'m-auto w-full'}/>
            </div>
            <Text>Dear user, enter your phone number ensuring it starts with 07 or 01 and is 10 digits long e.g:
                0712345678 or 012345678 to get started
            </Text>
            <TextInput
                placeholder={'Enter your phone number'}
                value={context.phone}
                onChange={context.handle}
            />
            <Button loading={context.save.isLoading} disabled={context.save.isLoading}
                    onClick={() => context.save.mutate()} rightSection={<BiSolidSend/>}>
                Submit
            </Button>
        </div>
    )
}

