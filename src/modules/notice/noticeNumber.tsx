"use client"

import { Loader } from '@/components';
import url from '@/lib/apiUrl'
import axios from 'axios'
import React , {useState, useEffect} from 'react'



export function NoticeNumber (props: NoticeNumberProps)  {
    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const {bookNumber, check, noticeNumber}  = props
    const constant = 337

    useEffect(() => {
        const fetchBookType = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`${url}/books/${bookNumber}`);
                const bookType = res.data.bookType
                setNumber(`${bookType}/${noticeNumber}/${constant}/${check}`)
                setLoading(false);
            } catch (error:any) {
                setLoading(false);
            }
            
        }
    
        fetchBookType()
    }, [props])

  return (
    loading ? <Loader size="xs" className="min-w-0 max-w-[20px] max-h-[20px] border-blue-500"/> :
    <p className="text-xs font-normal text-inherit">{number}</p>
  )
}

type NoticeNumberProps = {
    bookNumber: number,
    check: number,
    noticeNumber: number
}