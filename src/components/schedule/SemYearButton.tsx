interface SemYearButtonProps {
  year: number;
}

function process_year(year: number) {
  if (year < 1764) {
    return "Semester";
  }

  if ((year * 2) % 2 !== 0) {
    return "Fall " + (year - 0.5).toString();
  }
  return "Spring " + year.toString();
}

export default function SemYear(props: SemYearButtonProps) {
  return (
    <button
      className="SemYear"
      style={{ left: "0.375vw", top: "0.5vh" }}
      onClick={(e) => console.log(props.year)}
    >
      {process_year(props.year)}
    </button>
  );
}
