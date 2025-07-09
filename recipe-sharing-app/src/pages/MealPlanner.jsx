import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

const initialRecipes = [
  { id: '1', title: '🥗 Salad' },
  { id: '2', title: '🍝 Pasta' },
  { id: '3', title: '🍲 Soup' }
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function MealPlanner() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [plan, setPlan] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: []
  });

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === 'recipes') {
      const draggedItem = recipes.find((r) => r.id === draggableId);
      if (!draggedItem) return;

      if (plan[destination.droppableId]?.some(item => item.id === draggedItem.id)) return;

      setPlan(prev => ({
        ...prev,
        [destination.droppableId]: [...prev[destination.droppableId], draggedItem]
      }));
    }
  };

  const removeFromDay = (day, indexToRemove) => {
    setPlan(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== indexToRemove)
    }));
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center">📅 Weekly Meal Planner</h2>
      <p className="text-center text-gray-500 mb-6">
        Drag recipes into each day. Click to remove.
      </p>

      <DragDropContext onDragEnd={onDragEnd}>
        {/* Recipe shelf */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">🍳 Recipe Shelf</h3>
          <Droppable droppableId="recipes" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex gap-4 overflow-x-auto pb-2"
              >
                {recipes.map((recipe, index) => (
                  <Draggable key={recipe.id} draggableId={recipe.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white shadow-md rounded-lg px-4 py-2 min-w-[100px] text-center cursor-grab hover:shadow-lg border"
                      >
                        {recipe.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Days of the week grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {days.map((day) => (
            <Droppable key={day} droppableId={day}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 min-h-[150px] rounded-lg border-2 transition ${
                    snapshot.isDraggingOver ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-50'
                  }`}
                >
                  <h4 className="font-bold text-gray-700 mb-3 text-center">{day}</h4>
                  {plan[day].map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => removeFromDay(day, idx)}
                      title="Click to remove"
                      className="bg-white px-3 py-2 rounded shadow-sm mb-2 text-sm text-center cursor-pointer hover:bg-red-100"
                    >
                      {item.title}
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
