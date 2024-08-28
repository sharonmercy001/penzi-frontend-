import {Avatar, Button} from "@mantine/core";
import {AiFillHeart} from "react-icons/ai";
import {useCookies} from "react-cookie";


export default function NavBar() {
    const [_cookie, _setCookie, removeCookie] = useCookies(['user_id', 'phone_number'])
    return (
        <div className={'w-full h-[70px] p-2 bg-blue-600 flex text-white'}>
            <div className={'w-max m-auto font-bold flex gap-1 flex-wrap'}>
                <p className={'m-auto'}>On-fon Dating Bot </p>
                <span className={'flex m-auto'}>
                    <p className={'m-auto'}>(Penzi </p><AiFillHeart className={'m-auto'}/><p>)</p>
                </span>
                <Avatar color={'white'} className={'m-auto w-full'}/>
            </div>
            <Button onClick={() => {
                removeCookie('user_id')
                removeCookie('phone_number')
            }} variant={'outline'} radius={'xl'} color={'white'} className={'m-auto'}>
                Sign out
            </Button>
        </div>
    )
}

