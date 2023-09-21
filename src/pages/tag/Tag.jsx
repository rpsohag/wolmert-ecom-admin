import ModalPopup from "../../components/ModalPopup/ModalPopup";
import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import useFormFields from "../../hooks/useFormFields";
import { useDispatch, useSelector } from "react-redux";
import { setMessageEmpty } from "../../features/user/userSlice";
import { createToast } from "../../utility/toastAlert";
import DataTable from "react-data-table-component";

import {
  createTag,
  deleteTag,
  updateTag,
  updateTagStatus,
} from "../../features/product/productApiSlice";
import { timeAgo } from "../../utility/timeAgo";

const Tag = () => {
  const dispatch = useDispatch();
  const { error, message, tag, loader } = useSelector((state) => state.product);
  const [search, setSearch] = useState("");
  const [filteredTag, setFilteredTag] = useState([]);

  const { input, handleInputChange, resetForm } = useFormFields({
    name: "",
  });
  const [tagEdit, setTagEdit] = useState({
    _id: "",
    name: "",
  });

  const handleTagCreate = (e) => {
    e.preventDefault();
    dispatch(createTag(input));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusUpdate = (id, status) => {
    dispatch(updateTagStatus({ id, status }));
  };

  const handleTagEdit = (id) => {
    const editData = tag.find((data) => data._id === id);
    setTagEdit(editData);
  };

  const handleEditInputChange = (e) => {
    setTagEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTagUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTag({ id: tagEdit._id, data: tagEdit }));
  };

  const handleTagDelete = (id) => {
    swal({
      title: "Delete Tag",
      text: "Are you sure ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteTag(id));
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
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    if (tag) {
      const result = tag.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredTag(result);
    }
  }, [search, tag]);

  const columns = [
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
              data-target="#tag_edit"
              href="#edit_specialities_details"
              onClick={() => handleTagEdit(row._id)}
            >
              <i className="fe fe-pencil"></i> Edit
            </button>
            <button
              data-toggle="modal"
              href="#delete_modal"
              className="btn btn-sm bg-danger-light"
              onClick={() => handleTagDelete(row._id)}
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
      <PageHeader title="Tag" />
      <ModalPopup target="TagModalPopup" title="Add new tag">
        <form onSubmit={handleTagCreate}>
          <div className="my-3">
            <label htmlFor="name">Tag Name</label>
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
            <button type="submit" className="btn btn-primary float-right">
              {loader ? "Creating ....." : "Create Tag"}
            </button>
          </div>
        </form>
      </ModalPopup>
      <ModalPopup target="tag_edit" title="Update Tag">
        <form onSubmit={handleTagUpdate}>
          <div className="my-3">
            <label htmlFor="name">Tag Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={tagEdit.name}
              onChange={handleEditInputChange}
            />
          </div>

          <div className="my-3">
            <button type="submit" className="btn btn-primary float-right">
              {loader ? "Updating ....." : "Update Tag"}
            </button>
          </div>
        </form>
      </ModalPopup>

      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary mb-3"
            data-target="#TagModalPopup"
            data-toggle="modal"
          >
            Add new tag
          </button>
          <br />
          <br />
          <DataTable
            title="Tags"
            className="shadow-sm"
            columns={columns}
            data={filteredTag ? filteredTag : []}
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

export default Tag;
