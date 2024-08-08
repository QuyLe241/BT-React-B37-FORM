import { DatePicker } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import InputCustom from './InputCustom';
import { getValueLocalStorage, setValueLocalStorage } from '../utils/util';
import * as yup from 'yup';
import TableSinhVien from './TableSinhVien';

const FormMain = () => {
  const [arrSinhVien, setArrSinhVien] = useState([]);
  const [sinhVien, setSinhVien] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false); //

  const {
    handleChange,
    values,
    handleSubmit,
    setFieldValue,
    resetForm,
    errors,
    touched,
    handleBlur,
    setValues,
    isValid,
  } = useFormik({
    initialValues: {
      mssv: 'VD:12AB',
      tenSv: '',
      email: '',
      soDienThoai: '',
    },
    onSubmit: (values, { resetForm }) => {
      if (editMode) {
        // Update sinh viên
        const updatedArrSinhVien = arrSinhVien.map((sv) =>
          sv.mssv === values.mssv ? values : sv
        );
        setArrSinhVien(updatedArrSinhVien);
        setValueLocalStorage('arrSinhVien', updatedArrSinhVien);
        setEditMode(false); 
      } else {
        // Add sinh viên
        const newArrSinhVien = [...arrSinhVien, values];
        setArrSinhVien(newArrSinhVien);
        setValueLocalStorage('arrSinhVien', newArrSinhVien);
      }
      resetForm();
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Vui lòng nhập đúng định dạng email')
        .required('Vui lòng nhập dữ liệu'),
      mssv: yup
        .string()
        .min(3, 'Tối thiểu 3 ký tự')
        .max(8, 'Nhiều nhất 8 ký tự')
        .required('Vui lòng không bỏ trống'),
      tenSv: yup
        .string()
        .min(1, 'Tối thiểu 1 ký tự')
        .max(20, 'Tối thiểu 20 ký tự')
        .required('Vui lòng không bỏ trống'),
      soDienThoai: yup
        .string()
        .matches(
          /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
          'Nhập đúng số điện thoại vùng Việt Nam'
        )
        .required('Vui lòng không bỏ trống'),
    }),
  });

  useEffect(() => {
    const data = getValueLocalStorage('arrSinhVien');
    data && setArrSinhVien(data);
  }, []);

  useEffect(() => {
    sinhVien && setValues(sinhVien);
  }, [sinhVien, setValues]);

  const handleDeleteSinhVien = (mssv) => {
    const newArrSinhVien = arrSinhVien.filter((item) => item.mssv !== mssv);
    setArrSinhVien(newArrSinhVien);
    setValueLocalStorage('arrSinhVien', newArrSinhVien);
  };

  const handleGetSinhVien = (sinhVien) => {
    setSinhVien(sinhVien);
    setEditMode(true);
  };

  const filteredSinhVien = arrSinhVien.filter(
    (sv) =>
      sv.tenSv.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sv.mssv.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-8">
      <h2 style={{ fontSize: '20px' }} className="text-center my-3">
        Bài tập quản lý dữ liệu Form qua thư viện Formik và Yup
      </h2>

      <div className="">
        <form action="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <InputCustom
              contentLable={'MSSV'}
              placeHolder={'Nhập mã số sinh viên'}
              name={'mssv'}
              value={values.mssv}
              onChange={handleChange}
              error={errors.mssv}
              touched={touched.mssv}
              onBlur={handleBlur}
              disabled={editMode} // Disable editing of MSSV in edit mode
            />

            <InputCustom
              contentLable={'Tên SV'}
              placeHolder={'Nhập tên sinh viên'}
              name={'tenSv'}
              value={values.tenSv}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.tenSv}
              touched={touched.tenSv}
            />

            <InputCustom
              contentLable={'Email'}
              placeHolder={'Nhập Email sinh viên'}
              name={'email'}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
            />

            <InputCustom
              contentLable={'Số Điện Thoại'}
              placeHolder={'Nhập sô diện thoai sinh viên'}
              name={'soDienThoai'}
              value={values.soDienThoai}
              onChange={handleChange}
              error={errors.soDienThoai}
              touched={touched.soDienThoai}
              onBlur={handleBlur}
            />

            <div className="space-x-5">
              <button
                type="submit"
                className="py-2 px-5 bg-green-600 text-white rounded-lg"
                onClick={() => {
                  {editMode ? updatedArrSinhVien() : null}
                }}
              >
                {editMode ? 'Cập nhật' : 'Thêm Sinh Viên'}
              </button>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setEditMode(false); // Exit edit mode on reset
                }}
                className="py-2 px-5 bg-red-500 text-white rounded-lg"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* Search input */}
      <div className="my-5">
        <input
          type="text"
          placeholder="Nhập để tìm kiếm sinh viên"
          className="p-2 border border-gray-300 rounded-lg w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> 

      {/* Table */}
      <TableSinhVien
        arrSinhVien={filteredSinhVien}
        handleDeleteSinhVien={handleDeleteSinhVien}
        handleGetSinhVien={handleGetSinhVien}
      />
    </div>
  );
};

export default FormMain;
