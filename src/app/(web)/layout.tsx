
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SideNav, TopNav } from '@/components'
import { UiContextProvider, UserContextProvider, getAuth } from '@/context'
import { redirect, useRouter } from 'next/navigation'
import { Toaster } from '@/components'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NHFC',
  description: 'Alfred Duma Municipality Book management system',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='overflow-hidden'>
      <body className={`${inter.className} `}>
        <Content>
        {children}
        </Content>
      </body>
    </html>
  )
}

async function Content({children}: any) {
  const auth = await getAuth();
  //@ts-ignore
  const expiry = new Date(auth?.expiresAt)
  const now = new Date(Date.now());
  //@ts-ignore
  const timeDifference = expiry - now;
  if(!auth) {
    
    return (
      <UserContextProvider>  
        <UiContextProvider>

          {children}
        </UiContextProvider>
      </UserContextProvider>
    )
  }
  if(timeDifference < 0) {
    
    return (
      <UserContextProvider>  
        <UiContextProvider>

          {children}
        </UiContextProvider>
      </UserContextProvider>
    )
  }

  return (
    
    

    <UserContextProvider>  
        <UiContextProvider>

          <div className='flex p min-w-screen overflow-clip bg-black'>
            

                <SideNav /> 
              
              <div className=' flex flex-col flex-1 h-screen min-w-0 '>
                <TopNav/>
                <div className='px-2 md:px-6 bg-[#f7f7f7] h-full overflow-y-auto min-w-full py-4 pt-8'><Toaster /> {children}</div>
              </div>
          </div>
        </UiContextProvider>
      </UserContextProvider> 
   
      
  )
}

