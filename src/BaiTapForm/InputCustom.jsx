import React from 'react'

const InputCustom = ({contentLable, placeHolder, name, value, onChange, type="text",
  classWrapper="", onBlur, error, touched
  
  }) => {
  return (
    <div className={classWrapper}>
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          {contentLable}
        </label>
        <input onChange={onChange}  
        value={value}
        type={type} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm 
        rounded-lg block w-full p-2.5 
        ${error && touched ? "focus: border-red-600" : "focus: border-blue-300"}`} 
        placeholder={placeHolder} 
        name={name}
        onBlur={onBlur}
        />
        {/*     kiểm tra dùng toán tử điều kiện để kiểm tra: nếu error với touced được truyền vào thì hiển thị thông báo lỗi */}
        {error && touched && <p className='text-red-600'>{error}</p>}
    </div>
  )
}

export default InputCustom