import { DatePicker } from 'antd'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import InputCustom from './InputCustom';
import { getValueLocalStorage, setValueLocalStorage } from '../utils/util';
import * as yup from "yup"
import TableSinhVien from './TableSinhVien';

const FormMain = () => {
  const [arrSinhVien, setArrSinhVien] = useState([]);
            //      tạo state mới dùng để sư dụng chức năng sửa
    const [sinhVien, setSinhVien] = useState();
    // const [value, setValue] =useState("");  
    const {handleChange, values, handleSubmit, setFieldValue, resetForm,
            errors, touched, handleBlur, setValues
            //      blur là sự kiện kiểm tra người dùng bấm vào input
            //      touched có 2 giá trị là : true và false . phụ thuộc vào handleBlur
    } = useFormik({
        //  initiaValue đóng vai trò lưu trữ dữ liệu
        //  initiaValue sẽ chứa 1 object trong object sẽ có các thuộc tính trùng với
        //      thuộc tính name của Form
        initialValues: {
            mssv: "VD:12AB",
            tenSv: "",
            email: "",
            soDienThoai: "",
        },
        onSubmit: (values, {resetForm}) => {
            //              resetForm là sự kiện sẽ clear đi dữ liệu khi người dùng thực hiện xong
            console.log(values);
            //          Sử dụng state để lưu trữ dữ liệu vào mản
            //  cách 1:
            //  tạo ra vùng nhớ mới và clone ra một mảng newArrSinhVien
            //      let newArrSinhVien = [...arrSinhVien]
            //      newArrSinhVien.push(values);
            // gọi tới setArrSinhVien để thay đổi giá trị mới
            //      setArrSinhVien(newArrSinhVien);

            //      Tạo vào set dữ liệu localStorage
            //      Tọa ra một mảng mới để lưu trữ dữ liệu từ mảng cũ, để hiển thị các dữ liệu mới nhất lên gioa diện
            //  vì sử dụng mang cũ khi cập nhật dữ liệu lần đầu thì mảng sẽ có dữ liệu là rỗng
            const newArrSinhVien = [...arrSinhVien, values];
            setArrSinhVien(newArrSinhVien);

            //      Cách 2
            //          Nếu không sử dụng localStorage
            // setArrSinhVien([...arrSinhVien, values]);

                //      localSrotage
            setValueLocalStorage("arrSinhVien", newArrSinhVien);

            resetForm();
        },
        //      Yup với formik
        validationSchema: yup.object({
            email: yup.string().email("Vui lòng nhập đúng định dạng email").required("Vui lòng nhập dữ liệu"),
            mssv: yup.string().min(3, "Tối thiểu 3 ký tự").max(8, "Nhiều nhất 8 ký tự").required("Vui lòng không bỏ trống"),
            tenSv: yup.string().min(1, "Tối thiểu 1 ký tự").max(20, "Tối thiểu 20 ký tự").required("Vui lòng không bỏ trống"),
            soDienThoai: yup.string().matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,"Nhập đúng số điện thoại vùng Việt Nam").required("Vui lòng không bỏ trống"),           
        }),

    });      

    // localStorage
    //      useEffect
    useEffect(() => {
        const data = getValueLocalStorage("arrSinhVien");
            //          nếu data có dữ liệu thì gọi đến setArrSinhVien để truyền data
        data && setArrSinhVien(data);
    }, []);

            //      useEffect sửa
            //      Gọi đến setValues cảu Formk để hiển thị dữ liệu lên lại giao diện
    useEffect(() => {
        //      xét điều kiện nhanVien không có dử liệu ban đầu khi table rỗng
        //      nếu table rỗng thì useEffect sẽ không chạy. 
        //      nhanVien có dữ liệu thì mới chạy và lý setValues
        sinhVien && setValues(sinhVien);
    }, [sinhVien]);

    //      Tạo function xóa SV
    const handleDeleteSinhVien = (mssv) => {
        const newArrSinhVien = [...arrSinhVien];
            //      Tạo một biến index và sử dụng findIndex để tìm kiếm trong mảng
            //  ở phần tử item là msnv trùng với mssv của thám số thì xóa khỏi mảng
        let index = arrSinhVien.findIndex((item) => item.mssv == mssv)
        if (index != -1) {
            newArrSinhVien.splice(index,1);
            setArrSinhVien(newArrSinhVien);
            //      Gọi tới setValueLocalSrorage để thay đổi
            //                
            setValueLocalStorage("arrSinhVien", arrSinhVien);
        }
    }
    
            //      chức năng sửa 
    const handleGetSinhVien = (sinhVien) => {
        setSinhVien(sinhVien);
    }
  return (
    <div className='container mx-auto px-8'>
        {/* <label htmlFor="">Nhập Thông Báo</label>
        <input type="text"
        placeholder='Nhập thông báo'
        className='p-2 border border-black'
        onChange={(e) => {
         setValue(e.target.value);
        }}
        value={value} /> */}

        {/*         Quản lý sinh viên: tên, msnv , email, sdt */}
        <h2 style={{fontSize: "20px"}} className='text-center my-3'>Bài tập quản lý dữ liệu Form qua thư viện Formik và Yup</h2>
        <div className="">
            {/*         handSunmit là một chức năng của formik */}
            <form action="" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3">
                    
                    <InputCustom contentLable={"MSSV"} placeHolder={"Nhập mã số sinh viên"} 
                    name={"mssv"} value={values.mssv} onChange={handleChange}
                    error={errors.mssv} touched={touched.mssv} onBlur={handleBlur}/>

                    <InputCustom contentLable={"Tên SV"} placeHolder={"Nhập tên sinh viên"} 
                    name={"tenSv"} value={values.tenSv} onChange={handleChange} onBlur={handleBlur}
                    error={errors.tenSv} touched={touched.tenSv}/>

                    <InputCustom contentLable={"Email"} placeHolder={"Nhập Email sinh viên"} 
                    name={"email"} value={values.email} onChange={handleChange} onBlur={handleBlur}
                    error={errors.email} touched={touched.email}/>
                    {/* {touched.email ? <p className='text-red-600'>{errors.email}</p> : null} */}

                    <InputCustom contentLable={"Số Điện Thoại"} placeHolder={"Nhập sô diện thoai sinh viên"} 
                    name={"soDienThoai"} value={values.soDienThoai} onChange={handleChange}
                    error={errors.soDienThoai} touched={touched.soDienThoai} onBlur={handleBlur}/>

                    

                    <div className="space-x-5">
                        <button type="submit" className='py-2 px-5 bg-black text-white rounded-lg'>Thêm Sinh Viên </button>

                        <button type="button" onClick={() => {resetForm()}} className='py-2 px-5 bg-red-500 text-white rounded-lg'>Reset</button>
                        <button type="button" onClick={() => {
                            //  thuộc tính isvalid của formik
                            if(!isValid){
                                return;
                        }
                        // Xử lý dữ liệu
                        }
                        // 
                        } className='py-2 px-5 bg-blue-400 text-white rounded-lg'>Cập nhật</button>
                    </div>
                </div>
            </form>
        </div>
        <TableSinhVien arrSinhVien={arrSinhVien} handleDeleteSinhVien={handleDeleteSinhVien} handleGetSinhVien={handleGetSinhVien}/>
    </div>
  )
}

export default FormMain