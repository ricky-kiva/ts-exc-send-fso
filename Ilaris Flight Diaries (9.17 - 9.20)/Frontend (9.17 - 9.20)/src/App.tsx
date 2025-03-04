import { useEffect, useState } from "react";
import { Diary } from "./types";
import { getAllDiaries } from "./services/diaryService";
import AddNewDiary from "./components/AddNewDiary";
import DiaryEntries from "./components/DiaryEntries";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  
  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    });
  }, []);

  const addDiary = (diary: Diary) => {
    setDiaries(diaries.concat(diary));
  }

  return (
    <div>
      <AddNewDiary addDiary={addDiary}/>
      <DiaryEntries diaries={diaries} />
    </div>
  );
}

export default App;
