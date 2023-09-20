import ModalPopup from "../../components/ModalPopup/ModalPopup";
import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import useFormFields from "../../hooks/useFormFields";
import { useDispatch, useSelector } from "react-redux";
import { setMessageEmpty } from "../../features/user/userSlice";
import { createToast } from "../../utility/toastAlert";

import DataTable from "react-data-table-component";

import {
  createBrand,
  deleteBrand,
  updateBrandStatus,
} from "../../features/product/productApiSlice";
import { timeAgo } from "../../utility/timeAgo";

const Brand = () => {
  const dispatch = useDispatch();
  const { error, message, brand, loader } = useSelector(
    (state) => state.product
  );
  const [logo, setLogo] = useState(null);
  const [logoprev, setLogoprev] = useState(null);
  const [search, setSearch] = useState("");

  const { input, handleInputChange, resetForm } = useFormFields({
    name: "",
  });

  const handleLogoPreview = (e) => {
    setLogoprev(URL.createObjectURL(e.target.files[0]));
    setLogo(e.target.files[0]);
  };

  const handleBrandCreate = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("name", input.name);
    form_data.append("logo", logo);
    dispatch(createBrand(form_data));
    resetForm();
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusUpdate = (id, status) => {
    dispatch(updateBrandStatus({ id, status }));
  };

  const handleBrandDelete = (id) => {
    swal({
      title: "Delete Brand",
      text: "Are you sure ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteBrand(id));
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
    }
  }, [error, message, dispatch]);

  const columns = [
    {
      name: "Logo",
      selector: (row) => (
        <img
          style={{ width: "50px", margin: "10px", objectFit: "cover" }}
          src={row.logo}
        />
      ),
    },
    {
      name: "Title",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
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
              data-target="#role_edit"
              href="#edit_specialities_details"
              onClick={() => handleRoleEdit(item._id)}
            >
              <i className="fe fe-pencil"></i> Edit
            </button>
            <button
              data-toggle="modal"
              href="#delete_modal"
              className="btn btn-sm bg-danger-light"
              onClick={() => handleBrandDelete(row._id)}
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
      <PageHeader title="Brand" />
      <ModalPopup target="BrandModalPopup" title="Add new brand">
        <form onSubmit={handleBrandCreate}>
          <div className="my-3">
            <label htmlFor="name">Brand Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my">
            <img src={logoprev} className="w-100" alt="" />
          </div>
          <div className="my-3">
            <label htmlFor="name">Brand Logo</label>
            <input
              type="file"
              className="form-control"
              id="logo"
              name="logo"
              onChange={(e) => handleLogoPreview(e)}
            />
          </div>

          <div className="my-3">
            <button type="submit" className="btn btn-primary float-right">
              {loader ? "Creating ....." : "Create Brand"}
            </button>
          </div>
        </form>
      </ModalPopup>
      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary mb-3"
            data-target="#BrandModalPopup"
            data-toggle="modal"
          >
            Add new brand
          </button>
          <br />
          <br />
          <DataTable
            title="Brands"
            className="shadow-sm"
            columns={columns}
            data={brand ? brand : []}
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

export default Brand;
