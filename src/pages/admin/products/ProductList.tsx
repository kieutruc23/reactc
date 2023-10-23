/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { EditOutlined } from "@ant-design/icons";
import { AiOutlinePlusCircle } from "react-icons/ai";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Space, Table, Button, Tooltip, Popconfirm, Skeleton } from "antd";
import {
  useGetProductsQuery,
  useRemoveProductMutation,
} from "../../../api/product";
import { toast } from "react-hot-toast";
// import { useGetCategoryByIdQuery } from "../../../api/category";

interface DataType {
  key: string | number;
  name: string;
  image: string;
  price: number;
  desc: string;
  detail: string;
  categoryId: string;
  sizeIds: [];
}

const ProductList = () => {
  const { data: products, isLoading: isLoadingFetching } =
    useGetProductsQuery();
  const [removeProduct] = useRemoveProductMutation();
  const text = <span>Edit</span>;

  const confirm = (id: number | string) => {
    removeProduct(id);
    toast.success("Removed successfully");
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: "250px",
      render: (image) => (
        <img className="image" src={image} alt="image of product" />
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
    },
    // {
    //   title: "Danh mục",
    //   dataIndex: "categoryId",
    //   key: "categoryId",
    // },
    // {
    //   title: "Kích cỡ",
    //   dataIndex: "sizeIds",
    //   key: "sizeIds",
    //   render: (record) => {
    //     return record?.map((item: any) => item).join(",");
    //   },
    // },
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
              to={`/admin/products/${record.id}/edit`}
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
  const data = products?.map((product: any) => {
    return {
      key: product.id,
      ...product,
    };
  });
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Quản lý sản phẩm</h1>
        <button className=" text-white bg-sky-700 border-1 rounded-md px-3 py-2 hover:opacity-75">
          <Link
            to="/admin/products/add"
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
          // scroll={{ x: 1500, y: 500 }}
        />
      )}
    </div>
  );
};

export default ProductList;
