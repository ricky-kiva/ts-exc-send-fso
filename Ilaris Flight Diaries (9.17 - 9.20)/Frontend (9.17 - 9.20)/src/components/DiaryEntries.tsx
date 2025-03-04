import DiaryItem, { DiaryItemProps } from "./DiaryItem";

interface DiaryEntriesProps {
  diaries: DiaryItemProps[];
}

const DiaryEntries = (props: DiaryEntriesProps) => {
  return (
    <div>
      <h3>Diary entries</h3>
      {props.diaries.map((d) =>
        <DiaryItem key={d.id}
          id={d.id}
          date={d.date}
          visibility={d.visibility}
          weather={d.weather}
        />
      )}
    </div>
  )
}

export default DiaryEntries;
