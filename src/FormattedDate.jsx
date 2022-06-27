function FormattedDate(props) {
  return (
    <span className={props.className}>
      {new Date(props.date).toLocaleString(
        props.locale ? props.locale : "en-IE"
      )}
    </span>
  );
}

export default FormattedDate;
