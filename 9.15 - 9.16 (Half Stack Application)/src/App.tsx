interface HeaderProps {
  name: string
}

interface PartProps {
  course: CoursePart;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescribed extends CoursePartBase {
  description: string;
} 

interface CoursePartBasic extends CoursePartDescribed {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartDescribed {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends CoursePartDescribed {
  requirements: string[];
  kind: 'special';
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface ContentProps {
  contents: CoursePart[]
}

interface TotalProps {
  total: number
}

const Header = (props: HeaderProps) => (
  <h1>{props.name}</h1>
)

const Part = (props: PartProps) => {
  switch(props.course.kind) {
    case 'basic':
      return <p>
        <b>{props.course.name} {props.course.exerciseCount}</b>
        <br/><i>{props.course.description}</i>
      </p>;
    case 'group':
      return <p>
        <b>{props.course.name} {props.course.exerciseCount}</b>
        <br/>project exercises {props.course.groupProjectCount}
      </p>;
    case 'background':
      return <p>
        <b>{props.course.name} {props.course.exerciseCount}</b>
        <br/><i>{props.course.description}</i>
        <br/>submit to {props.course.backgroundMaterial}
      </p>;
    case 'special':
      return <p>
        <b>{props.course.name} {props.course.exerciseCount}</b>
        <br/><i>{props.course.description}</i>
        <br/>required skils: {props.course.requirements.join(', ')}
      </p>;
    default:
      return assertNever(props.course);
  }
}

const Content = (props: ContentProps) => (
  <>{props.contents.map((c) => <Part key={c.name} course={c} />)}</>
)

const Total = (props: TotalProps) => (
  <p>Number of exercises {props.total}</p>
)

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const totalExercises = courseParts
    .reduce((sum, part) => (sum + part.exerciseCount), 0);
  
  return (
    <div>
      <Header name={courseName} />
      <Content contents={courseParts} />
      <Total total={totalExercises} />
    </div>
  )
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}

export default App;
