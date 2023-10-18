import React, { useEffect, useState } from "react";
import LogoutButton from "../components/LogoutButton";
import MkdSDK from "../utils/MkdSDK";
import Table from "../components/Table/Table";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const AdminDashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    let fetchTables = async () => {
      setLoading(true);
      let sdk = new MkdSDK();
      var payload = {
        payload: {},
        page: currentPage,
        limit: 10,
      };
      var res = await sdk.callRestAPI(payload, "PAGINATE");
      setTableData(res.list);
      setLoading(false);
      console.log(res);
    };
    fetchTables();
  }, [currentPage]);
  console.log("tableData");
  console.log(tableData);
  let columnData = [
    // { heading: "Order ID", value: "razorpay.orderId" },
    { heading: "Title", value: "title" },
    { heading: "Author", value: "username" },
    { heading: "Most Liked", value: "like" },
  ];
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, 3));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  return (
    <>
      <div className="bg-black h-screen w-screen ">
        <div className="px-12 w-full flex justify-between items-center  text-white">
          <h1 className="text-4xl font-bold">APP</h1>
          <LogoutButton />
        </div>
        <div className="px-12 w-full flex justify-between items-center  text-white">
          <h1 className="text-4xl font-bold my-3">Todays' Leaders Dashboard</h1>
        </div>
        <DndProvider backend={HTML5Backend}>
          <Table
            loading={loading}
            data={tableData}
            onClickRow={(order) =>
              navigate("/admin/order-details", {
                state: { order_id: order.order_id },
              })
            }
            // data={tableData}
            columnData={columnData}
          />
        </DndProvider>
        <div className="flex items-center ">
          <button
            className="bg-lime-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-lime-600"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>{`Page ${currentPage} of ${3}`}</span>
          <button
            className="bg-lime-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-lime-600"
            onClick={handleNextPage}
            disabled={currentPage === 3}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
