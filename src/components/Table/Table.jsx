import React, { useEffect, useState } from "react";

// import OnlineStatus from "../../../components/OnlineStatus";
// import DraftReqestModal from "../../../components/RequestHero/DraftReqestModal";

import "./Table.css";

const Table = ({
  data,
  columnData,
  loading,
  loaderType,
  isAdmin,
  setAssignFreelancerName,
  handleAssignFreelancer,
  messageNotFound,
  showNotFoundPosition,
  onClickRowButton,
  onClickResendButton,
  setDeleteModal,
  showCaret,
  onClickRow,
}) => {
  const [showAssignModal, setShowAssignModal] = useState(false);

  const TableHeadItem = ({ item }) => <th>{item.heading}</th>;
  const handleClickRow = () => {};
  const TableRow = ({ item, column, index }) => (
    <tr onClick={() => onClickRow(item)}>
      {column.map((columnItem, index) => {
        return columnItem.value === "online_status" ? (
          //   <OnlineStatus value={item[`${columnItem.value}`]} />
          <div>online Status</div>
        ) : columnItem.value === "image" ? (
          <img src={item[`${columnItem.value}`]} height="100px" width="100px" />
        ) : (
          <td key={index}>{item[`${columnItem.value}`]}</td>
        );
      })}
    </tr>
  );
  return (
    <>
      {/* {showAssignModal && (
        <DraftReqestModal
          top={0}
          message={"Confirm Assign! "}
          onClick={handleAssignFreelancer}
          setOpenModal={setShowAssignModal}
        />
      )} */}
      <table>
        <thead>
          {columnData.map((item, index) => (
            <TableHeadItem item={item} key={index} />
          ))}
        </thead>
        <tbody>
          {loading ? (
            <div className="flex justify-center items-center text-white text-3xl">
              Laoding...
            </div>
          ) : (
            data.map((item, index) => (
              <TableRow
                key={index}
                item={item}
                column={columnData}
                index={index}
                setShowAssignModal={setShowAssignModal}
                isAdmin={isAdmin}
                setAssignFreelancerName={setAssignFreelancerName}
              />
            ))
          )}
        </tbody>
      </table>
      {data?.length === 0 && (
        <div>NO data</div>
        // <NoDataFound />
        // <NoDataFound
        //   message={messageNotFound}
        //   showpositionClass={showNotFoundPosition}
        // />
      )}
    </>
  );
};
const CaretIcon = () => {
  return <></>;
};

export default Table;
