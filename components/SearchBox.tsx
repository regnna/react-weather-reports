import React from 'react'
import { Form } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Ghost } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

function SearchBox(props: Props) {
  return (
    
    <form 
    onSubmit={props.onSubmit}
    className={cn("flex relative items-center justify-center h-10",props.className)}>
        <Input type='text'
        onChange={props.onChange}
        value={props.value}
        placeholder='search location ...' className={cn('px-4 mx-4 focus:border-y-indigo-800 ',props.className)}/>
        {/* <input type='text'/> */}
        <Button  
        variant="ghost" className=''
      size="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </Button>
    </form>
  )
}

export default SearchBox