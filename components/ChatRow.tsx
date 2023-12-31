
import { db } from '@/firebase';
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/solid';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';


type Props = {
    id:string;

}


function ChatRow({id}:Props) {
    const pathname = usePathname();
    const router = useRouter();
    const [active,setActive] = useState(false);
    const [messages] = useCollection(
        collection(db,'users',"ls.ai.mitraj",'chats',id,'messages')
    );

    useEffect(()=>{
        if(!pathname ) return;
        setActive(pathname.includes(id));
    },[pathname]);

    const removeChat = async() => {
        await deleteDoc(doc(db,'users',"ls.ai.mitraj",'chats',id));
        router.replace("/");   
    }

  return (
    <Link href={`/chat/${id}`} className={`chatRow justify-center ${active && "bg-gray-700/50"}`}>
        <ChatBubbleLeftIcon className = "w-5 h-5 "/>
        <p className='flex-1 hidden md:inline-flex truncate'>
            {messages?.docs[messages?.docs.length-1]?.data().text || "New Chat"}
        </p>
        <TrashIcon onClick = {removeChat} className="w-5 h-5 text-gray-700 hover:text-red-700"/>
    </Link>
  )
  
}

export default ChatRow