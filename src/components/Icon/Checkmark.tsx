'use client';

export function Checkmark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      strokeWidth="5"
      strokeMiterlimit="10"
      className="w-6 h-6 rounded-full block stroke-[#20293A] animate-[CheckMarkFill_0.4s_ease-in-out_0.4s_forwards,CheckMarkScale_0.3s_ease-in-out_0.9s_both]"
    >
      <circle
        cx="26"
        cy="26"
        r="25"
        fill="none"
        strokeDasharray="166"
        strokeDashoffset="166"
        strokeWidth="5"
        strokeMiterlimit="10"
        className="animate-[CheckMarkStroke_0.6s_cubic-bezier(0.65,0,0.45,1)_forwards] stroke-[#20293A]"
      />
      <path
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
        strokeDasharray="48"
        strokeDashoffset="48"
        className="animate-[CheckMarkStroke_0.3s_cubic-bezier(0.65,0,0.45,1)_0.8s_forwards] origin-[50%_50%]"
      />
    </svg>
  );
}

export default Checkmark;
