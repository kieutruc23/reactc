/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Form,
  Input,
  Skeleton,
  Select,
  Checkbox,
  Col,
  Row,
  InputNumber,
} from "antd";
// import axios from "axios";
import { IProduct } from "../../../interfaces/product";
import { toast } from "react-hot-toast";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../api/product";
const { TextArea } = Input;
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGetCategoriesQuery } from "../../../api/category";
import { useGetSizesQuery } from "../../../api/sizes";
import { ICategory } from "../../../interfaces/category";
import { ISize } from "../../../interfaces/size";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

const ProductEdit = () => {
  const [form] = Form.useForm();
  const [, setImage] = useState("");
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: isLoadingProduct } = useGetProductByIdQuery(
    id || ""
  );
  const { data: categories } = useGetCategoriesQuery();
  const { data: sizes } = useGetSizesQuery();
  const [updateProduct] = useUpdateProductMutation();
  const router = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   form.setFieldsValue({
  //     name: product?.name,
  //     image: product?.image,
  //     desc: product?.desc,
  //     detail: product?.detail,
  //     price: product?.price,

  //   });
  // }, [product, form]);

  // const SubmitImage = async () => {
  //   const data = new FormData();
  //   const cloud_name = "ddbdu6zip";
  //   const upload_preset = "vithoang";
  //   data.append("file", image);
  //   data.append("upload_preset", upload_preset);
  //   data.append("cloud_name", cloud_name);
  //   data.append("folder", "portfolio");
  //   const takeData = await axios
  //     .post(`https://api.cloudinary.com/v1_1/ddbdu6zip/image/upload`, data)
  //     .then((data: any) => data);
  //   return takeData.data.secure_url;
  // };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };

  const onFinish = async (values: IProduct) => {
    setIsLoading(true);
    try {
      // values.image =  await SubmitImage();

      updateProduct({ ...values, id: id });
      toast.success("Cập nhật sản phẩm thành công");
    } catch {
      toast.error("Đã có lỗi xảy ra!");
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
  return (
    <div>
      <h1 className="text-xl font-semibold">Cập nhật sản phẩm</h1>
      {isLoadingProduct ? (
        <Skeleton />
      ) : (
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 800, alignItems: "center" }}
          onFinish={onFinish}
          initialValues={product}
        >
          <Form.Item label="Tên" name="name" required>
            <Input />
          </Form.Item>
          <Form.Item label="Ảnh" name="image" valuePropName="file">
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
              <img src={product?.image} alt="" id="preview-image"></img>
            </div>
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[
              {
                required: true,
                type: "number",
                message: "Phải nhập vào là 1 số",
              },
            ]}
          >
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
                  <AiOutlineLoading3Quarters
                    className="animate-spin"
                    size={20}
                  />
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

export default ProductEdit;
