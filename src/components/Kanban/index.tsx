import React, { useState } from "react";

import "./style.css";

export default function Kanban() {
    const [backlogItems, setBacklogItems] = useState<string[]>([]);
    const [doingItems, setDoingItems] = useState<string[]>([]);
    const [reviewItems, setReviewItems] = useState<string[]>([]);
    const [doneItems, setDoneItems] = useState<string[]>([]);
    const [newItemText, setNewItemText] = useState<string>("");

    function handleOnDrag(e: React.DragEvent, itemType: string) {
        e.dataTransfer.setData("text/plain", itemType);
    }

    function handleOnDrop(e: React.DragEvent, targetColumn: string) {
        e.preventDefault();
        const itemType = e.dataTransfer.getData("text/plain");
      
        setBacklogItems((prevItems) => prevItems.filter((item) => item !== itemType));
        setDoingItems((prevItems) => prevItems.filter((item) => item !== itemType));
        setReviewItems((prevItems) => prevItems.filter((item) => item !== itemType));
        setDoneItems((prevItems) => prevItems.filter((item) => item !== itemType));
      
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
      
        setNewItemText("");
      }


    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    function handleAddItem() {
        if (newItemText.trim() !== "") {
            setBacklogItems((prevItems) => [...prevItems, newItemText]);
            setNewItemText("");
        }
    }
    return (
        <>
        <h1 className="tittle">Pro<span>Tasker</span></h1>
            <div className="add_item">
                <input className="input_item"
                    type="text"
                    placeholder="Digite seu item"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                />
                <button onClick={handleAddItem}>Adicionar Item</button>
            </div>
            <div className="container">
                <div
                    className="column_backlog column"
                    onDrop={(e) => handleOnDrop(e, "backlog")}
                    onDragOver={handleDragOver}
                >
                    <h1 className="p_backlog">Backlog</h1>
                    {backlogItems.map((item, index) => (
                        <div
                            key={index}
                            className="item"
                            draggable
                            onDragStart={(e) => handleOnDrag(e, item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <div
                    className="column_doing column"
                    onDrop={(e) => handleOnDrop(e, "doing")}
                    onDragOver={handleDragOver}
                >
                     <h1 className="p_doing">Doing</h1>
                    {doingItems.map((item, index) => (
                        <div
                            key={index}
                            className="item"
                            draggable
                            onDragStart={(e) => handleOnDrag(e, item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <div
                    className="column_review column"
                    onDrop={(e) => handleOnDrop(e, "review")}
                    onDragOver={handleDragOver}
                >
                     <h1 className="p_review">Review</h1>
                    {reviewItems.map((item, index) => (
                        <div
                            key={index}
                            className="item"
                            draggable
                            onDragStart={(e) => handleOnDrag(e, item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <div
                    className="column_done column"
                    onDrop={(e) => handleOnDrop(e, "done")}
                    onDragOver={handleDragOver}
                >
                     <h1 className="p_done">Done</h1>
                    {doneItems.map((item, index) => (
                        <div
                            key={index}
                            className="item"
                            draggable
                            onDragStart={(e) => handleOnDrag(e, item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>

                <div
                    className="page"
                    onDrop={(e) => handleOnDrop(e, "page")}
                    onDragOver={handleDragOver}
                >
                </div>
            </div>
        </>
    );
}
