
import { fetchUsersByRole } from '@/apiCalls'
import { Button, Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components'
import React, { useState, useEffect } from 'react'
import { SelectData } from '@/components';
import { UserType } from '@/schema';
import { fetchSingleBook } from '@/apiCalls/book';
import { IssueBookActions } from './issueBook';
import { HandInBookActions } from './handInBook';



export async function BookActions (props: BookActionsProps)  {

    const {bookNumber, action} = props;
    
    const {users, error} = await fetchUsersByRole("Traffic_Officer");
    const {book} = await fetchSingleBook(bookNumber)

   

  return (
   <div className='flex items-center w-max gap-4 self-end'>
        {
            book?.status === "New_Stock" ? users && <IssueBookActions action='Issue' book={book} officers={users}/> :
            book?.status === "Issued"  ? 
            <div className='flex items-center gap-4'>
                { users && <IssueBookActions action='Re_Issue' book={book} officers={users}/>}
                <HandInBookActions book={book}/>
            </div> :

            book?.status === "Re_Issued" && <HandInBookActions book={book}/>
        }
   </div>
  )
}

type BookActionsProps = {
    bookNumber: number,
    action: string
}