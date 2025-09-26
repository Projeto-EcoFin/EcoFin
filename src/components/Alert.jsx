const Alert = ({ children, className = "" }) => {
  return (
    <div className={`border-l-4 p-4 rounded ${className}`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children }) => {
  return <p>{children}</p>;
};

export default Alert;
