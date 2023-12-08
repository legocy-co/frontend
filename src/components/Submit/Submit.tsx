import './Submit.scss'

interface SubmitProps {
  showMessage: string,
  buttonText: string,
}

const Submit = (props: SubmitProps) => {
  return (
    <div className="submit">
      {(props.showMessage && <div>{props.showMessage}</div>)}
      <button>{props.buttonText}</button>
    </div>
  );
}

export default Submit;