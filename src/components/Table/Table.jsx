import React, { useEffect, useState } from "react";

// import OnlineStatus from "../../../components/OnlineStatus";
// import DraftReqestModal from "../../../components/RequestHero/DraftReqestModal";

import "./Table.css";
import { DraggableRow } from "../DraggableRow";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag } from "react-dnd";

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
  // const moveRow = (from, to) => {
  // const newData = [...data];

  // newData.splice(to, 0, newData.splice(from, 1)[0]);
  // setData(newData);

  // };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "tableRow",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging,
    }),
  }));
  const TableHeadItem = ({ item }) => <th>{item.heading}</th>;
  const handleClickRow = () => {};
  const TableRow = ({ item, column, index }) => (
    <tr
      onClick={() => onClickRow(item)}
      ref={drag}
      style={{ border: !isDragging && "5px solid pink" }}
    >
      {column.map((columnItem, index) => {
        return columnItem.value === "online_status" ? (
          //   <OnlineStatus value={item[`${columnItem.value}`]} />
          <div>online Status</div>
        ) : columnItem.value === "image" ? (
          <img src={item[`${columnItem.value}`]} height="100px" width="100px" />
        ) : (
          // <DraggableRow key={index} index={index} moveRow={moveRow}>
          <td key={index}>{item[`${columnItem.value}`]}</td>
          // </DraggableRow>
        );
      })}
    </tr>
    // </DraggableRow>
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
