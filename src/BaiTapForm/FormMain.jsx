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
            mssv: "VD: 12AB",
            tenSv: "",
            email: "",
            soDienThoai: "",
            gioiTinh: "",
            ngaySinh: "",
            matKhau: "",
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
            matKhau: yup.string().matches(/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/, "Mật khẩu gồm 1 chữ cái hoa, 1 chữ cái thường, 1 ký tự đặc biệt, nằm trong khoảng 6-12 ký tự")
            .min(6, "Tối thiểu 6 ký tự").max(12, "Tối thiểu 12 ký tự")
            .required("Vui lòng không bỏ trống"),
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
    <div className='container mx-auto px-3'>
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
                    
                    <InputCustom contentLable={"MSSV"} placeHolder={"Nhập mã số nhân viên"} 
                    name={"mssv"} value={values.mssv} onChange={handleChange}
                    error={errors.mssv} touched={touched.mssv} onBlur={handleBlur}/>

                    <InputCustom contentLable={"Tên SV"} placeHolder={"Nhập tên nhân viên"} 
                    name={"tenSv"} value={values.tenSv} onChange={handleChange} onBlur={handleBlur}
                    error={errors.tenSv} touched={touched.tenSv}/>

                    <InputCustom contentLable={"Email"} placeHolder={"Nhập Email nhân viên"} 
                    name={"email"} value={values.email} onChange={handleChange} onBlur={handleBlur}
                    error={errors.email} touched={touched.email}/>
                    {/* {touched.email ? <p className='text-red-600'>{errors.email}</p> : null} */}

                    <InputCustom contentLable={"Số Điện Thoại"} placeHolder={"Nhập sô dth nhân viên"} 
                    name={"soDienThoai"} value={values.soDienThoai} onChange={handleChange}/>

                    <div className="">
                    
                        <label className="block mb-2 text-sm font-medium text-gray-900">Giới Tính</label>
                        <select onChange={handleChange}  
                            value={values.gioiTinh}
                             name='gioiTinh' id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Chọn giới tính</option>
                        <option value="nam">Nam</option>
                        <option value="nu">Nữ</option>
                        <option value="unknow">Chưa biết</option>
                        </select> 
                    </div>

                    <div className="">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Ngày sinh</label>
                    <DatePicker 
                        onChange={(date, dateString) => {
                            console.log(dateString);
                            //      date và dateString là các thuộc tính của API formik
                            //      setFieldValue cung cấp khả năng cập nhật dữ liệu cho thuộc tính được quản lý bởi formik
                            //      gọi tói 2 giá trị : tên thuộc tính cần cập nhật và dư liệu cập nhật 
                            setFieldValue("ngaySinh", dateString);
                        }}
                        format="DD-MM-YYYY"
                        // value={values.ngaySinh}
                    />
                    </div>

                    <InputCustom contentLable={"Mật Khẩu"} placeHolder={"Nhập mật khẩu "} 
                    name={"matKhau"} value={values.matKhau} onChange={handleChange} classWrapper={"col-span-2"}
                    error={errors.matKhau} touched={touched.matKhau} onBlur={handleBlur}/>
                    {/* <div className='col-span-2'>

                        <label className="block mb-2 text-sm font-medium text-gray-900 ">
                            Mật khẩu
                        </label>
                        <input  onChange={handleChange}  
                            value={values.matKhau} 
                            type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                            placeholder="Nhập mật khẩu" 
                            name='matKhau'/>
                    </div> */}

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