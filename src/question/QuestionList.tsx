import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Question } from "../types/type";
import QuestionItem from "./QuestionItem";
import { useState } from "react";

interface QuestionListProps {
  questions: Question[];
  selectedQuestionId?: string;
  onQuestionsChange: (questions: Question[]) => void;
  onSelectQuestion: (question: string) => void;
}

const QuestionList = ({
  questions,
  selectedQuestionId,
  onQuestionsChange,
  onSelectQuestion,
}: QuestionListProps) => {
  const [selectedIds, setSelectedIds] = useState(new Set<string>());

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 170,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const cancelSelect = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".question-item")) {
      setSelectedIds(new Set());
      onSelectQuestion("");
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      if (selectedIds.has(active.id as string)) {
        const oldIndices = Array.from(selectedIds)
          .map((id) => questions.findIndex((q) => q.id === id))
          .sort();

        const targetIndex = questions.findIndex((q) => q.id === over.id);
        let newQuestions = [...questions];

        const selectedQuestions = oldIndices.map((index) => questions[index]);
        newQuestions = newQuestions.filter((q) => !selectedIds.has(q.id));
        newQuestions.splice(targetIndex, 0, ...selectedQuestions);

        newQuestions = newQuestions.map((question, index) => ({
          ...question,
          order: index,
        }));

        onQuestionsChange(newQuestions);
      } else {
        const oldIndex = questions.findIndex((q) => q.id === active.id);
        const newIndex = questions.findIndex((q) => q.id === over.id);

        const newQuestions = arrayMove(questions, oldIndex, newIndex).map(
          (question, index) => ({
            ...question,
            order: index,
          })
        );
        onQuestionsChange(newQuestions);
      }
    }
  };

  const handleQuestionClick = (question: Question, event: React.MouseEvent) => {
    if (event.ctrlKey) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(question.id)) {
          next.delete(question.id);
        } else {
          next.add(question.id);
        }
        return next;
      });
    } else {
      onSelectQuestion(question.id);
      setSelectedIds(new Set());
    }
  };

  return (
    <div
      className="flex-1 p-6 bg-white rounded-lg shadow"
      onClick={cancelSelect}
    >
      <h2 className="mb-6 text-xl font-semibold">설문 문항</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={questions}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {questions.map((question) => (
              <QuestionItem
                key={question.id}
                question={question}
                isSelected={question.id === selectedQuestionId}
                isMultiSelected={selectedIds.has(question.id)}
                onClick={(e) => handleQuestionClick(question, e)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {questions.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          왼쪽에서 질문 유형을 선택하여 추가해주세요
        </div>
      )}
    </div>
  );
};

export default QuestionList;
