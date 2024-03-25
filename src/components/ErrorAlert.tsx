interface ErrorAlertProps {
  showError: boolean;
  message: string;
}

export default function ErrorAlert({ showError, message }: ErrorAlertProps) {
  if (!showError) return null;
  return (
    <div className="toast toast-top toast-center">
      <div className="alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
}
