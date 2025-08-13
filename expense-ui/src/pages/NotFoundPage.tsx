import React, { useEffect, useRef } from "react";
import styles from "../styles/NotFoundPage.module.css";
import { Link } from "react-router";

const NotFoundPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyefRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const eyef = eyefRef.current;

    if (!container || !eyef) return;

    const handleMouseMove = (evt: MouseEvent) => {
      const x = evt.clientX / window.innerWidth;
      const y = evt.clientY / window.innerHeight;

      container.style.setProperty("--mouse-x", x.toString());
      container.style.setProperty("--mouse-y", y.toString());

      eyef.setAttribute("cx", (115 + 30 * x).toString());
      eyef.setAttribute("cy", (50 + 30 * y).toString());
    };

    const handleTouchMove = (evt: TouchEvent) => {
      const x = evt.touches[0].clientX / window.innerWidth;
      const y = evt.touches[0].clientY / window.innerHeight;

      container.style.setProperty("--mouse-x", x.toString());
      container.style.setProperty("--mouse-y", y.toString());
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="robot-error"
        viewBox="0 0 260 118.9"
        role="img"
      >
        <title>403 Error</title>

        <defs>
          <clipPath id="white-clip">
            <circle id="white-eye" fill="#cacaca" cx="130" cy="65" r="20" />
          </clipPath>
          <text id="text-s" className={styles["error-text"]} y={106}>
            403
          </text>
        </defs>

        <path
          className={styles.alarm}
          fill="#e62326"
          d="M120.9 19.6V9.1c0-5 4.1-9.1 9.1-9.1h0c5 0 9.1 4.1 9.1 9.1v10.6"
        />
        <use xlinkHref="#text-s" x="-0.5px" y="-1px" fill="black" />
        <use xlinkHref="#text-s" fill="#2b2b2b" />

        <g id={styles["error-eye-wrap"]}>
          <use xlinkHref="#white-eye" />
          <circle
            id="eyef"
            ref={eyefRef}
            className={styles.eye}
            clipPath="url(#white-clip)"
            fill="#000"
            stroke="#2aa7cc"
            strokeWidth={2}
            strokeMiterlimit={10}
            cx={130}
            cy={65}
            r={11}
          />
          <ellipse
            id="white-eye"
            fill="#2b2b2b"
            cx={130}
            cy={40}
            rx={18}
            ry={12}
          />
        </g>

        <circle
          className={styles.lightblue}
          cx={105}
          cy={32}
          r={2.5}
          id="tornillo"
        />
        <use xlinkHref="#tornillo" x={50} />
        <use xlinkHref="#tornillo" x={50} y={60} />
        <use xlinkHref="#tornillo" y={60} />
      </svg>

      <h1>You are not allowed to enter here</h1>
      <h2>
        Go <Link to={"/"}>Home!</Link>
      </h2>
    </div>
  );
};

export default NotFoundPage;
