import { Button } from '@/components'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'



export const FormPagination = (props: FormPaginationProps) => {
    
    const {setFormPage, formPage} = props
    const prevPage = () => {
        setFormPage((prev: number) => prev > 1 ? prev - 1 : prev)
      }
      const nextPage = () => {
        setFormPage((prev: number) => prev < 4 ? prev + 1 : prev)
      }
  return (
    <div className="flex items-center  top-4 left-4 w-full justify-between">
            {formPage !== 1 && <Button type="button" variant="ghost" className="border border-blue-300 hover:border-none"
              onClick={prevPage}
            >
              <ChevronLeft size={15}/>
              <p className="text-xs font-semibold">Prev page</p>
            </Button>}

            <p className="text-sm text-blue-500 font-semibold">Page {formPage} of 4</p>
            {formPage !== 4 && <Button type="button" variant="ghost" className="border border-blue-300 hover:border-none"
              onClick={nextPage}
            >
              <p className="text-xs font-semibold">Next page</p>
              <ChevronRight size={15}/>
            </Button>}
        </div>
  )
}

type FormPaginationProps = {
    setFormPage: React.Dispatch<React.SetStateAction<any>>;
    formPage: number
}


