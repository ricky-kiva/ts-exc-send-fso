import { Diary } from "../types";

export type DiaryItemProps = Omit<Diary, 'comment'>;

const DiaryItem = (props: DiaryItemProps) => {
  return (
    <div>
      <h3>{props.date}</h3>
      <p>
        visibility: {props.visibility}
        <br/>weather: {props.weather}
      </p>
    </div>
  )
}

export default DiaryItem;
