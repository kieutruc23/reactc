/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Form, Input, Skeleton } from "antd";
import { IProduct } from "../../../interfaces/product";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from "../../../api/category";

const CategoryEdit = () => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading: isLoadingCategory } = useGetCategoryByIdQuery(id || "");
  const [updateCategory] = useUpdateCategoryMutation();
  const router = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   form.setFieldsValue({
  //     name: category?.name,
  //   });
  // }, [category, form]);

  const onFinish = async (values: IProduct) => {
    setIsLoading(true)
    try {
      updateCategory({ ...values, id: id });
      toast.success("Cập nhật thành công");
    } catch {
      toast.error("Đã có lỗi xảy ra!");
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
      <h1 className="text-xl font-semibold">Cập nhật danh mục</h1>
      {isLoadingCategory ? (
        <Skeleton />
      ) : (
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 800, alignItems: "center" }}
          onFinish={onFinish}
          initialValues={category}
          validateMessages={validateMessages}
        >
          <Form.Item label="Tên" name="name" required rules={[
            { required: true },
            { min: 3, message: "Nhập ít nhất 3 ký tự !" },
          ]}>
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
                "Sửa"
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
      )}
    </div>
  );
};

export default CategoryEdit;
