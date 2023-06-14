import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FiEdit, FiToggleLeft, FiToggleRight, FiInfo ,FiMenu} from "react-icons/fi";
import "./App.css";

const data = [
  {
    id: "item-1",
    content: "Profile Summary",
    description: "This section provides a summary of your profile.",
    enabled: true,
  },
  {
    id: "item-2",
    content: "Academic and Cocurricular Achievements",
    description: "This section showcases your academic and cocurricular achievements.",
    enabled: true,
  },
  {
    id: "item-3",
    content: "Summer Internship Experience",
    description: "This section highlights your summer internship experience.",
    enabled: true,
  },
  {
    id: "item-4",
    content: "Work Experience",
    description: "This section displays your work experience.",
    enabled: true,
  },
  {
    id: "item-5",
    content: "Projects",
    description: "This section presents your projects.",
    enabled: true,
  },
  {
    id: "item-6",
    content: "Leadership Positions",
    description: "This section showcases your leadership positions.",
    enabled: true,
  },
  {
    id: "item-7",
    content: "Extracurricular",
    description: "This section highlights your extracurricular activities.",
    enabled: true,
  },
  {
    id: "item-8",
    content: "Education",
    description: "This section displays your educational background.",
    enabled: true,
  },
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const App = () => {
  const [items, setItems] = useState([]);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setItems(data);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
    setChanged(true);
  };

  const handleEdit = (itemId) => {

    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        // Logic to prompt the user for a new section name
        const newSectionName = prompt("Enter a new section name:");
        return { ...item, content: newSectionName };
      }
      return item;
    });

    setItems(updatedItems);
    setChanged(true);
  };

  const handleToggle = (itemId) => {
    setItems((prevItems) =>
    prevItems.filter((item) => {
      if (item.id === itemId) {
        if (item.enabled) {
          setChanged(true);
        }
        return !item.enabled;
      }
      return true;
    })
  );
  };

  const [selectedSection, setSelectedSection] = useState(null);

const handleInfo = (itemId) => {
  setSelectedSection(itemId);
};
  const handleSave = () => {
    // Logic to save changes
    console.log("Saving changes");
    setChanged(false);
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: "16px",
    margin: `0 0 8px 0`,
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: "8px",
    width: "1000px",
  });

  return (
    <div className="main_content">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
            {items.map((item, index) => {
  if (!item.enabled) {
    return null; // Skip rendering disabled sections
  }

  const isInfoOpen = selectedSection === item.id;

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <div className="section-header">
          <div className="menu-button" {...provided.dragHandleProps}>
                          <FiMenu />
          </div>
            <button
              className="edit-button"
              onClick={() => handleEdit(item.id)}
            >
              <FiEdit />
            </button>
            <h2 className="section-name">{item.content}</h2>
            <button
              className="toggle-button"
              onClick={() => handleToggle(item.id)}
            >
              {item.enabled ? <FiToggleLeft /> : <FiToggleRight />}
            </button>
            <button className="info-button" onClick={() => handleInfo(item.id)}>
              <FiInfo />
            </button>
          </div>
          {isInfoOpen && <p className="section-description">{item.description}</p>}
        </div>
      )}
    </Draggable>
  );
})}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {changed && (
        <button className="save-button" onClick={handleSave}>
          Save and Next
        </button>
      )}
    </div>
  );
};

export default App;
