import React, { useState, useEffect } from "react";

import "./style.css";
import { useNavigate } from "react-router-dom";

interface CustomAlertProps {
  content: string;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ content, onClose }) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timerId);
  }, [onClose]);

  return (
    <div className="custom-alert">
      <p>{content}</p>
      <div className="progress"></div>
    </div>
  );
};

export default function Kanban() {
  const [backlogItems, setBacklogItems] = useState<string[]>([]);
  const [doingItems, setDoingItems] = useState<string[]>([]);
  const [reviewItems, setReviewItems] = useState<string[]>([]);
  const [doneItems, setDoneItems] = useState<string[]>([]);
  const [newItemText, setNewItemText] = useState<string>("");
  // const [isDraggingOverTrash, setIsDraggingOverTrash] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const userName = JSON.parse(localStorage.getItem("name") || "");

  const navigate = useNavigate();

  useEffect(() => {
    setAlertContent("You need to enter a name to access this page");
    if (!userName) {
        
        navigate("/");
    }
    
  }, [userName, navigate]);


  function handleExitKanban() {
    localStorage.clear();
    navigate("/");
  }

  function handleOnDrag(e: React.DragEvent, itemType: string) {
    e.dataTransfer.setData("text/plain", itemType);
  }

  function handleOnDrop(e: React.DragEvent, targetColumn: string) {
    e.preventDefault();
    const itemType = e.dataTransfer.getData("text/plain");

    setBacklogItems((prevItems) =>
      prevItems.filter((item) => item !== itemType)
    );
    setDoingItems((prevItems) => prevItems.filter((item) => item !== itemType));
    setReviewItems((prevItems) =>
      prevItems.filter((item) => item !== itemType)
    );
    setDoneItems((prevItems) => prevItems.filter((item) => item !== itemType));

    if (targetColumn === "container-trash") {
      // setIsDraggingOverTrash(false);
      handleDropOnTrash(itemType);
    } else {
      handleDropInColumn(targetColumn, itemType);
    }

    if (targetColumn !== "container-trash") {
      switch (targetColumn) {
        case "backlog":
          setBacklogItems((prevItems) => [...prevItems, itemType]);

          break;
        case "doing":
          setDoingItems((prevItems) => [...prevItems, itemType]);

          break;
        case "review":
          setReviewItems((prevItems) => [...prevItems, itemType]);

          break;
        case "done":
          setDoneItems((prevItems) => [...prevItems, itemType]);

          break;
        default:
          break;
      }
    }

    setNewItemText("");
  }

  function handleDropOnTrash(itemType: string) {
    console.log(`Item "${itemType}" foi deletado!`);
  }

  function handleDropInColumn(column: string, item: string) {
    switch (column) {
      case "backlog":
        setBacklogItems((prevItems) => prevItems.filter((i) => i !== item));
        break;
      case "doing":
        setDoingItems((prevItems) => prevItems.filter((i) => i !== item));
        break;
      case "review":
        setReviewItems((prevItems) => prevItems.filter((i) => i !== item));
        break;
      case "done":
        setDoneItems((prevItems) => prevItems.filter((i) => i !== item));
        break;
      default:
        break;
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleAddItem() {
    if (newItemText.trim() !== "") {
      const IsItemreadyExists =
        backlogItems.includes(newItemText) ||
        doingItems.includes(newItemText) ||
        reviewItems.includes(newItemText) ||
        doneItems.includes(newItemText);


        if (!IsItemreadyExists) {
            setBacklogItems((prevItems) => {
              const newItems = [...prevItems, newItemText]
              localStorage.setItem("backlogItems", JSON.stringify(newItems));
              return newItems;
            });
            setNewItemText("");
          } else {
            setAlertContent("A task with that name already exists");
            setShowAlert(true);
          }
    }
  }

  function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleAddItem();
    }
  }

  function handleDeleteItem(column: string, item: string) {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete the item "${item}"?`
    );
    if (shouldDelete) {
      switch (column) {
        case "backlog":
          setBacklogItems((prevItems) => prevItems.filter((i) => i !== item));
          break;
        case "doing":
          setDoingItems((prevItems) => prevItems.filter((i) => i !== item));
          break;
        case "review":
          setReviewItems((prevItems) => prevItems.filter((i) => i !== item));
          break;
        case "done":
          setDoneItems((prevItems) => prevItems.filter((i) => i !== item));
          break;
        default:
          break;
      }
    }
  }

  return (
    <>
      <div className="navbar">
        <h1 className="tittle_kanban">
          Pro<span>Tasker</span>
        </h1>
        <div className="nav_right">
            <div className="name_user">
                <p className="name">Hello {userName}</p>
            </div>

            <div className="button_exit">
                <button className="exit" onClick={handleExitKanban}>To go out</button>
            </div>
        </div>
      </div>



      <div className="add_item">
        <div className="add_item">
          <input
            className="input_item"
            type="text"
            placeholder="Enter your item"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={handleEnterKey}
          />
        </div>
      </div>

      <div className="container_kanban">
        <div
          className="column_backlog column"
          onDrop={(e) => handleOnDrop(e, "backlog")}
          onDragOver={handleDragOver}
        >
          <div className="top_column backlog">
            <h1 className="p_backlog">Backlog</h1>
          </div>
          <div className="content_items">
            {backlogItems.map((item, index) => (
              <div
                key={index}
                className="item"
                draggable
                onDragStart={(e) => handleOnDrag(e, item)}
              >
                {item}
                <span
                  className="delete-icon"
                  onClick={() => handleDeleteItem("backlog", item)}
                >
                  🗑️
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="column_doing column"
          onDrop={(e) => handleOnDrop(e, "doing")}
          onDragOver={handleDragOver}
        >
          <div className="top_column doing">
            <h1 className="p_doing">Doing</h1>
          </div>

          <div className="content_items">
            {doingItems.map((item, index) => (
              <div
                key={index}
                className="item"
                draggable
                onDragStart={(e) => handleOnDrag(e, item)}
              >
                {item}
                <span
                  className="delete-icon"
                  onClick={() => handleDeleteItem("doing", item)}
                >
                  🗑️
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="column_review column"
          onDrop={(e) => handleOnDrop(e, "review")}
          onDragOver={handleDragOver}
        >
          <div className="top_column review">
            <h1 className="p_review">Review</h1>
          </div>
          <div className="content_items">
            {reviewItems.map((item, index) => (
              <div
                key={index}
                className="item"
                draggable
                onDragStart={(e) => handleOnDrag(e, item)}
              >
                {item}
                <span
                  className="delete-icon"
                  onClick={() => handleDeleteItem("review", item)}
                >
                  🗑️
                </span>
              </div>
            ))}
          </div>
        </div>
        <div
          className="column_done column"
          onDrop={(e) => handleOnDrop(e, "done")}
          onDragOver={handleDragOver}
        >
          <div className="top_column done">
            <h1 className="p_done">Done</h1>
          </div>
          <div className="content_items">
            {doneItems.map((item, index) => (
              <div
                key={index}
                className="item"
                draggable
                onDragStart={(e) => handleOnDrag(e, item)}
              >
                {item}
                <span
                  className="delete-icon"
                  onClick={() => handleDeleteItem("done", item)}
                >
                  🗑️
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="page"
          onDrop={(e) => handleOnDrop(e, "page")}
          onDragOver={handleDragOver}
        ></div>
      </div>

      {showAlert && (
        <CustomAlert
          content={alertContent}
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
}
