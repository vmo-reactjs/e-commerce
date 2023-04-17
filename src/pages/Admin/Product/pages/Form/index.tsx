import Button from '@/components/Button';
import Input from '@/components/Input';
import { categoryService } from '@/services/categoryService';
import { ICategory } from '@/types/category.type';
import { addProductSchema } from '@/utils/admin-rules';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProductFormStyle } from './ProductForm.styled';

interface IProps {
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string;
}

const ProductForm = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const params = {};
        const response = await categoryService.getCategories(params);
        setCategories(response.data.items);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    };

    getAllCategories();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IProps>({
    resolver: yupResolver(addProductSchema),
  });

  const onSubmit = (data: IProps) => {
    console.log(data);
  };

  return (
    <ProductFormStyle>
      <h2 className="head">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Input
          name="title"
          label="Tiêu đề"
          placeholder="Tiêu đề"
          type="text"
          required
          register={register}
          errorMessage={errors.title?.message}
        />
        <Input
          name="price"
          label="Giá"
          placeholder="Giá"
          type="text"
          required
          register={register}
          errorMessage={errors.price?.message}
        />
        <Input
          name="stock"
          label="Số lượng"
          placeholder="Số lượng"
          type="text"
          required
          register={register}
          errorMessage={errors.stock?.message}
        />
        <Input
          name="brand"
          label="Thương hiệu"
          placeholder="Thương hiệu"
          type="text"
          required
          register={register}
          errorMessage={errors.brand?.message}
        />
        <div className="form__group">
          <label htmlFor="city" className="label">
            Danh mục<span>*</span>
          </label>
          <select name="city" id="city" className="form-select">
            <option value="">Chọn danh mục</option>
            {categories.map((category: ICategory) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
          <span className="error"></span>
        </div>
        <div className="form__group">
          <label htmlFor="description">
            Mô tả <span>*</span>
          </label>
          <textarea id="description" {...register('description')}></textarea>
          <p className="error">{errors.description?.message}</p>
        </div>
        <div className="form__group">
          <label htmlFor="thumbnail" className="label">
            Thumbnail <span>*</span>
          </label>
          <div className="row form-file">
            <label htmlFor="thumbnail" className="label label-file">
              <FontAwesomeIcon icon={faCloudArrowUp} />
              <span>Select a thumbnail</span>
            </label>
            <input id="thumbnail" type="file" {...register('thumbnail')} />
          </div>
          <p className="error">{errors.thumbnail?.message}</p>
        </div>
        <div className="form__group">
          <label htmlFor="images" className="label">
            Images <span>*</span>
          </label>
          <div className="row form-file">
            <label htmlFor="images" className="label label-file">
              <FontAwesomeIcon icon={faCloudArrowUp} />
              <span>Select images</span>
            </label>
            <input id="images" type="file" multiple {...register('images')} />
          </div>
          <p className="error">{errors.images?.message}</p>
        </div>
        <Button label="Thêm" type="submit" />
      </form>
    </ProductFormStyle>
  );
};

export default ProductForm;