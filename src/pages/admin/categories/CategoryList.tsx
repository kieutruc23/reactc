/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined } from "@ant-design/icons";
import { AiOutlinePlusCircle } from "react-icons/ai";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Space, Table, Button, Tooltip, Popconfirm, Skeleton } from "antd";
import { toast } from "react-hot-toast";
import { useGetCategoriesQuery, useRemoveCategoryMutation } from "../../../api/category";

interface DataType {
  key?: string | number;
  name: string;
}

const CategoryList = () => {
  const {
    data: categories,
    isLoading: isLoadingFetching,
  } = useGetCategoriesQuery();
  const [removeCategory] = useRemoveCategoryMutation();
  const text = <span>Edit</span>;

  const confirm = (id: number | string) => {
    removeCategory(id);
    toast.success("Removed successfully");
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Hành động",
      key: "operation",
      align: "center",
      fixed: "right",
      width: 100,
      render: (record) => {
        return (
          <Space size="middle">
            <Link
              to={`/admin/categories/${record.id}/edit`}
              style={{ color: "rgba(13, 29, 49, 0.9)", fontSize: "18px" }}
            >
              <Tooltip placement="top" title={text}>
                <EditOutlined />
              </Tooltip>
            </Link>
            <Popconfirm
              placement="topRight"
              title="Are you sure to remove?"
              onConfirm={() => confirm(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                Xoá
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const data = categories?.map((category: any) => {
    return {
      key: category.id,
      ...category,
    };
  });
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Quản lý danh mục</h1>
        <button className=" text-white bg-sky-700 border-1 rounded-md px-3 py-2 hover:opacity-75">
          <Link
            to="/admin/categories/add"
            className="hover:text-white flex justify-between items-center gap-2"
          >
            <AiOutlinePlusCircle />
            Thêm mới
          </Link>
        </button>
      </div>
      {isLoadingFetching ? (
        <Skeleton />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default CategoryList;
