import type React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface Props {
  selected: Date | undefined;
  setSelected: (date: Date | undefined) => void;
}

export const Calendar: React.FC<Props> = ({ selected, setSelected }) => {
  return (
    <DayPicker
      style={{
        justifyItems: "center",
      }}
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      }
    />
  );
};
