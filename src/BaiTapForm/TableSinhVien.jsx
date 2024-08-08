import React from 'react'
import { Space, Table, Tag } from 'antd';

const TableSinhVien = ({arrNhanVien, handleDeleteNhanVien, handleGetNhanVien}) => {
    const columns = [
        {
          title: 'Msnv',
          dataIndex: 'msnv',
          key: 'name',
          // render: (text,index,record) => <a>{text}</a>,
        },
        {
          title: 'Tên nhân viên',
          dataIndex: 'tenNv',
          key: 'age',
        },
        {
          title: 'Số điện thoại',
          dataIndex: 'soDienThoai',
          key: 'address',
        },
        {
          title: 'Giới tính',
          key: 'tags',
          dataIndex: 'gioiTinh',
          render: (text) => {
              let colorTag = text == "nam" ? "geekblue" : text == "nu" ? "volcano" : "loser";
              return <Tag color={colorTag}>{text.toUpperCase()}</Tag>
          }
        },
        {
          title: 'Ngày Sinh',
          key: 'action',
          dataIndex: 'ngaySinh',
        },
        {
          title: 'Hành động',
          render: (text, record, index) => {
            //      text, record , index là các giá trị định danh các phần tử của table
            //    record : là obfect từng hàng
              return <>
              <button onClick={() => {
                handleDeleteNhanVien(record.msnv);
              }} className='py-2 px-5 bg-red-500 text-white rounded-md'>Xóa</button>
              <button onClick={() => {
                handleGetNhanVien(record);
              }} className='py-2 px-5 bg-yellow-500 text-white rounded-md ml-3'>Sửa</button>
              </>
          }
        }
      ];
  return <Table columns={columns} dataSource={arrNhanVien}/>
}

export default TableSinhVien