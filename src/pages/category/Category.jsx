import ModalPopup from "../../components/ModalPopup/ModalPopup";
import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import useFormFields from "../../hooks/useFormFields";
import { useDispatch, useSelector } from "react-redux";
import { setMessageEmpty } from "../../features/product/productSlice";
import { createToast } from "../../utility/toastAlert";

import DataTable from "react-data-table-component";

import {
  createCategory,
  deleteCategory,
  getProductCategories,
  updateCategory,
  updateCategoryStatus,
} from "../../features/product/productApiSlice";
import { timeAgo } from "../../utility/timeAgo";

const Category = () => {
  const dispatch = useDispatch();
  const { error, message, category, loader } = useSelector(
    (state) => state.product
  );

  const [photo, setPhoto] = useState(null);
  const [catPhotoPrev, setPhotoprev] = useState(null);
  const [photoEditPrev, setEditLogoprev] = useState(null);
  const [editParentCategory, setEditParentCategory] = useState("");
  const [search, setSearch] = useState("");
  const [filteredCategory, setFilteredCategory] = useState([]);

  const { input, handleInputChange, resetForm } = useFormFields({
    name: "",
    parentCat: "",
    icon: "",
    photo: "",
  });
  const [categoryEdit, setCategoryEdit] = useState({
    _id: "",
    name: "",
    icon: "",
    photo: "",
  });

  const handlePhotoPreview = (e) => {
    setPhotoprev(URL.createObjectURL(e.target.files[0]));
    setPhoto(e.target.files[0]);
  };

  const handleEditLogoPreview = (e) => {
    setEditLogoprev(URL.createObjectURL(e.target.files[0]));
    setCategoryEdit((prevState) => ({
      ...prevState,
      photo: e.target.files[0],
    }));
  };

  const handleCategoryCreate = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("name", input.name);
    form_data.append("icon", input.icon);
    form_data.append("parentCategory", input.parentCat);
    form_data.append("photo", photo);
    dispatch(createCategory(form_data));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusUpdate = (id, status) => {
    dispatch(updateCategoryStatus({ id, status }));
  };

  const handleCategoryEdit = (id) => {
    const editData = category.find((data) => data._id === id);
    setCategoryEdit(editData);
    setEditLogoprev(editData.photo);
    setEditParentCategory(editData?.parentCategory?._id || "");
  };

  const handleEditInputChange = (e) => {
    setCategoryEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditParentCategoryChange = (e) => {
    setEditParentCategory(e.target.value);
  };

  const handleCategoryUpdate = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("id", categoryEdit._id);
    form_data.append("name", categoryEdit.name);
    form_data.append("icon", categoryEdit.icon);
    form_data.append("parentCategory", editParentCategory);
    form_data.append("photo", categoryEdit.photo);
    dispatch(updateCategory({ id: categoryEdit._id, data: form_data }));
  };

  const handleCategoryDelete = (id) => {
    swal({
      title: "Delete Category",
      text: "Are you sure ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategory(id));
      }
    });
  };

  useEffect(() => {
    if (error) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
      resetForm();
      setPhotoprev(null);
      dispatch(getProductCategories());
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    if (category) {
      const result = category.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredCategory(result);
    }
  }, [search, category]);

  const columns = [
    {
      name: "Photo",
      selector: (row) => (
        <img
          style={{ width: "50px", margin: "10px", objectFit: "cover" }}
          src={row.photo}
        />
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
    },
    {
      name: "Sub Category",
      selector: (row) => (
        <ul>
          {row.subCategory.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      ),
    },
    {
      name: "Icon",
      selector: (row) => row.icon,
    },
    {
      name: "Created At",
      selector: (row) => timeAgo(row.createdAt),
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          <div className="status-toggle">
            <input
              type="checkbox"
              id={`status_${row._id}`}
              checked={row.status}
              className="check"
              readOnly
            />
            <label
              htmlFor={`status_${row._id}`}
              className="checktoggle"
              onClick={() => handleStatusUpdate(row._id, row.status)}
            >
              checkbox
            </label>
          </div>
        </>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <div className="actions">
            <button
              className="btn btn-sm bg-success-light"
              data-toggle="modal"
              data-target="#category_edit"
              href="#edit_specialities_details"
              onClick={() => handleCategoryEdit(row._id)}
            >
              <i className="fe fe-pencil"></i> Edit
            </button>
            <button
              data-toggle="modal"
              href="#delete_modal"
              className="btn btn-sm bg-danger-light"
              onClick={() => handleCategoryDelete(row._id)}
            >
              <i className="fe fe-trash"></i> Delete
            </button>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Category" />
      <ModalPopup target="CategoryModalPopup" title="Add new Category">
        <form onSubmit={handleCategoryCreate}>
          <div className="my-3">
            <label htmlFor="name">Category Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="name">Parent Category</label>
            <select
              name="parentCat"
              id=""
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="">Select One</option>;
              {category?.map((pcat, index) => {
                return (
                  <option key={index} value={pcat._id}>
                    {pcat.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="my-3">
            <label htmlFor="icon">Category Icon</label>
            <input
              type="text"
              className="form-control"
              id="icon"
              name="icon"
              value={input.icon}
              onChange={handleInputChange}
            />
          </div>
          <div className="my">
            <img src={catPhotoPrev} className="w-100" alt="" />
          </div>
          <div className="my-3">
            <label htmlFor="name">Category Photo</label>
            <input
              type="file"
              className="form-control"
              id="photo"
              name="photo"
              onChange={(e) => handlePhotoPreview(e)}
            />
          </div>

          <div className="my-3">
            <button type="submit" className="btn btn-primary float-right">
              {loader ? "Creating ....." : "Create Category"}
            </button>
          </div>
        </form>
      </ModalPopup>
      <ModalPopup target="category_edit" title="Update Category">
        <form onSubmit={handleCategoryUpdate}>
          <div className="my-3">
            <label htmlFor="name">Category Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={categoryEdit.name}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="name">Parent Category</label>
            <select
              name="parentCat"
              id=""
              value={editParentCategory}
              onChange={handleEditParentCategoryChange}
              className="form-control"
            >
              <option value="">Select One</option>
              {category?.map((pcat, index) => (
                <option key={index} value={pcat._id}>
                  {pcat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="my-3">
            <label htmlFor="icon">Category Icon</label>
            <input
              type="text"
              className="form-control"
              id="icon"
              name="icon"
              value={categoryEdit.icon}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="my">
            <img src={photoEditPrev} className="w-100" alt="" />
          </div>
          <div className="my-3">
            <label htmlFor="name">Category Logo</label>
            <input
              type="file"
              className="form-control"
              id="photo"
              name="photo"
              onChange={(e) => handleEditLogoPreview(e)}
            />
          </div>

          <div className="my-3">
            <button type="submit" className="btn btn-primary float-right">
              {loader ? "Updating ....." : "Update Category"}
            </button>
          </div>
        </form>
      </ModalPopup>

      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary mb-3"
            data-target="#CategoryModalPopup"
            data-toggle="modal"
          >
            Add new Category
          </button>
          <br />
          <br />
          <DataTable
            title="Categorys"
            className="shadow-sm"
            columns={columns}
            data={filteredCategory ? filteredCategory : []}
            highlightOnHover
            pagination
            subHeader
            subHeaderComponent={
              <input
                className="form-control"
                style={{ width: "200px" }}
                placeholder="Search...."
                value={search}
                onChange={(e) => handleSearch(e)}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default Category;
