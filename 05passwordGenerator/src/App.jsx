import { useState,useRef,useCallback,useEffect } from 'react'

function App() {

  const [password,setPassword] = useState("");
  const [numberAllowed,setNumberAllowed]  = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [length , setLength]  = useState(8);

  //useRef Hook
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass="";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += '0123456789';
    if(charAllowed) str += '!@#$%^&*()_{}|+';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    
    setPassword(pass);

  },[length,numberAllowed,charAllowed,setPassword])

  const copyToClipBoard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }

  useEffect(()=>{
    generatePassword();
  },[length,charAllowed,numberAllowed,generatePassword])

  return (
    <>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
          <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
           type="text" 
           className='outline-none w-full py-1 px-3 bg-gray-200'
           value={password}
           placeholder='password'
           readOnly  
           ref={passwordRef}
          />
          <button
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={copyToClipBoard}
          > Copy
          </button>

        </div>
        <div className='flex text-sm gap-x-2' >
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label >
              Length: {length}
            </label>
          </div>

          <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
          />
          <label >
            Numbers
          </label>
          </div>

           <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={charAllowed}
          id='characterInput'
          className='cursor-pointer'
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
          />
          <label >
            Characters
          </label>
          </div>

        </div>
        </div>
    </>
  )
}

export default App
