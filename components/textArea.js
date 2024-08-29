import React from 'react'

export default function TextArea({ name, className, value, onChange }) {
  return (
    <div className='flex flex-col gap-3 w-full'>
      <label className='font-normal text-gray-600 text-lg' for={name}>{name}</label>
      <textarea
        className={'border border-gray-800 p-2 ' + className}
        id={name}
        name={name}
        value={value}
        rows={5}
        onChange={onChange}
      />
    </div>
  )
}
