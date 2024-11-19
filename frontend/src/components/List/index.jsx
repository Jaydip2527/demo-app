import React, { useEffect, useState, useCallback, useMemo } from "react";
import HeaderComponent from "../Layout/header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmToast, toast } from "../../utils/constant";
import { deleteData, getData } from "../../redux/actions/actions";
import { FORM, SIGNIN } from "../../routes";
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import defaultImage from "../../assets/noImg.jpeg";

export default function List() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsData = useSelector((state) => state.items.items);

  const getAllData = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await dispatch(getData(token, navigate));
    } catch (error) {
      console.error("Error fetching items:", error);
      toast(error.message, "error");
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(SIGNIN);
    }
  }, [navigate]);

  const filteredData = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return itemsData.filter(
      (data) =>
        data.title.toLowerCase().includes(lowercasedQuery) ||
        data.authors.toLowerCase().includes(lowercasedQuery)
    ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [searchQuery, itemsData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleDeleteItem = async (row) => {
    try {
      const confirm = await confirmToast("Are you sure you want to delete this item?");
      if (confirm) {
        await dispatch(deleteData(row._id));
        toast("Item deleted successfully", "success");
      }
    } catch (error) {
      toast(error.message, "error");
    }
  };

  const handleEdit = (row) => navigate(FORM, { state: { Id: row._id } });

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i <= 3 || i === totalPages || (i === currentPage - 1 && currentPage > 3) || (i === currentPage + 1 && currentPage < totalPages - 2)) {
        pages.push(
          <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
            <button className="page-link rounded" onClick={() => setCurrentPage(i)}>{i}</button>
          </li>
        );
      }
      if (i === 3 && totalPages > 5) {
        pages.push(<li key="ellipsis" className="page-item"><span className="page-link">...</span></li>);
      }
    }

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-end">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link rounded" onClick={() => setCurrentPage(1)}>Start</button>
          </li>
          {pages}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link rounded" onClick={() => setCurrentPage(totalPages)}>End</button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <>
      <HeaderComponent />
      <div className="container mt-3">
        <div className="input-group mb-3">
          <span className="input-group-text border-white">
            <i className="bi bi-search" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search item..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              padding: "12px",
              background: "radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)",
              color: "#212529",
              borderColor: "white"
            }}
          />
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary mb-3" onClick={() => navigate(FORM)}>
            Add Item
          </button>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>ISBN Number</th>
                  <th>Item Image</th>
                  <th>Item Title</th>
                  <th>Item Authors</th>
                  <th>Item Subtitle</th>
                  <th>Item Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.isbn}</td>
                    <td style={{ textAlign: "center" }}>
                      {item.image ? (
                        <img
                          src={`${process.env.REACT_APP_API_URL}/${item.image}`}
                          alt={item.title}
                          style={{ width: "60%", height: "60px" }}
                        />
                      ) : (
                        <img
                          src={defaultImage}
                          alt="No Data"
                          style={{ width: "60%", height: "60px" }}
                        />
                      )}
                    </td>
                    <td>{item.title}</td>
                    <td>{item.authors}</td>
                    <td>{item.subtitle}</td>
                    <td>{item.description}</td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        <button className="btn btn-primary" onClick={() => handleEdit(item)}>
                          <i className="bi bi-pencil-square" /> {/* Edit Icon */}
                        </button>
                        <button className="btn btn-danger ms-2" onClick={() => handleDeleteItem(item)}>
                          <i className="bi bi-trash" /> {/* Delete Icon */}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {renderPagination()}
      </div>
    </>
  );
}