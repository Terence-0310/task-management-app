const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2>Có lỗi xảy ra</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
