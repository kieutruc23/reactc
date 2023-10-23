import { useState } from "react";
import { Form, Input, Select, Checkbox, Col, Row, InputNumber } from "antd";
import axios from "axios";
import { IProduct } from "../../../interfaces/product";
import { toast } from "react-hot-toast";
import { useAddProductMutation } from "../../../api/product";
const { TextArea } = Input;
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGetCategoriesQuery } from "../../../api/category";
import { ICategory } from "../../../interfaces/category";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { useGetSizesQuery } from "../../../api/sizes";
import { ISize } from "../../../interfaces/size";

const ProductAdd = () => {
  const [form] = Form.useForm();
  const [image, setImage] = useState("");
  const [addProduct] = useAddProductMutation();
  const { data: categories } = useGetCategoriesQuery();
  const { data: sizes } = useGetSizesQuery();
  const router = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const SubmitImage = async () => {
    const data = new FormData();
    const cloud_name = "ddbdu6zip";
    const upload_preset = "vithoang";
    data.append("file", image);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);
    data.append("folder", "portfolio");
    const takeData = await axios
      .post(`https://api.cloudinary.com/v1_1/ddbdu6zip/image/upload`, data)
      .then((data: any) => data);
    return takeData.data.secure_url;
  };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };

  const onFinish = async (product: IProduct) => {
    setIsLoading(true);
    try {
      product.image = await SubmitImage();
      addProduct(product)
        .unwrap()
        .then(() => {
          form.resetFields();
          toast.success("Thêm sản phẩm thành công");
        });
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
      router("/admin/products");
    }
  };

  // Preview image
  const inputFile: any = document.getElementById("file-input");
  const previewImage: any = document.getElementById("preview-image");

  inputFile?.addEventListener("change", function () {
    const file = inputFile.files[0];
    const reader = new FileReader();

    reader?.addEventListener("load", function () {
      previewImage.src = reader.result;
    });

    if (file) {
      reader.readAsDataURL(file);
    } else {
      previewImage.src = "";
    }
  });

  const validateMessages = {
    required: "Không được bỏ trống!",
    types: {
      number: "Phải nhập vào là một số!",
    },
    number: {
      range: "Không là số âm",
    },
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Thêm mới sản phẩm</h1>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 800, alignItems: "center" }}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          required
          rules={[
            { required: true },
            { min: 3, message: "Nhập ít nhất 3 ký tự !" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ảnh"
          name="image"
          required
          rules={[{ required: true }]}
          valuePropName="file"
        >
          <div>
            <div className="image-upload">
              <label htmlFor="file-input">
                <i className="bx bx-image-add"></i>
              </label>
              <input
                id="file-input"
                type="file"
                onChange={(e: any) => setImage(e.target.files[0])}
              />
            </div>
            <img src="" alt="" id="preview-image"></img>
          </div>
        </Form.Item>
        <Form.Item label="Giá" name="price" rules={[
          {
            required: true,
            type: 'number',
            message: 'Phải nhập vào là 1 số',
          },
        ]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Mô tả" name="desc">
          <Input />
        </Form.Item>
        <Form.Item label="Chi tiết" name="detail">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Kích cỡ" required name="sizeIds">
          <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
            <Row>
              {sizes?.map((item: ISize) => {
                return (
                  <Col span={8} key={item.id}>
                    <Checkbox value={item.id}>{item.size}</Checkbox>
                  </Col>
                );
              })}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="Danh mục" required name="categoryId">
          <Select>
            {categories?.map((category: ICategory) => {
              return (
                <Select.Option
                  key={category.id}
                  value={category.id}
                  label={category.name}
                >
                  {category.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        
        <Form.Item label="Hành động">
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="text-white bg-sky-700 border-1 rounded-md px-2 py-1 hover:opacity-75"
              disabled={isLoading}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" size={20} />
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

export default ProductAdd;
