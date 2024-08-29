import React from 'react'

export default function Input({ name, value, type, className, onChange, placeholder }) {
  return (
    <div className='flex flex-col gap-3 w-full'>
      <label className=' text-gray-600 text-lg font-medium' htmlFor={name}>{name}</label>
      <input
        className={'border border-gray-800 p-2 ' + className}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}
