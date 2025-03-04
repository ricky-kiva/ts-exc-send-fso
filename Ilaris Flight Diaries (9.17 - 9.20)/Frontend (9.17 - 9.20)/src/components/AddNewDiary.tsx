import { useState } from "react";
import { Diary, isDiary, isString, NewDiary, Visibility, Weather } from "../types";
import { createDiary } from "../services/diaryService";

interface AddNewDiaryProps {
  addDiary: (diary: Diary) => void,
}

const AddNewDiary = (props: AddNewDiaryProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const visibilityOptions: Visibility[] = ['great', 'good', 'ok', 'poor'];
  const weatherOptions: Weather[] = ['sunny', 'rainy', 'cloudy', 'windy', 'stormy'];

  const clearFormFields = () => {
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  }

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary: NewDiary = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment
    }

    await createDiary(newDiary).then(data => {
      if (isDiary(data)) {
        props.addDiary(data);
        clearFormFields();
        setErrorMessage('');

        return;
      }
      
      if (isString(data)) setErrorMessage(`Error: ${data}`);
    });
  }

  return (
    <div onSubmit={diaryCreation}>
      <h3>Add new entry</h3>
      {errorMessage !== ''
        ? <p style={{ color: "red" }}>{errorMessage}</p>
        : <></>
      }
      <form>
        <label htmlFor="date">date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br/>
        <div>
          <label>Visibility </label>
          {visibilityOptions.map((v) => (
            <>
              <label htmlFor={`visibility-${v}`}>{v}</label>
              <input
                key={v}
                type="radio"
                id={`visibility-${v}`}
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
              />
            </>
          ))}
        </div>
        <div>
          <label>Weather  </label>
          {weatherOptions.map((v) => (
            <>
              <label htmlFor={`weather-${v}`}>{v}</label>
              <input
                key={v}
                type="radio"
                id={`weather-${v}`}
                name="weather"
                value={v}
                checked={weather === v}
                onChange={(e) => setWeather(e.target.value as Weather)}
              />
            </>
          ))}
        </div>
        <label htmlFor="comment">comment</label>
        <input
          type="text"
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <br/>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AddNewDiary;
