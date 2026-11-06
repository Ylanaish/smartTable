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

export function HomeIcon(props) {
  return (
    <Svg {...props}>
      <path d="M3.5 10.4l8.5-6.9 8.5 6.9" />
      <path d="M5.8 9v10.5a.5.5 0 00.5.5h11.4a.5.5 0 00.5-.5V9" />
      <path d="M9.8 20v-5.2h4.4V20" />
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

export function FishIcon(props) {
  return (
    <Svg {...props}>
      <path d="M2.5 12s3.5-6 9.5-6c4.5 0 8 3.4 9.5 6-1.5 2.6-5 6-9.5 6-6 0-9.5-6-9.5-6z" />
      <path d="M21.5 12c1.2-1.5 1.2-4.5 0-6" />
      <circle cx="8" cy="11" r="0.9" fill="currentColor" stroke="none" />
      <path d="M6 17.5L3 20.5M6 6.5L3 3.5" />
    </Svg>
  );
}

export function CartIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 5h2l1.7 9.5a1.5 1.5 0 001.5 1.2h6.9a1.5 1.5 0 001.5-1.2L19 8H6.4" />
      <circle cx="10" cy="19.5" r="1.4" />
      <circle cx="16" cy="19.5" r="1.4" />
    </Svg>
  );
}

export function PhoneIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12.5 12.5 0 006 6l1.5-2 4 1.5v3a1.8 1.8 0 01-2 1.8C11 18.6 5.4 13 4.7 5.5a1.8 1.8 0 011.8-2z" />
    </Svg>
  );
}

export function TruckIcon(props) {
  return (
    <Svg {...props}>
      <path d="M2.5 6.5h11v10h-11z" />
      <path d="M13.5 10h4l3 3v3.5h-7" />
      <circle cx="6.5" cy="17.5" r="1.7" />
      <circle cx="16.5" cy="17.5" r="1.7" />
    </Svg>
  );
}

export function TimerIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="13" r="7.5" />
      <path d="M12 9.5V13l2.5 1.7M9.5 2.5h5M12 2.5v3" />
    </Svg>
  );
}

export function SnowflakeIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
      <path d="M12 6l2-2M12 6l-2-2M12 18l2 2M12 18l-2 2" />
    </Svg>
  );
}

export function AlertIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v4.5" />
      <circle cx="12" cy="15.8" r="0.9" fill="currentColor" stroke="none" />
    </Svg>
  );
}
