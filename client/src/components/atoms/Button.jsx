function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      className="button"
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;