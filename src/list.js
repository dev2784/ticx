import moment from "moment/moment";
import React from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import CreateListing from "./createListing";
import "./list.css";
import Login from "./login";
import Pagination from "./pagination";
let PageSize = 10;
const List = () => {
  const [list, setList] = React.useState([]);
  const [error, setError] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [show, setShow] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [token, setToken] = React.useState("");

  const getList = () => {
    fetch("https://cms.dotcheckout.com/movies")
      .then((resp) =>
        resp.json().then((res) => {
          console.log(res);
          if (res.length) {
            setList(res);
            setError("");
          } else {
            setError("No Data Found");
          }
        })
      )
      .catch((err) => setError(err));
  };

  const handleClose = () => {
    getList();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return list.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, list]);

  const searchList = (name) => {
    setSearch(name);
    if (name !== "") {
      const results = list.filter((item) => {
        return (
          item.movie_name &&
          item.movie_name.toLowerCase().startsWith(name.toLowerCase())
        );
      });
      setList([...results]);
    } else {
      getList();
    }
  };

  React.useEffect(() => {
    getList();
  }, []);
  return (
    <Container fluid className="list-container">
      <Row className="header">
        <Col xs={12} md={2}>
          <h2 className="logo">
            Tic<span>X</span>
          </h2>
        </Col>
        <Col xs={12} md={8}>
          <input
            className="search-input"
            type="search"
            placeholder="Search by movie name"
            value={search}
            onChange={(e) => searchList(e.target.value)}
          />
        </Col>
        <Col xs={12} md={2}>
          <Button className="sell-ticket-btn" onClick={() => handleShow()}>
            +Sell Ticket
          </Button>
        </Col>
      </Row>
      <Row className="list-content">
        <Col>
          <Table className="list-table" responsive>
            <thead>
              <tr>
                <th>Name of The Movie</th>
                <th>Number of Tickets</th>
                <th>Theater Location</th>
                <th>Price per Ticket</th>
                <th>Show Timings</th>
                <th>Contact Numbers</th>
              </tr>
            </thead>
            <tbody>
              {console.log(currentTableData)}
              {error !== "" ? (
                <tr>
                  <td colSpan={6}>{error}</td>
                </tr>
              ) : (
                currentTableData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <span>{item.movie_name}</span>
                      </td>
                      <td>
                        <span>{item.no_of_tickets}</span>
                      </td>
                      <td>
                        <span>{item.theatre_location}</span>
                      </td>
                      <td>
                        <span>{item.price_per_ticket}</span>
                      </td>
                      <td>
                        <span>
                          {moment(item.show_date).format("Do MMM")}{" "}
                          {moment(item.show_time, "HH:mm:ss").format("HH:mm A")}
                        </span>
                      </td>
                      <td>
                        <span>
                          <Button className="view-button">View Contact</Button>
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={list.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Col>
      </Row>
      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Body>
          {token !== "" ? (
            <CreateListing handleClose={() => handleClose()} />
          ) : (
            <Login handleClose={() => handleClose()} setToken={setToken} />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};
export default List;
