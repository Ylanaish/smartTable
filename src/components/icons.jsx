const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Svg({ children, className = "h-5 w-5", viewBox = "0 0 24 24" }) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      aria-hidden="true"
      {...base}
    >
      {children}
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  );
}

export function DotsIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function ChevronDownIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6 9.5l6 6 6-6" />
    </Svg>
  );
}

export function ChevronRightIcon(props) {
  return (
    <Svg {...props}>
      <path d="M9.5 6l6 6-6 6" />
    </Svg>
  );
}

export function ArrowLeftIcon(props) {
  return (
    <Svg {...props}>
      <path d="M19 12H5.5M11 5.5L4.5 12l6.5 6.5" />
    </Svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5 12h13.5M13 5.5L19.5 12 13 18.5" />
    </Svg>
  );
}

export function CalendarIcon(props) {
  return (
    <Svg {...props}>
      <path d="M8 3v3M16 3v3M4 9h16M5.5 5.5h13a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 19V7a1.5 1.5 0 011.5-1.5z" />
    </Svg>
  );
}

export function ClockIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  );
}

export function MapPinIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-5.4 7-10.4A7 7 0 005 10.6C5 15.6 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.6" />
    </Svg>
  );
}

export function CheckIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5 12.5l4.5 4.5L19 7" strokeWidth={2.2} />
    </Svg>
  );
}

export function SendIcon(props) {
  return (
    <Svg {...props}>
      <path d="M21 3L10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8 21 3z" />
    </Svg>
  );
}

export function MinusIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6 12h12" />
    </Svg>
  );
}

export function PlusIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 6v12M6 12h12" />
    </Svg>
  );
}

export function PlusCircleIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8.5v7M8.5 12h7" />
    </Svg>
  );
}

export function ReceiptIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6 3.5h12v17l-2.2-1.4-1.9 1.4-1.9-1.4-1.9 1.4L8 19.1 6 20.5v-17z" />
      <path d="M9.5 8.5h5M9.5 12.5h5" />
    </Svg>
  );
}

export function BookIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 5.5A1.5 1.5 0 015.5 4H10a2.5 2.5 0 012.5 2.5v13A2 2 0 0010.5 17H4V5.5z" />
      <path d="M20 5.5A1.5 1.5 0 0018.5 4H14a2.5 2.5 0 00-2.5 2.5v13A2 2 0 0113.5 17H20V5.5z" />
    </Svg>
  );
}

export function InboxIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 13.5h4l1.5 2.5h5L16 13.5h4" />
      <path d="M5.8 5h12.4l1.8 8.5V19H4v-5.5L5.8 5z" />
    </Svg>
  );
}
