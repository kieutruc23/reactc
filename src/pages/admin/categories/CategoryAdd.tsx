/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Form, Input } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAddCategoryMutation } from "../../../api/category";
import { ICategory } from "../../../interfaces/category";

type FieldType = {
  name: string;
};

const CategoryAdd = () => {
  const [form] = Form.useForm();
  const [addCategory] = useAddCategoryMutation();
  const router = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = async (category: ICategory) => {
    setIsLoading(true)
    try {
      addCategory(category).unwrap()
      .then(() => {
        form.resetFields();
        toast.success("Thêm thành công");
      })
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false)
      router("/admin/categories");
    }
  };

  const validateMessages = {
    required: "Không được bỏ trống!",
    types: {
      number: "Phải nhập vào là một số!",
    },
    number: {
      range: "Không được nhập số âm",
    },
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Thêm mới danh mục</h1>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 800, alignItems: "center" }}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item<FieldType>
          label="Tên"
          name="name"
          required
          rules={[
            { required: true },
            { min: 3, message: "Nhập ít nhất 3 ký tự !" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Hành động">
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="text-white bg-sky-700 border-1 rounded-md px-2 py-1 hover:opacity-75"
              disabled={isLoading}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" size={20}/>
              ) : (
                "Thêm"
              )}
            </button>
            <button
              type="reset"
              className="text-white border-1 rounded-md px-2 py-1 bg-slate-800 hover:opacity-75"
            >
              Tải lại
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CategoryAdd;
