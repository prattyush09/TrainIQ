import "./Button.css";

function Button({
  children,
  onClick,
  type = "button",
  variant = "default",
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn-v2 btn-${variant}-v2 ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;